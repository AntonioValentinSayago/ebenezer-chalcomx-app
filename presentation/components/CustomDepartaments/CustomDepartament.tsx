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
    >
      <TouchableOpacity onPress={() => console.log(`Job: ${item.name}`)}>
        {/* Card blanca con borde/sombra */}
        <View
          className="m-4 mt-1 rounded-2xl border border-slate-300 shadow-sm shadow-slate-200 overflow-hidden"
        >
          <LinearGradient
            colors={["#ffffff", "white", item.color]}
            start={{ x: 2, y: -1 }}
            end={{ x: 1, y: 4.5 }}
            style={{
              flex: 1, // 👈 El gradiente ocupa todo el espacio
            }}
          >
            {/* Espacio/blanco entre borde y fondo (NO mueve el texto) */}
            <View className="p-2">
              {/* Contenedor del fondo + contenido */}
              <View className="relative rounded-xl overflow-hidden">
                {/* Contenido (puedes ajustar este padding o quitarlo si lo quieres aún más pegado) */}
                <View className="px-4 py-3">
                  {/* Header */}
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-base font-bold text-black">{item.name}</Text>
                    <Ionicons name="add" size={20} color="black" />
                  </View>

                  {/* Cuerpo */}
                  <Text className="text-black/80 text-sm">Nombre Líder.</Text>

                  {/* Footer */}
                  <View className="flex-row items-center justify-between mt-4">
                    <Text className="text-xl font-bold text-black">00</Text>
                    <Text className="text-black/70 text-xs">Ver más</Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </MotiView>

  );
};

export default CustomDepartament;
