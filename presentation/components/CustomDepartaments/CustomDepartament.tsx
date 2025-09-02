import { Department } from '@/infrastructure/interfaces';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  item: Department;
}

const CustomDepartament = ({ item }: Props) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: Number(item.id) * 50, type: 'timing', duration: 500 }}
      className="p-2 w-full" // El cambio clave: w-full para ocupar todo el ancho
    >
      <TouchableOpacity onPress={() => console.log(`Job: ${item.name}`)}>
        <View className="rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <View className="p-4 bg-white">
            {/* Header */}
            <View className="flex-row items-start justify-between">
              <View className="flex-row items-start space-x-3">
                {/* Logo de la empresa */}
                <LinearGradient
                  colors={["#ffffff", "#f8f8f8", "#f0f0f0"]}
                  className="p-3 rounded-xl flex-row items-center justify-center"
                >
                  <Ionicons name={item.icon as any} size={24} color={item.name} />
                </LinearGradient>
                {/* Título y Empresa */}
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-600 font-light mt-0.5">
                    {item.name}
                  </Text>
                </View>
              </View>
              {/* Ícono de marcador */}
              <TouchableOpacity>
                <Ionicons name="bookmark-outline" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Etiquetas */}
            <View className="flex-row items-center mt-3 space-x-2">
              <View className="px-3 py-1 bg-gray-100 rounded-full">
                <Text className="text-xs font-semibold text-gray-600">
                  {item.name}
                </Text>
              </View>
              <View className="px-3 py-1 bg-gray-100 rounded-full">
                <Text className="text-xs font-semibold text-gray-600">
                  {item.name}
                </Text>
              </View>
            </View>

            {/* Salario y fecha */}
            <View className="flex-row items-center justify-between mt-4">
              <Text className="text-xl font-bold text-blue-600">
                {item.name}
              </Text>
              <Text className="text-xs text-gray-400">
                {item.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

export default CustomDepartament;
