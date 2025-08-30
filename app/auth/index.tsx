import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Modal, Platform, Pressable, SafeAreaView, StatusBar, Switch, Text, TextInput, View } from "react-native";

// Paleta de colores Ebenezer
// #101527 (Negro azulado profundo)
// #e6e6e6 (Gris claro)
// #83acbd (Azul claro)
// #233652 (Azul marino)

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showBioModal, setShowBioModal] = useState(false);
  const [enableFaceID, setEnableFaceID] = useState(true);
  const [enableFingerprint, setEnableFingerprint] = useState(true);

  const bioTitle = useMemo(
    () => (Platform.OS === "ios" ? "Configurar Face ID" : "Configurar huella"),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-[#e6e6e6]">
      <StatusBar barStyle="light-content" />
      {/* Fondo con gradiente */}
      <LinearGradient
        colors={["#83acbd", "#e6e6e6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Decoración */}
      <View className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#83acbd]/30 blur-xl" />
      <View className="absolute right-[-20] top-20 h-56 w-56 rounded-full bg-[#83acbd]/20 blur-2xl" />

      <View className="flex-1 items-center justify-center px-6">
        {/* Tarjeta de login */}
        <View className="w-full max-w-md rounded-2xl bg-[#e6e6e6]/100 p-6 shadow-xl border border-[#83acbd]/30">
          {/* Logo + título */}
          <View className="items-center mb-6">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#83acbd]/20">
              <Ionicons name="sparkles-outline" size={22} color="#83acbd" />
            </View>
            <Text className="mt-3 text-[#233652] text-2xl font-extrabold tracking-tight">
              Bienvenido Herman@
            </Text>
            <Text className="text-[#83acbd] text-sm font-work-bold">Iglesia Ebenezer Principe de Paz</Text>
          </View>

          {/* Inputs */}
          <View className="gap-4">
            <View className="rounded-xl border border-[#83acbd]/100 bg-[#e6e6e6] px-4 py-3">
              <Text className="text-[#83acbd] text-xs mb-1">Correo electrónico</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@email.com"
                placeholderTextColor="#83acbd"
                autoCapitalize="none"
                keyboardType="email-address"
                className="text-[#233652] text-base font-work-bold"
              />
            </View>

            <View className="rounded-xl border border-[#83acbd]/100 bg-[#e6e6e6] px-4 py-3">
              <Text className="text-[#83acbd] text-xs mb-1">Contraseña</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#83acbd"
                secureTextEntry
                className="text-[#233652] text-base font-work-bold"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Pressable className="py-2">
                <Text className="text-[#233653]/90 text-xs">¿Olvidaste tu contraseña?</Text>
              </Pressable>

              <Pressable onPress={() => setShowBioModal(true)} className="flex-row items-center gap-2 py-2">
                <Ionicons
                  name={Platform.OS === "ios" ? "ios-scan-circle" : "finger-print"}
                  size={16}
                  color="#83acbd"
                />
                <Text className="text-[#233653]/90 text-xs">Configurar biometría</Text>
              </Pressable>
            </View>

            {/* Botón principal */}
            <Pressable 
              className="mt-1 rounded-xl overflow-hidden active:opacity-90"
              onPress={() =>  router.push('/tabs/(dashboard)/home')}
            >
              <LinearGradient
                colors={["#83acbd", "rgba(131, 172, 189, 0.70)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-xl"
              >
                <View className="flex-row items-center justify-center gap-2 py-3">
                  <Ionicons name="log-in-outline" size={18} color="#101527" />
                  <Text className="text-[#101527] font-semibold text-base">Iniciar sesión</Text>
                </View>
              </LinearGradient>
            </Pressable>

            {/* Separador */}
            <View className="flex-row items-center my-2">
              <View className="h-px flex-1 bg-[#233652]/40" />
              <Text className="mx-3 text-[#e6e6e6]/70 text-xs">©</Text>
              <View className="h-px flex-1 bg-[#233652]/40" />
            </View>

            {/* Botones sociales (solo UI) */}
            {/* <View className="flex-row gap-3">
              <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#83acbd]/30 bg-[#101527] py-3 active:opacity-90">
                <Ionicons name="logo-google" size={16} color="#83acbd" />
                <Text className="text-[#e6e6e6]">Google</Text>
              </Pressable>
              {Platform.OS === "ios" ? (
                <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#83acbd]/30 bg-[#101527] py-3 active:opacity-90">
                  <Ionicons name="logo-apple" size={16} color="#83acbd" />
                  <Text className="text-[#e6e6e6]">Apple</Text>
                </Pressable>
              ) : (
                <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#83acbd]/30 bg-[#101527] py-3 active:opacity-90">
                  <Ionicons name="logo-facebook" size={16} color="#83acbd" />
                  <Text className="text-[#e6e6e6]">Facebook</Text>
                </Pressable>
              )}
            </View> */}
          </View>
        </View>

        {/* Footer mini */}
        <Text className="mt-6 text-[#233652]/80 text-md font-work-bold">© 2025 Ministerios Ebenezer</Text>
      </View>

      {/* Modal de configuración biométrica (solo visual) */}
      <Modal visible={showBioModal} transparent animationType="fade" onRequestClose={() => setShowBioModal(false)}>
        <View className="flex-1 bg-black/40 items-center justify-end">
          <Pressable className="absolute inset-0" onPress={() => setShowBioModal(false)} />

          {/* Hoja (bottom sheet) */}
          <View className="w-full max-w-xl rounded-t-3xl bg-[#233652] p-6 border-t border-[#83acbd]/30">
            <View className="items-center mb-5">
              <View className="h-1 w-10 rounded-full bg-[#83acbd]/40 mb-4" />
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#83acbd]/20">
                <Ionicons
                  name={Platform.OS === "ios" ? "ios-scan-circle" : "finger-print"}
                  size={22}
                  color="#83acbd"
                />
              </View>
              <Text className="mt-3 text-[#e6e6e6] text-xl font-semibold tracking-tight">
                {bioTitle}
              </Text>
              <Text className="text-[#83acbd] text-center text-xs mt-1 px-6">
                Acelera tu inicio de sesión usando {Platform.OS === "ios" ? "Face ID" : "tu huella"}. Puedes activar o desactivar esta opción cuando quieras.
              </Text>
            </View>

            {/* Ajustes visuales */}
            <View className="gap-4">
              {Platform.OS === "ios" ? (
                <RowSetting
                  title="Usar Face ID"
                  subtitle="Desbloquea con tu rostro"
                  iconName="ios-scan-circle"
                  value={enableFaceID}
                  onChange={setEnableFaceID}
                />
              ) : (
                <RowSetting
                  title="Usar huella"
                  subtitle="Desbloquea con tu dedo"
                  iconName="finger-print"
                  value={enableFingerprint}
                  onChange={setEnableFingerprint}
                />
              )}

              <RowSetting
                title="Recordar dispositivo"
                subtitle="Evita pedir datos cada vez"
                iconName="shield-checkmark-outline"
                value={true}
                onChange={() => {}}
                readOnly
              />
            </View>

            {/* Acciones */}
            <View className="flex-row gap-3 mt-6">
              <Pressable onPress={() => setShowBioModal(false)} className="flex-1 items-center justify-center rounded-xl border border-[#83acbd]/30 bg-[#101527] py-3 active:opacity-90">
                <Text className="text-[#e6e6e6]">Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => setShowBioModal(false)} className="flex-1 rounded-xl overflow-hidden active:opacity-90">
                <LinearGradient
                  colors={["#83acbd", "#e6e6e6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-xl"
                >
                  <View className="items-center justify-center py-3">
                    <Text className="text-[#101527] font-semibold">Guardar</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function RowSetting({
  title,
  subtitle,
  iconName,
  value,
  onChange,
  readOnly,
}: {
  title: string;
  subtitle?: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  value: boolean;
  onChange: (v: boolean) => void;
  readOnly?: boolean;
}) {
  return (
    <View className="flex-row items-center justify-between rounded-2xl border border-[#83acbd]/30 bg-[#101527] p-4">
      <View className="flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#83acbd]/20">
          <Ionicons name={iconName} size={18} color="#83acbd" />
        </View>
        <View>
          <Text className="text-[#e6e6e6] font-medium">{title}</Text>
          {subtitle ? <Text className="text-[#83acbd] text-xs mt-0.5">{subtitle}</Text> : null}
        </View>
      </View>

      <Switch
        value={value}
        onValueChange={readOnly ? undefined : onChange}
        trackColor={{ true: "#83acbd", false: "#233652" }}
        thumbColor={value ? "#e6e6e6" : "#101527"}
      />
    </View>
  );
}
