import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

const GRID_SIZE = 25;

const BookDetailScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const data = Array.from({ length: GRID_SIZE }, (_, i) => i);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <FlatList
        data={data}
        numColumns={5}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedIndex(item)}
            className={`w-16 h-16 m-1 rounded items-center justify-center transition-all duration-150 active:scale-95 ${
              selectedIndex === item
                ? 'border-2 border-red-500 bg-red-100'
                : 'border border-red-500 bg-white'
            }`}
          >
            {/* Opcional: mostrar el índice */}
            <View>
              <Text>Texto Opcional</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default BookDetailScreen;