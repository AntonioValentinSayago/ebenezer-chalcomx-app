import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const tabs = ['People', 'Jobs List', 'Trending'];
const people = [
  {
    id: 1,
    name: 'Bessie',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    description: 'Jacob Jones reposted a post.',
    date: 'Sat 19, 2025',
  },
  {
    id: 2,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
  {
    id: 3,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
  {
    id: 4,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
  {
    id: 5,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
  {
    id: 6,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
  {
    id: 7,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
  {
    id: 8,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
  {
    id: 9,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
  {
    id: 10,
    name: 'Wade Warren',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: '2 new posts from Wade Warren.',
    date: 'Sat 19, 2025',
  },
];

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState('People');

  return (
    <View className="flex-1 pt-5" style={globalStylesLayout.background}>
      <ScrollView className="px-4 pb-20" showsVerticalScrollIndicator={false}>
        
        {/* 🔍 Input de búsqueda */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-6">
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput
            placeholder="Search course or mentor"
            className="flex-1 ml-2 text-sm text-gray-700"
          />
          <Ionicons name="options-outline" size={20} color="gray" />
        </View>

        {/* 📌 Tabs superiores personalizadas */}
        <View className="flex-row justify-around mb-6">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full ${
                activeTab === tab ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <Text
                className={`text-sm ${
                  activeTab === tab ? 'text-white font-semibold' : 'text-gray-700'
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

          {people.map((p) => (
            <View key={p.id} className="flex-row items-center bg-gray-100 rounded-lg p-4 mb-2">
              <Image source={{ uri: p.avatar }} className="w-10 h-10 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="font-medium">{p.name}</Text>
                <Text className="text-xs text-gray-500">{p.description}</Text>
              </View>
              <Text className="text-xs text-gray-400">{p.date}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const globalStylesLayout = StyleSheet.create({
    background:{
        backgroundColor: 'white'
    }
})
