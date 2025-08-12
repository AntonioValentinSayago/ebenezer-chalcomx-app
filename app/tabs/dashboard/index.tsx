import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Dimensions, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';

import logoEbenzer from "../../../assets/images/logo_sinBackground.png";

// This component uses NativeWind (Tailwind for React Native).
// Put this file inside your Expo + NativeWind project and import it in App.tsx.

type Department = {
  id: string;
  name: string;
  leader: string;
  members: number;
  color: string; // tailwind-compatible or hex
  icon: keyof typeof Ionicons['name'] | string;
};

type Notification = {
  id: string;
  photo?: string; // uri
  date: string;
  title: string;
  excerpt?: string;
};

const { width } = Dimensions.get('window');

const departments: Department[] = Array.from({ length: 25 }).map((_, i) => ({
  id: String(i + 1),
  name: ['Worship', 'Kids', 'Youth', 'Outreach', 'Hospitality', 'Finance', 'Media'][i % 7] + ` Dept ${i + 1}`,
  leader: ['Ana', 'Carlos', 'María', 'José', 'Lucía', 'Miguel', 'Sofía'][i % 7] + ` L.${i + 1}`,
  members: Math.floor(Math.random() * 80) + 5,
  // pastel-ish colors. Use actual Tailwind class names or hex values.
  color: ['#FDE68A', '#BFDBFE', '#C7F9CC', '#FFD6E0', '#E9D5FF', '#FBCFE8', '#FEE2E2'][i % 7],
  icon: ['musical-notes', 'school', 'people', 'heart', 'bed', 'wallet', 'camera'][i % 7],
}));

const notifications: Notification[] = [
  {
    id: 'n1',
    photo: undefined,
    date: '2025-08-10',
    title: 'Servicio especial de domingo',
    excerpt: 'Habrá un servicio especial de jóvenes a las 6:00 PM. Trae a un amigo.',
  },
  {
    id: 'n2',
    photo: undefined,
    date: '2025-08-03',
    title: 'Reunión de líderes',
    excerpt: 'Reunión mensual de líderes este miércoles en salón B.',
  },
  {
    id: 'n3',
    photo: undefined,
    date: '2025-07-28',
    title: 'Campaña de ayuda comunitaria',
    excerpt: 'Inscripciones abiertas para voluntariado el próximo sábado.',
  },
];

export default function ChurchDashboard() {
  const totalActiveMembers = departments.reduce((s, d) => s + d.members, 0);
  const todayAttendance = Math.floor(totalActiveMembers * 0.35) + 10; // ejemplo

  function renderDepartment({ item }: { item: Department }) {
    return (
      <MotiView 
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }} 
          transition={{ delay: Number(item.id) * 10, type: 'timing' }} 
          className="p-2 w-[48%]" style={{ width: (width / 2) - 12 }}
        >
        <Pressable onPress={() => console.log('object')}>
          <View className="rounded-2xl overflow-hidden shadow-lg">
            <View className="p-3" style={{ backgroundColor: item.color }}>
              <View className="flex-col">
                <View className="flex-row items-center mb-2">
                  <View className="p-3 rounded-full bg-white/60 mr-3">
                    <Ionicons name={item.icon as any} size={20} color="#111827" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold flex-wrap">{item.name}</Text>
                    <Text className="text-xs text-gray-700 flex-wrap">Leader: {item.leader}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-2xl font-bold">{item.members}</Text>
                  <Text className="text-xs text-gray-600">members</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </MotiView>
    );
  }

  return (
    <ScrollView className="bg-gray-50 flex-1 p-4">
      {/* Header / Summary */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-2xl font-extrabold">Ministerios Ebenezer</Text>
          <Text className="text-sm text-gray-600">Iglesia de Cristo Príncipe de Paz</Text>
        </View>
        <View className="flex-row items-center">
          <Pressable className="p-2 rounded-full bg-cyan-800 shadow mr-2">
            <Image
              source={logoEbenzer}
              className="w-11 h-11 rounded-full"
            />
          </Pressable>
        </View>
      </View>

      {/* KPIs */}
      <View className="flex-row space-x-3 mb-4 gap-2">
        <View className="flex-1 rounded-2xl bg-white p-4 shadow">
          <Text className="text-xs text-gray-500">Miembros activos</Text>
          <Text className="text-3xl font-bold">{totalActiveMembers}</Text>
          <Text className="text-sm text-gray-500">Actualizado hoy</Text>
        </View>
        <View className=" rounded-2xl bg-white p-4 shadow">
          <Text className="text-xs text-gray-500">Asistencia (Domingo)</Text>
          <Text className="text-3xl font-bold">{todayAttendance}</Text>
          <Text className="text-sm text-gray-500">{new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Notifications slider */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Notificaciones</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
          {notifications.map((n) => (
            <MotiView
              key={n.id}
              from={{ opacity: 0, translateX: 10 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing' }}
              style={{ padding: 4 }}
            >
              <View className="w-[300px] rounded-2xl bg-white p-3 shadow mr-2">
                <View className="flex-row items-center mb-2">
                  <Image
                    source={n.photo ? { uri: n.photo } : require("../../../assets/images/gr2174_1080_1920.png")}
                    className="w-16 h-16 rounded-lg mr-3"
                  />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold">{n.title}</Text>
                    <Text className="text-xs text-gray-500">{n.date}</Text>
                    <Text className="text-xs text-gray-600 mt-1" numberOfLines={2}>{n.excerpt}</Text>
                  </View>
                </View>
                <View className="flex-row justify-end">
                  <Pressable className="px-3 py-2 rounded-lg bg-indigo-600">
                    <Text className="text-white">Ver más</Text>
                  </Pressable>
                </View>
              </View>
            </MotiView>
          ))}
        </ScrollView>
      </View>

      {/* Departments grid */}
      <View style={{ padding: 2 }}>
        <Text className="text-lg font-semibold mb-3">Departamentos ({departments.length})</Text>
        <FlatList
          data={departments}
          keyExtractor={(d) => d.id}
          renderItem={renderDepartment}
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{ gap: 2 }}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Quick actions footer */}
      <View className="mt-6 mb-28">
        <Text className="text-lg font-semibold mb-3">Acciones rápidas</Text>
        <View className="flex-row space-x-3">
          <Pressable className="flex-1 rounded-2xl bg-white p-4 shadow items-center">
            <Ionicons name="person-add" size={24} />
            <Text className="mt-2 font-semibold">Agregar miembro</Text>
          </Pressable>
          <Pressable className="flex-1 rounded-2xl bg-white p-4 shadow items-center">
            <Ionicons name="calendar" size={24} />
            <Text className="mt-2 font-semibold">Registrar asistencia</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}