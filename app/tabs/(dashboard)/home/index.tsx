import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Department, Notification } from '@/infrastructure/interfaces';
import CustomDepartament from '@/presentation/components/CustomDepartaments/CustomDepartament';
import CustomNotification from '@/presentation/components/CustomNotification/CustomNotification';
import { useSearchPaginator } from '@/presentation/hooks/useSearchPaginator';
import { logoEbenzer } from '@/utils/constants/imagenes-imports';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Datos mock
const departments: Department[] = Array.from({ length: 2 }).map((_, i) => ({
  id: String(i + 1),
  name: ['Worship', 'Kids', 'Youth', 'Outreach', 'Hospitality', 'Finance', 'Media'][i % 7] + ` Dept ${i + 1}`,
  leader: ['Ana', 'Carlos', 'María', 'José', 'Lucía', 'Miguel', 'Sofía', 'Antonio'][i % 7] + ` L.${i + 1}`,
  members: Math.floor(Math.random() * 80) + 5,
  color: ['#FDE68A', '#BFDBFE', '#C7F9CC', '#FFD6E0', '#E9D5FF', '#FBCFE8', '#FEE2E2'][i % 7],
  icon: ['musical-notes', 'school', 'people', 'heart', 'bed', 'wallet', 'camera'][i % 7],
}));
/** Datos del Mock */
const notifications: Notification[] = [
  { id: 'n1', date: '2025-08-10', title: 'Servicio especial de domingo', excerpt: 'Habrá un servicio especial de jóvenes a las 6:00 PM. Trae a un amigo.' },
  { id: 'n2', date: '2025-08-03', title: 'Reunión de líderes', excerpt: 'Reunión mensual de líderes este miércoles en salón B.' },
  { id: 'n3', date: '2025-07-28', title: 'Campaña de ayuda comunitaria', excerpt: 'Inscripciones abiertas para voluntariado el próximo sábado.' },
];

export default function ChurchDashboard() {
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
  } = useSearchPaginator(departments, ['name', 'leader'], 6);

  const totalActiveMembers = departments.reduce((s, d) => s + d.members, 0);
  const todayAttendance = Math.floor(totalActiveMembers * 0.35) + 10;

  return (
    <LinearGradient
      colors={["#f8fafc", "#e0f2fe", "#dbeafe"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <FlatList
        data={paginatedData}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => <CustomDepartament item={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-2xl font-extrabold text-slate-800">Ministerios Ebenezer</Text>
                <Text className="text-sm text-slate-600">Iglesia de Cristo Príncipe de Paz</Text>
              </View>
              <Pressable className="p-2 rounded-full bg-cyan-800 shadow mr-2">
                <Image source={logoEbenzer} className="w-11 h-11 rounded-full" />
              </Pressable>
            </View>
            {/* KPIs */}
            <View className="flex-row gap-2 mb-4">
              {/* Miembros activos */}
              <TouchableOpacity
                className="flex-1 rounded-2xl shadow cursor-pointer overflow-hidden"
                onPress={() => router.push('/members')}
              >
                <LinearGradient
                  colors={["#06b6d4", "#3b82f6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-4"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <View>
                      <Text className="text-xs text-gray-100">Miembros activos</Text>
                      <Text className="text-3xl font-extrabold text-white">
                        {totalActiveMembers}
                      </Text>
                    </View>
                    <Ionicons name="list-circle" size={50} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Crear nueva membresía */}
              <View className="flex-1 rounded-2xl shadow overflow-hidden">
                <LinearGradient
                  colors={["#7c3aed", "#9333ea"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-4"
                >
                  <Text className="text-xs text-gray-100">Crear nueva membresía</Text>
                  <View className="items-center p-1">
                    <Ionicons name="person-add" size={30} color="#fff" />
                  </View>
                </LinearGradient>
              </View>
            </View>

            <View className="flex-row gap-2 mb-4">
              {/* Nueva publicación */}
              <View className="flex-1 rounded-2xl shadow overflow-hidden">
                <LinearGradient
                  colors={["#ec4899", "#db2777"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-4"
                >
                  <Text className="text-xs text-white font-extrabold mb-2">
                    Nueva Publicación
                  </Text>
                  <View className="items-center p-1">
                    <Ionicons name="notifications" size={40} color="#fff" />
                  </View>
                </LinearGradient>
              </View>

              {/* Lista de asistencia */}
              <View className="flex-1 rounded-2xl shadow overflow-hidden">
                <LinearGradient
                  colors={["#22c55e", "#16a34a"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-4"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <View>
                      <Text className="text-xs text-gray-100">Lista de Asistencia</Text>
                      <Text className="text-2xl font-bold text-white">
                        {todayAttendance}
                      </Text>
                      <Text className="text-sm text-gray-200">
                        {new Date().toLocaleDateString()}
                      </Text>
                    </View>
                    <Ionicons name="checkmark-done-circle" size={50} color="#fff" />
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* Buscador */}
            <TextInput
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                setCurrentPage(1);
              }}
              placeholder="Buscar departamento o líder..."
              className="bg-white rounded-full px-4 py-2 border border-gray-300 mb-3"
            />

            <Text className="text-lg font-semibold mb-3 text-slate-800">
              Departamentos ({totalPages})
            </Text>
          </>
        }
        ListFooterComponent={
          <>
            {/* Paginador */}
            {totalPages > 1 && (
              <View className="flex-row justify-center flex-wrap my-4">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  const isActive = currentPage === page;
                  return (
                    <Pressable
                      key={page}
                      onPress={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-full m-1 ${isActive ? 'bg-cyan-600' : 'bg-gray-200'}`}
                    >
                      <Text className={`${isActive ? 'text-white font-bold' : 'text-gray-800'}`}>
                        {page}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {/* Notifications */}
            <CustomNotification notifications={notifications} />
          </>
        }
      />
    </LinearGradient>
  );
}
