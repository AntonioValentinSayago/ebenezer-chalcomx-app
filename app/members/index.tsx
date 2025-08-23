// MembersDashboard.tsx
import { Entypo } from "@expo/vector-icons";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";

type Member = {
  id: string;
  name: string;
  ministry: string;
  avatar?: string;
};

// 🔹 Simulamos muchos miembros
const sampleMembers: Member[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `${i + 1}`,
  name: `Miembro ${i + 1}`,
  ministry: ["Alabanza", "Ujieres", "Niños", "Juventud", "Oración", "Multimedia"][i % 6],
  avatar: i % 2 === 0 ? `https://i.pravatar.cc/100?img=${i + 10}` : undefined,
}));

const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function MembersDashboard() {
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6); // cuántos se cargan al inicio
  const [loadingMore, setLoadingMore] = useState(false);

  // 🔹 Filtrado por buscador
  const filtered = useMemo(
    () =>
      sampleMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.ministry.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  // 🔹 Los que se muestran con scroll infinito
  const visibleData = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  const loadMore = () => {
    if (loadingMore || visibleCount >= filtered.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6); // carga 6 más
      setLoadingMore(false);
    }, 800); // simulación de delay
  };

  const renderItem = ({ item, index }: { item: Member; index: number }) => {
    const initials = getInitials(item.name);
    const menuOpen = openMenuId === item.id;

    return (
      <MotiView
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 50, damping: 12 }}
        className="mb-3"
      >
        <View className="flex-row items-center justify-between bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm">
          {/* Avatar */}
          <View className="w-14 h-14 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 items-center justify-center">
            {item.avatar ? (
              <Image source={{ uri: item.avatar }} className="w-full h-full" />
            ) : (
              <Text className="text-lg font-semibold text-neutral-600 dark:text-neutral-300">
                {initials}
              </Text>
            )}
          </View>

          {/* Nombre + Ministerio */}
          <View className="flex-1 px-4">
            <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {item.name}
            </Text>
            <Text className="text-xs mt-0.5 text-neutral-500 dark:text-neutral-400">
              {item.ministry}
            </Text>
          </View>

          {/* 3 puntitos */}
          <View className="relative">
            <Pressable
              onPress={() => setOpenMenuId(menuOpen ? null : item.id)}
              className="p-2 rounded-xl active:opacity-70"
            >
              <Entypo name="dots-three-vertical" size={16} />
            </Pressable>

            {menuOpen && (
              <View className="absolute right-0 mt-2 w-40 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border border-neutral-100 dark:border-neutral-700">
                {["Ver perfil", "Editar", "Eliminar"].map((opt, idx) => (
                  <Pressable
                    key={opt}
                    onPress={() => setOpenMenuId(null)}
                    className={`px-4 py-3 ${idx !== 2 ? "border-b border-neutral-100 dark:border-neutral-700" : ""}`}
                  >
                    <Text className="text-sm text-neutral-700 dark:text-neutral-200">{opt}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      </MotiView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-black">
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-bold text-neutral-900 dark:text-white">Miembros</Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Lista de servidores de la iglesia
        </Text>

        {/* Buscador */}
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar miembro o ministerio..."
          className="mt-3 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Lista con scroll infinito */}
      <FlatList
        data={visibleData}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        onScrollBeginDrag={() => setOpenMenuId(null)}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="#2563eb" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
