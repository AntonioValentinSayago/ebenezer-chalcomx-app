import { globalStylesLayout } from '@/presentation/styles/global-latout.css';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const tabs = ['Antiguo Testamento', 'Nuevo Testamento'];
const people = [
    {
        id: 1,
        name: 'Genesis',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        description: 'Jacob Jones reposted a post.',
        date: 'Sat 19, 2025',
    },
    {
        id: 2,
        name: 'Exodo',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: '2 new posts from Wade Warren.',
        date: 'Sat 19, 2025',
    },
    {
        id: 3,
        name: 'Levitico',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: '2 new posts from Wade Warren.',
        date: 'Sat 19, 2025',
    },
    {
        id: 4,
        name: 'Numeros',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: '2 new posts from Wade Warren.',
        date: 'Sat 19, 2025',
    },
    {
        id: 5,
        name: 'Deuteronomio',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: '2 new posts from Wade Warren.',
        date: 'Sat 19, 2025',
    },
    {
        id: 6,
        name: 'Josué',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: '2 new posts from Wade Warren.',
        date: 'Sat 19, 2025',
    },
    {
        id: 7,
        name: 'Jueces',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: '2 new posts from Wade Warren.',
        date: 'Sat 19, 2025',
    },
    {
        id: 8,
        name: 'Rut',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: '2 new posts from Wade Warren.',
        date: 'Sat 19, 2025',
    },
    {
        id: 9,
        name: '1-Samuel',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: '2 new posts from Wade Warren.',
        date: 'Sat 19, 2025',
    },
];

const avatarColors = ['#FF5733', '#FFC300', '#8E44AD', '#3498DB', '#16A085', '#E67E22'];


export default function NotificationsScreen() {
    const [activeTab, setActiveTab] = useState('People');

    const getAvatarColor = (index: number) => {
        return avatarColors[index % avatarColors.length];
    };


    return (
        <View className="flex-1 pt-5" style={globalStylesLayout.background}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 80,
                    minHeight: '100%', // fuerza altura mínima para que el scroll se active
                }}
            >

                {/* 🔍 Input de búsqueda */}
                <View className="flex-row items-center bg-white rounded-xl px-4 py-2 mb-6" style={globalStylesLayout.LogBoxShad}>
                    <Ionicons name="search-outline" size={25} color="#0C2438" style={globalStylesLayout.iconosSearch} />
                    <TextInput
                        placeholder="Buscar libro/versiculo"
                        className="flex-1 ml-2 text-sm text-slate-950"
                    />
                    <Ionicons name="options-outline" size={25} color="#E4AD5F" />
                </View>

                {/* 📌 Tabs superiores personalizadas */}
                <View className="flex-row justify-around mb-6">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`px-4 py-1 rounded-full ${activeTab === tab ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                        >
                            <Text
                                className={`text-sm ${activeTab === tab ? 'text-white font-semibold' : 'text-gray-700'
                                    }`}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 📥 Contenido dinámico por tab */}
                <View>
                    <Text className="text-base font-semibold mb-2">{activeTab}</Text>

                    {people.map((p, index) => (
                        <View
                            key={p.id}
                            className="flex-row items-center bg-white p-4 mb-2 rounded-xl shadow-md"
                        >
                            {/* Avatar dinámico */}
                            <View
                                className="w-10 h-10 rounded-full mr-4 flex items-center justify-center"
                                style={{ backgroundColor: getAvatarColor(index) }}
                            >
                                <Text className="text-white font-semibold text-base">
                                    {p.name.charAt(0)}
                                </Text>
                            </View>

                            <View className="flex-1">
                                <Text className="font-medium">{p.name}</Text>
                                <Text className="text-xs text-gray-500">{p.description}</Text>
                            </View>

                            <Pressable
                                className="bg-slate-900 p-2.5 rounded-lg items-center justify-center
                       active:bg-blue-800 dark:bg-blue-600 dark:active:bg-blue-700"
                                onPress={() => {
                                    console.log('Botón presionado');
                                }}
                            >
                                <Ionicons name="arrow-forward" size={20} color="white" />
                            </Pressable>

                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}