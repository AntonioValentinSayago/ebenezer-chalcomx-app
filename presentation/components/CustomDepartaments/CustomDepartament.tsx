import { Department } from '@/infrastructure/interfaces';
import width from '@/utils/functions/_layout';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface Props {
  item: Department;
}

const CustomDepartament = ({ item }: Props) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: Number(item.id) * 10, type: 'timing' }}
      className="p-2 w-[48%]"
      style={{ width: (width / 2) - 12 }}
    >
      <Pressable onPress={() => console.log(`Departamento: ${item.name}`)}>
        <View className="rounded-2xl overflow-hidden shadow-lg">
          <View className="p-3" style={{ backgroundColor: item.color }}>
            <View className="flex-col">
              {/* Header */}
              <View className="flex-row items-center mb-2">
                <View className="p-3 rounded-full bg-white/60 mr-3">
                  <Ionicons name={item.icon as any} size={20} color="#111827" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold flex-wrap">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-700 flex-wrap">
                    Líder: {item.leader}
                  </Text>
                </View>
              </View>

              {/* Footer */}
              <View className="items-end">
                <Text className="text-2xl font-bold">{item.members}</Text>
                <Text className="text-xs text-gray-600">miembros</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </MotiView>
  );
};

export default CustomDepartament;
