// NotificationDashboard.tsx
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native";

interface Notification {
  id: string;
  image: string;
  description: string;
  category: string;
  date: string;
  likes: number;
}

interface Props {
  role: "admin" | "user"; // validar rol
}

const NotificationDashboard: React.FC<Props> = ({ role }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      image: "https://img1.wsimg.com/isteam/ip/b5a58e5e-e3a2-4cfa-99d7-b5f8bc23fa5e/WhatsApp%20Image%202025-07-20%20at%2018.06.23_b7c6cea3.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=h:1000,cg:true",
      description: "Reunión general de la iglesia este domingo",
      category: "Evento",
      date: "2025-09-02",
      likes: 12,
    },
    {
      id: "2",
      image: "https://media.istockphoto.com/id/108502467/es/foto/personas-en-el-cruce.jpg?s=612x612&w=0&k=20&c=pzQHfUAOGj8wQ5sI3z3EIwFaNRTKn_zWfTWuyHC3-ko=",
      description: "Nueva serie de estudios bíblicos en casa",
      category: "Estudio",
      date: "2025-09-01",
      likes: 8,
    },
  ]);

  const handleLike = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, likes: n.likes + 1 } : n
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <View className="bg-white rounded-2xl p-2 mb-4 shadow-sm">
      <Image source={{ uri: item.image }} className="w-full h-40 rounded-xl mb-3" />
      <Text className="text-lg font-semibold text-gray-800">{item.description}</Text>
      <Text className="text-sm text-gray-500 mt-1">{item.category} • {item.date}</Text>

      <View className="flex-row justify-between items-center mt-3">
        <Pressable
          onPress={() => handleLike(item.id)}
          className="flex-row items-center"
        >
          <AntDesign name="hearto" size={20} color="red" />
          <Text className="ml-2 text-gray-700">{item.likes}</Text>
        </Pressable>

        {role === "admin" && (
          <View className="flex-row space-x-4">
            <Pressable onPress={() => {}} className="p-2">
              <Feather name="edit" size={20} color="blue" />
            </Pressable>
            <Pressable onPress={() => handleDelete(item.id)} className="p-2">
              <Feather name="trash-2" size={20} color="red" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">📢 Notifications</Text>

      {role === "admin" && (
        <View className="bg-white rounded-xl p-4 shadow mb-6">
          <Text className="text-lg font-semibold mb-2 text-gray-700">Create Notification</Text>
          <TextInput
            placeholder="Write a description..."
            className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
          />
          <Pressable className="bg-blue-500 p-3 rounded-xl">
            <Text className="text-white text-center font-semibold">Add Notification</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationDashboard;
