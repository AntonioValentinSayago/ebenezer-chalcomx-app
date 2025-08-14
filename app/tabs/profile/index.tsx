import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type RootStackParamList = {
  Home: undefined;
  Room: { roomCode: string; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// ---- Helpers de UI ----
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-xl font-semibold text-ebony mb-3">{children}</Text>
);

const PrimaryButton = ({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-center rounded-2xl bg-primary px-4 py-3 active:opacity-80"
  >
    {icon ? <View className="mr-2">{icon}</View> : null}
    <Text className="text-white font-semibold">{label}</Text>
  </Pressable>
);

const GhostButton = ({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-center rounded-2xl border border-primary/30 px-4 py-3 active:opacity-80"
  >
    {icon ? <View className="mr-2">{icon}</View> : null}
    <Text className="text-primary font-semibold">{label}</Text>
  </Pressable>
);

// ---- Datos mock ----
type Meeting = {
  id: string;
  title: string;
  leader: string;
  date: string; // “2025-08-13 · 19:00”
  code: string;
};
const seedMeetings: Meeting[] = [
  {
    id: "1",
    title: "Culto General",
    leader: "Pr. Samuel",
    date: "2025-08-18 · 19:00",
    code: "EBZ-001",
  },
  {
    id: "2",
    title: "Reunión Jóvenes",
    leader: "Líder: Andrea",
    date: "2025-08-17 · 17:00",
    code: "EBZ-002",
  },
  {
    id: "3",
    title: "Escuela Dominical Docentes",
    leader: "Líder: Carlos",
    date: "2025-08-16 · 09:00",
    code: "EBZ-003",
  },
];

// ---- Pantalla: Home/Dashboard ----
function HomeScreen({ navigation }: any) {
  const [query, setQuery] = useState("");
  const [meetings, setMeetings] = useState<Meeting[]>(seedMeetings);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return meetings;
    const q = query.toLowerCase();
    return meetings.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.leader.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q)
    );
  }, [query, meetings]);

  // Datos del modal Crear
  const [newTitle, setNewTitle] = useState("");
  const [newLeader, setNewLeader] = useState("");
  const [newDate, setNewDate] = useState("");

  // Datos del modal Unirse
  const [joinCode, setJoinCode] = useState("");

  const createMeeting = () => {
    if (!newTitle || !newLeader || !newDate) return;
    const code = `EBZ-${String(meetings.length + 1).padStart(3, "0")}`;
    const item: Meeting = {
      id: String(Date.now()),
      title: newTitle,
      leader: newLeader,
      date: newDate,
      code,
    };
    setMeetings((prev) => [item, ...prev]);
    setShowCreate(false);
    setNewTitle("");
    setNewLeader("");
    setNewDate("");
  };

  const joinMeeting = () => {
    const found: Meeting | undefined =
      meetings.find((m) => m.code.toLowerCase() === joinCode.toLowerCase());
    const target = found
      ? found
      : {
        code: joinCode || "EBZ-ROOM",
        title: "Sala instantánea",
      };
    setShowJoin(false);
    setJoinCode("");
    navigation.navigate("Room", {
      roomCode: target.code,
      title: target.title,
    });
  };

  const renderItem = ({ item, index }: { item: Meeting; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 16, scale: 0.98 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: "timing", delay: index * 60, duration: 320 }}
      className="mb-3"
    >
      <Pressable
        onPress={() =>
          navigation.navigate("Room", {
            roomCode: item.code,
            title: item.title,
          })
        }
        className="rounded-2xl bg-white px-4 py-4 shadow-sm border border-zinc-100"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-lg font-semibold text-ebony">{item.title}</Text>
            <Text className="text-zinc-500 mt-0.5">{item.leader}</Text>
            <Text className="text-zinc-500 mt-0.5">{item.date}</Text>
            <View className="mt-2 rounded-xl bg-brandLight/30 self-start px-2 py-1">
              <Text className="text-brand font-semibold tracking-wider">
                {item.code}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#6D28D9" />
        </View>
      </Pressable>
    </MotiView>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View className="px-5 pt-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs uppercase tracking-widest text-zinc-500">
                Iglesia
              </Text>
              <Text className="text-2xl font-extrabold text-ebony">
                Ebenezer Meet
              </Text>
            </View>
            <View className="rounded-full bg-brand/10 px-3 py-2">
              <Text className="text-brand font-semibold">Conectados en Cristo</Text>
            </View>
          </View>

          {/* Acciones rápidas */}
          <View className="mt-5 flex-row space-x-3">
            <PrimaryButton
              label="Nueva reunión"
              onPress={() => setShowCreate(true)}
              icon={<Ionicons name="videocam" size={18} color="#fff" />}
            />
            <GhostButton
              label="Unirme con código"
              onPress={() => setShowJoin(true)}
              icon={<MaterialIcons name="qr-code" size={18} color="#6D28D9" />}
            />
          </View>

          {/* Buscador */}
          <View className="mt-5 rounded-2xl bg-white px-4 py-3 border border-zinc-100">
            <View className="flex-row items-center">
              <Ionicons name="search" size={18} color="#64748B" />
              <TextInput
                placeholder="Buscar por título, líder o código…"
                placeholderTextColor="#94A3B8"
                value={query}
                onChangeText={setQuery}
                className="ml-2 flex-1 text-ebony"
              />
              {query ? (
                <Pressable onPress={() => setQuery("")}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>

        {/* Lista de reuniones */}
        <View className="px-5 mt-6">
          <SectionTitle>Próximas reuniones</SectionTitle>
          <FlatList
            data={filtered}
            renderItem={renderItem}
            keyExtractor={(i) => i.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="h-0.5" />}
          />
        </View>
      </ScrollView>

      {/* FAB */}
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 250 }}
        className="absolute bottom-6 right-6"
      >
        <Pressable
          onPress={() => setShowCreate(true)}
          className="rounded-full bg-primary w-14 h-14 items-center justify-center shadow-lg active:opacity-80"
        >
          <Ionicons name="add" size={26} color="#fff" />
        </Pressable>
      </MotiView>

      {/* Modal Crear Reunión */}
      <Modal visible={showCreate} transparent animationType="slide">
        <View className="flex-1 bg-black/40">
          <View className="mt-auto rounded-t-3xl bg-white p-5">
            <View className="h-1 w-12 bg-zinc-200 self-center rounded-full mb-4" />
            <Text className="text-xl font-bold text-ebony">Nueva reunión</Text>
            <TextInput
              placeholder="Título (p. ej. Célula de jóvenes)"
              placeholderTextColor="#94A3B8"
              value={newTitle}
              onChangeText={setNewTitle}
              className="mt-4 rounded-2xl border border-zinc-200 px-4 py-3"
            />
            <TextInput
              placeholder="Líder (p. ej. Andrea)"
              placeholderTextColor="#94A3B8"
              value={newLeader}
              onChangeText={setNewLeader}
              className="mt-3 rounded-2xl border border-zinc-200 px-4 py-3"
            />
            <TextInput
              placeholder="Fecha · Hora (p. ej. 2025-08-20 · 20:00)"
              placeholderTextColor="#94A3B8"
              value={newDate}
              onChangeText={setNewDate}
              className="mt-3 rounded-2xl border border-zinc-200 px-4 py-3"
            />
            <View className="mt-5 flex-row space-x-3">
              <GhostButton
                label="Cancelar"
                onPress={() => setShowCreate(false)}
                icon={<Ionicons name="close" size={18} />}
              />
              <PrimaryButton
                label="Crear"
                onPress={createMeeting}
                icon={<Ionicons name="checkmark" size={18} color="#fff" />}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Unirse */}
      <Modal visible={showJoin} transparent animationType="slide">
        <View className="flex-1 bg-black/40">
          <View className="mt-auto rounded-t-3xl bg-white p-5">
            <View className="h-1 w-12 bg-zinc-200 self-center rounded-full mb-4" />
            <Text className="text-xl font-bold text-ebony">Unirme a reunión</Text>
            <TextInput
              placeholder="Código (p. ej. EBZ-001)"
              placeholderTextColor="#94A3B8"
              value={joinCode}
              onChangeText={setJoinCode}
              className="mt-4 rounded-2xl border border-zinc-200 px-4 py-3"
            />
            <View className="mt-5 flex-row space-x-3">
              <GhostButton
                label="Cancelar"
                onPress={() => setShowJoin(false)}
                icon={<Ionicons name="close" size={18} />}
              />
              <PrimaryButton
                label="Unirme"
                onPress={joinMeeting}
                icon={<Ionicons name="log-in-outline" size={18} color="#fff" />}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ---- Pantalla: Sala ----
function RoomScreen({ route, navigation }: any) {
  const { roomCode, title } = route.params as { roomCode: string; title: string };
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      {/* Top bar */}
      <View className="px-4 pt-2 pb-3 flex-row items-center justify-between">
        <Pressable
          onPress={() => navigation.goBack()}
          className="rounded-full bg-white/10 px-3 py-2"
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </Pressable>
        <View className="flex-1 mx-3">
          <Text className="text-white font-semibold" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-white/70 text-xs">{roomCode}</Text>
        </View>
        <View className="rounded-full bg-white/10 px-3 py-2">
          <Text className="text-white text-xs">Ebenezer</Text>
        </View>
      </View>

      {/* Área de video (placeholder) */}
      <View className="flex-1 px-4">
        <View className="flex-1 rounded-3xl bg-zinc-900 items-center justify-center">
          <Ionicons name="person-circle" size={96} color="#27272A" />
          <Text className="text-zinc-400 mt-2">Video remoto</Text>
        </View>

        <View className="mt-3 rounded-2xl bg-zinc-800 items-center justify-center py-6">
          <Text className="text-zinc-300">Tu cámara previa (preview)</Text>
        </View>
      </View>

      {/* Controles inferiores */}
      <View className="px-6 pb-8 pt-4 bg-black/40">
        <View className="flex-row items-center justify-between">
          <ControlButton
            active={micOn}
            onPress={() => setMicOn((v) => !v)}
            activeIcon={<Ionicons name="mic" size={20} color="#111827" />}
            inactiveIcon={<Ionicons name="mic-off" size={20} color="#fff" />}
            label={micOn ? "Mic on" : "Muted"}
          />
          <ControlButton
            active={camOn}
            onPress={() => setCamOn((v) => !v)}
            activeIcon={<Ionicons name="videocam" size={20} color="#111827" />}
            inactiveIcon={<Ionicons name="videocam-off" size={20} color="#fff" />}
            label={camOn ? "Cam on" : "Cam off"}
          />
          <RoundIconButton
            label="Chat"
            icon={<Ionicons name="chatbubble-ellipses" size={20} color="#fff" />}
          />
          <RoundIconButton
            label="Participantes"
            icon={<Ionicons name="people" size={20} color="#fff" />}
          />
          <Pressable
            onPress={() => navigation.goBack()}
            className="items-center"
          >
            <View className="rounded-full bg-red-600 w-14 h-14 items-center justify-center">
              <Ionicons name="call" size={20} color="#fff" />
            </View>
            <Text className="text-red-400 text-xs mt-1">Colgar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function ControlButton({
  active,
  onPress,
  activeIcon,
  inactiveIcon,
  label,
}: {
  active: boolean;
  onPress?: () => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  label: string;
}) {
  return (
    <Pressable onPress={onPress} className="items-center">
      <View
        className={`w-14 h-14 rounded-full items-center justify-center ${active ? "bg-white" : "bg-zinc-700"
          }`}
      >
        {active ? activeIcon : inactiveIcon}
      </View>
      <Text className="text-zinc-300 text-xs mt-1">{label}</Text>
    </Pressable>
  );
}

function RoundIconButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <View className="items-center">
      <View className="rounded-full bg-zinc-700 w-14 h-14 items-center justify-center">
        {icon}
      </View>
      <Text className="text-zinc-300 text-xs mt-1">{label}</Text>
    </View>
  );
}

export default function App() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Room" component={RoomScreen} />
      </Stack.Navigator>
    </>
  );
}
