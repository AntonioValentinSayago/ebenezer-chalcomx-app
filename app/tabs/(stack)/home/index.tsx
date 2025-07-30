import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const cards = [
    { id: 1, title: 'Card 1', category: 'NT' },
    { id: 2, title: 'Card 2', category: 'AT' },
    { id: 3, title: 'Card 3', category: 'NT' },
    { id: 4, title: 'Card 4', category: 'AT' },
    { id: 5, title: 'Card 5', category: 'NT' },
    { id: 6, title: 'Card 5', category: 'NT' },
    { id: 7, title: 'Card 5', category: 'NT' },
    { id: 8, title: 'Card 5', category: 'NT' },
    { id: 9, title: 'Card 5', category: 'NT' },
    { id: 10, title: 'Card 5', category: 'NT' },
    { id: 11, title: 'Card 5', category: 'NT' },
    { id: 12, title: 'Card 5', category: 'NT' },
    { id: 13, title: 'Card 5', category: 'NT' },
    { id: 14, title: 'Card 5', category: 'NT' },
    { id: 15, title: 'Card 6', category: 'AT' },
    { id: 16, title: 'Card 25', category: 'NT' },
];

const categories = ['All', 'NT', 'AT'];

const HomeBibliaScrenn = () => {

    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredCards = selectedCategory === 'All'
        ? cards
        : cards.filter(card => card.category === selectedCategory);
    return (
        <SafeAreaView>
            <View className="p-4">
                {/* Categorías */}
                <View className="flex-row justify-around mb-4">
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                        >
                            <Text className={`${selectedCategory === category ? 'text-white' : 'text-black'
                                }`}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Lista de cards */}
                <FlatList
                    data={filteredCards}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="mb-2 p-4 bg-white rounded-lg shadow flex flex-row justify-between">
                            <Text className="text-lg font-bold">
                                {item.title} {'\n'}
                                {item.category}
                            </Text>
                            <Link href={`/tabs/(stack)/home/[id]`} className="text-sm text-red-600">Ver</Link>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeBibliaScrenn