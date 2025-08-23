import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

// Paleta de gradientes
import type { ColorValue } from "react-native"; // Importamos gradiente

type Employee = {
    id: string;
    name: string;
    email: string;
    avatar: string;
};

const employeesData: Employee[] = [
    { id: "1", name: "John Doe", email: "john.doe@email.com", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: "2", name: "Jane Smith", email: "jane.smith@email.com", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: "3", name: "Alex Johnson", email: "alex.johnson@email.com", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
    { id: "4", name: "Emily Davis", email: "emily.davis@email.com", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
    { id: "5", name: "Michael Brown", email: "michael.brown@email.com", avatar: "https://randomuser.me/api/portraits/men/77.jpg" },
    { id: "6", name: "Sophia Wilson", email: "sophia.wilson@email.com", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    { id: "7", name: "David Lee", email: "david.lee@email.com", avatar: "https://randomuser.me/api/portraits/men/88.jpg" },
    { id: "8", name: "Olivia Taylor", email: "olivia.taylor@email.com", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: "9", name: "Olivia Taylor", email: "olivia.taylor@email.com", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: "10", name: "Olivia Taylor", email: "olivia.taylor@email.com", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: "11", name: "Olivia Taylor", email: "olivia.taylor@email.com", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: "12", name: "Olivia Taylor", email: "olivia.taylor@email.com", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: "13", name: "Olivia Taylor", email: "olivia.taylor@email.com", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: "14", name: "Olivia Taylor", email: "olivia.taylor@email.com", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
];
const gradients: [ColorValue, ColorValue][] = [
    ["#FFFFFF", "#FFFFFF"], // celeste
];

export default function EmployeeDashboard() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const filteredEmployees = useMemo(() => {
        return employeesData.filter(
            (emp) =>
                emp.name.toLowerCase().includes(search.toLowerCase()) ||
                emp.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const paginatedEmployees = filteredEmployees.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <View className="flex-1 bg-white p-4">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-gray-800">
                    Employee Dashboard
                </Text>

                {/* Buscador con ícono */}
                <View className="flex-row items-center border border-gray-300 rounded-xl px-2 py-1 w-40 bg-gray-50">
                    <Ionicons name="search" size={18} color="gray" />
                    <TextInput
                        placeholder="Search..."
                        value={search}
                        onChangeText={setSearch}
                        className="flex-1 ml-2 text-sm"
                    />
                </View>
            </View>

            {/* Lista de empleados */}

            <FlatList
                data={paginatedEmployees}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const gradient = gradients[parseInt(item.id) % gradients.length];

                    return (
                        <View style={{ marginBottom: 5, padding: 5}}>
                            <LinearGradient
                                colors={gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    borderRadius: 12,
                                    padding: 3,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 30,
                                    elevation: 5,
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    {/* Imagen + info */}
                                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                                        <Image
                                            source={{ uri: item.avatar }}
                                            style={{
                                                width: 54,
                                                height: 54,
                                                borderRadius: 32,
                                                marginRight: 16,
                                                borderWidth: 2,
                                                borderColor: "rgba(255,255,255,0.9)",
                                                shadowColor: "#000",
                                                shadowOffset: { width: 2, height: 4 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 6,
                                            }}
                                        />
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "black", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ fontSize: 12, color: "red" }}>
                                                {item.email}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Botón Editar */}
                                    <Pressable
                                        className="px-3 py-1 bg-transparent rounded-lg"
                                    >
                                        <Text style={{ color: "#3B82F6", fontWeight: "bold" }}>
                                            <Ionicons name="create-outline" size={16} color="#3B82F6" />
                                        </Text>
                                    </Pressable>
                                </View>
                            </LinearGradient>
                        </View>
                    );
                }}
            />



            {/* Paginador */}
            {filteredEmployees.length > 0 && (
                <View className="flex-row justify-between items-center mt-4">
                    <Pressable
                        className={`px-3 py-1 rounded-xl ${page === 1 ? "bg-gray-200" : "bg-blue-500"
                            }`}
                        disabled={page === 1}
                        onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                        <Text
                            className={`text-sm ${page === 1 ? "text-gray-500" : "text-white"
                                }`}
                        >
                            Previous
                        </Text>
                    </Pressable>

                    <Text className="text-sm text-gray-600 font-medium">
                        Page {page} of {totalPages}
                    </Text>

                    <Pressable
                        className={`px-3 py-1 rounded-xl ${page === totalPages ? "bg-gray-200" : "bg-blue-500"
                            }`}
                        disabled={page === totalPages}
                        onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        <Text
                            className={`text-sm ${page === totalPages ? "text-gray-500" : "text-white"
                                }`}
                        >
                            Next
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
