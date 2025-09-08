import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Department, Notification } from '@/infrastructure/interfaces';
import CustomClapsBendiciones from '@/presentation/components/CustomClapsBendiciones/CustomClapsBendiciones';
import CustomDepartament from '@/presentation/components/CustomDepartaments/CustomDepartament';
import { useSearchPaginator } from '@/presentation/hooks/useSearchPaginator';
import { logoEbenzer } from '@/utils/constants/imagenes-imports';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Datos mock
const departments: Department[] = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  name: ['Servidores', 'Adulam', 'Multimedia', 'Bernabé', 'Intercesión', 'Cafetería', 'Ebenekids', 'Clinica-lucas', 'Audio', 'Talento'][i % 10],
  leader: ['Ana', 'Carlos', 'María', 'José', 'Lucía', 'Miguel', 'Sofía', 'Antonio', 'Cesar', 'Montse' ][i % 7],
  members: Math.floor(Math.random() * 80) + 5,
  color: ['#0056aa','#6B8E23','#ff8847', '#ffff9b','#aa67fe','#6C3B2A','#d5154e','#ffffff','#0a2044','#94abe1'][i % 10],
  icon: ['musical-notes', 'school', 'people', 'heart', 'bed', 'wallet', 'camera', 'add', 'school', 'school'][i % 10],
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
  } = useSearchPaginator(departments, ['name', 'leader'], 2);

  const totalActiveMembers = departments.reduce((s, d) => s + d.members, 0);
  const todayAttendance = Math.floor(totalActiveMembers * 0.35) + 10;

  return (
    <LinearGradient
      colors={["#fff8ec", "white", "white"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <FlatList
        data={paginatedData}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => <CustomDepartament item={item} />}
        numColumns={1}
        contentContainerStyle={{ padding: 16 }}
        //columnWrapperStyle={{ justifyContent: 'space-around' }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            onPress={() => router.push('/members')}
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-2xl font-extrabold text-slate-800">Iglesia Ebenezer</Text>
                <Text className="text-sm text-slate-600">Príncipe de Paz</Text>
              </View>
              <Pressable className="p-2 rounded-full bg-cyan-800 shadow mr-2">
                <Image source={logoEbenzer} className="w-11 h-11 rounded-full" />
              </Pressable>
            </View>
            {/* KPIs */}
            <TouchableOpacity
              onPress={() => router.push('../../members')}
            >
              <View className="p-4 bg-white rounded-2xl border-slate-50 m-4 shadow-sm mb-0">
                <View className="flex-row items-start justify-between">
                  {/* Logo y Título */}
                  <View className="flex-row items-start space-x-4 flex-1">
                    {/* Logo de la empresa */}
                    {/* Título y Empresa */}
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-gray-800">Miembros Activos</Text>
                      <Text className="text-gray-500 text-sm mt-1">Ejemplo Nombre Pastor.</Text>
                    </View>
                  </View>

                  {/* Íconos de acción */}
                  <View className="flex-row space-x-4">
                    <TouchableOpacity>
                      <Ionicons name="mail-outline" size={24} color="#6b7280" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="add-circle-outline" size={24} color="#6b7280" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Salario y fecha */}
                <View className="flex-row items-center justify-between mt-4">
                  <Text className="text-xl font-bold text-blue-600">0000</Text>
                  <Text className="text-gray-400 text-xs">2 de septiembre de 2025</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* fin de JPIS */}
              {/* Scroll horizontal */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className='p-4'>
                {/* Card 1 */}
                <View className="bg-white rounded-2xl shadow-sm p-4 w-72 mr-3 h-28">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-semibold">Registro de Asistencia</Text>
                    <Text className="text-slate-900 text-xs font-medium bg-green-500 px-2 py-1 rounded-full">
                      texto
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-sm text-gray-600">02 septiembre del 2025</Text>
                    <Pressable className="bg-slate-50 rounded-full p-2">
                      <Ionicons name="checkmark-circle-outline" size={20} color="black" />
                    </Pressable>
                  </View>
                </View>

                {/* Card 2 */}
                <View className="bg-white rounded-2xl shadow-sm p-4 w-72 mr-3 h-28">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-semibold">Activar Membresia</Text>
                    <Text className="text-slate-900 text-xs font-medium bg-green-500 px-2 py-1 rounded-full">
                      texto
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-sm text-gray-600">Hermanos sin Cobertura</Text>
                    <Pressable className="bg-slate-50 rounded-full p-2">
                      <Ionicons name="folder-open-outline" size={20} color="##000076" />
                    </Pressable>
                  </View>
                </View>
              </ScrollView>

            {/* Buscador */}
            <Text className="text-base font-bold dark:text-blue-950">
              Lista de Departamentos
            </Text>
            <TextInput
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                setCurrentPage(1);
              }}
              placeholder="Buscar por departamento o líder..."
              className="bg-white rounded-md px-4 py-4 border border-gray-400 mb-5 mt-5 max-w-96 ml-4"
            />

          </>
        }
        ListFooterComponent={
          <>
            {/* Paginador */}
            {totalPages > 1 && (
              <View className="flex-row justify-center flex-wrap my-4 bg-white mt-0">
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
            {/* <CustomNotification notifications={notifications} /> */}
            <CustomClapsBendiciones />
          </>
        }
      />
    </LinearGradient>
  );
}
