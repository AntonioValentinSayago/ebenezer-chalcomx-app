import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

type Member = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role?: string;
    skills: string[];
    departments: string[];
    attendance: { date: string; status: "Present" | "Absent" | "Late" }[];
    events: { id: string; title: string; date: string; location?: string }[];
};

const mockMember: Member[] = Array.from({ length: 30 }).map((_, i) => ({
    id: `${i + 1}`,
    name: `Miembro ${i + 1}`,
    email: "jose.martinez@example.org",
    phone: "+52 55 1234 5678",
    avatar: i % 2 === 0 ? `https://i.pravatar.cc/100?img=${i + 10}` : undefined,
    role: "Hermano / Voluntario",
    skills: ["Worship", "Audio", "Volunteer Coordination"],
    departments: ["Worship Team", "Sound & Media"],
    attendance: [
        { date: "2025-08-31", status: "Present" },
        { date: "2025-08-24", status: "Present" },
        { date: "2025-08-17", status: "Late" },
        { date: "2025-08-10", status: "Absent" },
    ],
    events: [
        {
            id: "e-01",
            title: "Campamento Juvenil",
            date: "2025-09-20",
            location: "Rancho Esperanza",
        },
    ],
}));

const allDepartments = [
    "Worship Team",
    "Sound & Media",
    "Ujieres",
    "Escuela Dominical",
    "Intercesión",
];

const allEvents = [
    { id: "e-03", title: "Retiro de Varones", date: "2025-09-15" },
    { id: "e-04", title: "Cena de Matrimonios", date: "2025-10-01" },
    { id: "e-05", title: "Campaña Evangelística", date: "2025-11-12" },
];

export default function AdminMemberDashboard() {
    const { id } = useLocalSearchParams();
    const miembro = mockMember.find((m) => m.id === id);

    const [departments, setDepartments] = useState(miembro?.departments || []);
    const [events, setEvents] = useState(miembro?.events || []);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editData, setEditData] = useState({
        name: miembro?.name || "",
        email: miembro?.email || "",
        phone: miembro?.phone || "",
        role: miembro?.role || "",
    });

    if (!miembro) return <Redirect href="/" />;

    // ---------- FUNCIONES ----------
    const handleAddDepartment = (dep: string) => {
        if (departments.includes(dep)) {
            Alert.alert("Error", "Ya estás inscrito en este departamento.");
            return;
        }

        if (departments.length >= 3) {
            Alert.alert("Límite alcanzado", "Solo puedes estar en máximo 3 departamentos.");
            return;
        }

        if (departments.length === 2) {
            Alert.alert(
                "Confirmación",
                "Ya tienes 2 departamentos asignados. ¿Quieres inscribirte a un tercero?",
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Confirmar",
                        onPress: () => {
                            setDepartments([...departments, dep]);
                            Alert.alert("Éxito", `Te has inscrito al departamento ${dep}.`);
                        },
                    },
                ]
            );
        } else {
            Alert.alert("Confirmación", `¿Quieres inscribirte al departamento ${dep}?`, [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Confirmar",
                    onPress: () => {
                        setDepartments([...departments, dep]);
                        Alert.alert("Éxito", `Te has inscrito al departamento ${dep}.`);
                    },
                },
            ]);
        }
    };

    const handleRemoveDepartment = (dep: string) => {
        Alert.alert("Confirmación", `¿Seguro que deseas darte de baja de ${dep}?`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Confirmar",
                onPress: () => {
                    setDepartments(departments.filter((d) => d !== dep));
                    Alert.alert("Baja exitosa", `Te diste de baja de ${dep}.`);
                },
            },
        ]);
    };

    const handleAddEvent = (event: any) => {
        if (events.some((e) => e.id === event.id)) {
            Alert.alert("Error", "Ya estás inscrito en este evento.");
            return;
        }

        Alert.alert("Confirmación", `¿Quieres inscribirte al evento ${event.title}?`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Confirmar",
                onPress: () => {
                    setEvents([...events, event]);
                    Alert.alert("Éxito", `Te has inscrito al evento ${event.title}.`);
                },
            },
        ]);
    };

    const handleRemoveEvent = (eventId: string) => {
        const event = events.find((e) => e.id === eventId);
        if (!event) return;

        Alert.alert("Confirmación", `¿Seguro que deseas darte de baja de ${event.title}?`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Confirmar",
                onPress: () => {
                    setEvents(events.filter((e) => e.id !== eventId));
                    Alert.alert("Baja exitosa", `Te diste de baja del evento ${event.title}.`);
                },
            },
        ]);
    };

    const handleSaveEdit = () => {
        Alert.alert("Confirmación", "¿Guardar cambios en el perfil?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Guardar",
                onPress: () => {
                    Alert.alert("Éxito", "Perfil actualizado correctamente.");
                    setEditModalVisible(false);
                },
            },
        ]);
    };

    // ---------- RENDER ----------
    return (
        <>
            <FlatList
                data={miembro.attendance}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View className="flex-row justify-between bg-gray-100 p-3 rounded-xl mb-2 mx-4">
                        <Text className="text-gray-700">{item.date}</Text>
                        <Text
                            className={`font-semibold ${item.status === "Present"
                                ? "text-green-600"
                                : item.status === "Late"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                        >
                            {item.status}
                        </Text>
                    </View>
                )}
                ListHeaderComponent={
                    <LinearGradient
                        colors={["#fff8ec", "white", "white"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View className="items-center p-6">
                            {/* Avatar */}
                            <Image
                                source={{
                                    uri: miembro.avatar || "https://via.placeholder.com/100x100.png?text=Avatar",
                                }}
                                className="w-28 h-28 rounded-full mb-4"
                            />
                            {/* Datos */}
                            <Text className="text-2xl font-bold text-gray-800">{editData.name}</Text>
                            <Text className="text-gray-500">{editData.email}</Text>
                            <Text className="text-gray-500">{editData.phone}</Text>
                            <Text className="italic text-gray-600 mt-1">{editData.role}</Text>
                            {/* Botones acciones */}
                            <View className="flex-row mt-4 space-x-3">
                                <Pressable
                                    onPress={() => setEditModalVisible(true)}
                                    className="bg-blue-500 px-4 py-2 rounded-lg"
                                >
                                    <Text className="text-white font-semibold">Editar</Text>
                                </Pressable>
                            </View>
                            {/* Habilidades */}
                            <Text className="text-lg font-semibold mt-6 mb-2 text-gray-800">Habilidades</Text>
                            <View className="flex-row flex-wrap justify-center">
                                {miembro.skills.map((skill, index) => (
                                    <Text
                                        key={index}
                                        className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full m-1"
                                    >
                                        {skill}
                                    </Text>
                                ))}
                            </View>
                            {/* Departamentos */}
                            <Text className="text-lg font-semibold mt-6 mb-2 text-gray-800">
                                Departamentos donde sirve
                            </Text>
                            <View className="flex-row flex-wrap justify-center">
                                {departments.map((dep, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => handleRemoveDepartment(dep)}
                                        className="bg-green-100 px-3 py-1 rounded-full m-1"
                                    >
                                        <Text className="text-green-600">{dep} ❌</Text>
                                    </Pressable>
                                ))}
                            </View>
                            {/* Inscribir a nuevo departamento */}
                            <View className="mt-3">
                                {allDepartments
                                    .filter((d) => !departments.includes(d))
                                    .map((dep) => (
                                        <Pressable
                                            key={dep}
                                            onPress={() => handleAddDepartment(dep)}
                                            className="bg-gray-200 px-3 py-2 rounded-lg m-1"
                                        >
                                            <Text className="text-gray-700">+ {dep}</Text>
                                        </Pressable>
                                    ))}
                            </View>
                            {/* Título asistencia */}
                            <Text className="text-lg font-semibold mt-6 mb-2 text-gray-800 self-start ml-4">
                                Detalle de asistencia
                            </Text>
                        </View>
                    </LinearGradient>
                }
                ListFooterComponent={
                    <View className="p-6 bg-white">
                        {/* Eventos */}
                        <Text className="text-lg font-semibold mb-2 text-gray-800">Eventos inscritos</Text>
                        {events.map((event) => (
                            <Pressable
                                key={event.id}
                                onPress={() => handleRemoveEvent(event.id)}
                                className="bg-blue-100 px-3 py-2 rounded-lg mb-2"
                            >
                                <Text className="font-semibold">{event.title} ❌</Text>
                                <Text className="text-gray-600 text-sm">{event.date}</Text>
                                {event.location && (
                                    <Text className="text-gray-500 italic text-xs">{event.location}</Text>
                                )}
                            </Pressable>
                        ))}
                        {/* Inscribir a eventos */}
                        <View className="mt-3">
                            {allEvents
                                .filter((ev) => !events.some((e) => e.id === ev.id))
                                .map((ev) => (
                                    <Pressable
                                        key={ev.id}
                                        onPress={() => handleAddEvent(ev)}
                                        className="bg-gray-200 px-3 py-2 rounded-lg m-1"
                                    >
                                        <Text className="text-gray-700">+ {ev.title}</Text>
                                    </Pressable>
                                ))}
                        </View>
                    </View>
                }
            />

            {/* ---------- MODAL EDITAR ---------- */}
            <Modal visible={editModalVisible} animationType="slide" transparent>
                <View className="flex-1 bg-black/50 justify-center items-center">
                    <View className="bg-white rounded-2xl p-6 w-11/12">
                        <Text className="text-lg font-bold mb-4">Editar Perfil</Text>
                        <TextInput
                            placeholder="Nombre"
                            value={editData.name}
                            onChangeText={(text) => setEditData({ ...editData, name: text })}
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                        />
                        <TextInput
                            placeholder="Correo"
                            value={editData.email}
                            onChangeText={(text) => setEditData({ ...editData, email: text })}
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                        />
                        <TextInput
                            placeholder="Teléfono"
                            value={editData.phone}
                            onChangeText={(text) => setEditData({ ...editData, phone: text })}
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                        />
                        <TextInput
                            placeholder="Rol"
                            value={editData.role}
                            onChangeText={(text) => setEditData({ ...editData, role: text })}
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                        />
                        <View className="flex-row justify-between mt-4">
                            <Pressable
                                onPress={() => setEditModalVisible(false)}
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                            >
                                <Text className="text-gray-700">Cancelar</Text>
                            </Pressable>
                            <Pressable onPress={handleSaveEdit} className="bg-blue-500 px-4 py-2 rounded-lg">
                                <Text className="text-white">Guardar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
