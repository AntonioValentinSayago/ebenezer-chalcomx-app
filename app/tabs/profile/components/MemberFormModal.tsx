import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import type { Member } from "../types";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (member: Omit<Member, "id">, editingId?: string) => void;
    editing?: Member | null;
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const phoneOk = (v: string) => /^[0-9+\-() ]{7,}$/.test(v);

export default function MemberFormModal({ visible, onClose, onSubmit, editing }: Props) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (editing) {
            setName(editing.name);
            setRole(editing.role);
            setJoinDate(editing.joinDate);
            setPhone(editing.phone);
            setEmail(editing.email);
        } else {
            setName(""); setRole(""); setJoinDate(""); setPhone(""); setEmail("");
        }
    }, [editing, visible]);

    const handleSubmit = () => {
        if (!name.trim() || !role.trim() || !joinDate.trim()) return;
        if (email && !emailOk(email)) return;
        if (phone && !phoneOk(phone)) return;
        onSubmit({ name: name.trim(), role: role.trim(), joinDate: joinDate.trim(), phone: phone.trim(), email: email.trim() }, editing?.id);
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
                <View className="flex-1 bg-black/40 justify-end">
                    <View className="bg-white rounded-t-3xl p-5 max-h-[88%]">
                        <View className="h-1 w-12 bg-zinc-200 self-center rounded-full mb-4" />
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-xl font-bold">{editing ? "Editar miembro" : "Agregar miembro"}</Text>
                            <Pressable onPress={onClose} className="p-2 -mr-2">
                                <Ionicons name="close" size={22} />
                            </Pressable>
                        </View>

                        <ScrollView className="mt-2" keyboardShouldPersistTaps="handled">
                            <Text className="text-zinc-600 mb-1">Nombre *</Text>
                            <TextInput value={name} onChangeText={setName} placeholder="Nombre completo" className="border border-zinc-300 rounded-xl px-4 py-3 mb-3" />

                            <Text className="text-zinc-600 mb-1">Puesto / Ministerio *</Text>
                            <TextInput value={role} onChangeText={setRole} placeholder="Ej. Maestro de Escuela Dominical" className="border border-zinc-300 rounded-xl px-4 py-3 mb-3" />

                            <Text className="text-zinc-600 mb-1">Fecha de ingreso (YYYY-MM-DD) *</Text>
                            <TextInput value={joinDate} onChangeText={setJoinDate} placeholder="2025-08-13" className="border border-zinc-300 rounded-xl px-4 py-3 mb-3" />

                            <Text className="text-zinc-600 mb-1">Teléfono</Text>
                            <TextInput value={phone} onChangeText={setPhone} placeholder="+52 55 1234 5678" keyboardType="phone-pad" className="border border-zinc-300 rounded-xl px-4 py-3 mb-3" />

                            <Text className="text-zinc-600 mb-1">Email</Text>
                            <TextInput value={email} onChangeText={setEmail} placeholder="alguien@iglesia.com" keyboardType="email-address" autoCapitalize="none" className="border border-zinc-300 rounded-xl px-4 py-3 mb-4" />

                            {/* Ayudas */}
                            <View className="rounded-xl bg-zinc-50 border border-zinc-200 p-3 mb-4">
                                <Text className="text-zinc-600 text-xs">
                                    * Obligatorio. Validaciones básicas para email/teléfono. Formato de fecha recomendado: ISO YYYY-MM-DD.
                                </Text>
                            </View>

                            <View className="flex-row space-x-3">
                                <Pressable onPress={onClose} className="flex-1 border border-zinc-300 rounded-2xl py-3 items-center">
                                    <Text className="text-zinc-700 font-semibold">Cancelar</Text>
                                </Pressable>
                                <Pressable onPress={handleSubmit} className="flex-1 bg-purple-600 rounded-2xl py-3 items-center">
                                    <Text className="text-white font-semibold">{editing ? "Guardar cambios" : "Agregar"}</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
