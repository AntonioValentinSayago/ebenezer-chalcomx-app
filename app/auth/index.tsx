import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Modal, Platform, Pressable, SafeAreaView, StatusBar, Switch, Text, TextInput, View } from "react-native";
interface Props {
    onBack: () => void;
}

export default function App({ onBack }: Props) {
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
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      {/* Fondo con gradiente sutil */}
      <LinearGradient
        colors={["#0f0f0f", "#151515", "#101010"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Decoración minimalista: orbes */}
      <View className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-xl" />
      <View className="absolute right-[-20] top-20 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

      <View className="flex-1 items-center justify-center px-6">
        {/* Tarjeta de login */}
        <View className="w-full max-w-md rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 shadow-2xl">
          {/* Logo + título */}
          <View className="items-center mb-6">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Ionicons name="sparkles-outline" size={22} color="#ffffff" />
            </View>
            <Text className="mt-3 text-white text-2xl font-semibold tracking-tight">
              Bienvenido de nuevo
            </Text>
            <Text className="text-white/60 text-sm">Inicia sesión para continuar</Text>
          </View>

          {/* Inputs */}
          <View className="gap-4">
            <View className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3">
              <Text className="text-white/60 text-xs mb-1">Correo electrónico</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@email.com"
                placeholderTextColor="rgba(255,255,255,0.35)"
                autoCapitalize="none"
                keyboardType="email-address"
                className="text-white text-base"
              />
            </View>

            <View className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3">
              <Text className="text-white/60 text-xs mb-1">Contraseña</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.35)"
                secureTextEntry
                className="text-white text-base"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Pressable className="py-2">
                <Text className="text-white/70 text-xs">¿Olvidaste tu contraseña?</Text>
              </Pressable>

              <Pressable onPress={() => setShowBioModal(true)} className="flex-row items-center gap-2 py-2">
                <Ionicons
                  name={Platform.OS === "ios" ? "map" : "finger-print"}
                  size={16}
                  color="#ffffff"
                />
                <Text className="text-white/80 text-xs">Configurar biometría</Text>
              </Pressable>
            </View>

            {/* Botón principal */}
            <Pressable className="mt-1 rounded-xl overflow-hidden active:opacity-90" onPress={() =>  router.push('/tabs/(dashboard)/home')}>
              <LinearGradient
                colors={["#6EE7F0", "#A78BFA", "#F472B6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-xl"
              >
                <View className="flex-row items-center justify-center gap-2 py-3">
                  <Ionicons name="log-in-outline" size={18} color="#0b0b0b" />
                  <Text className="text-black font-semibold text-base">Iniciar sesión</Text>
                </View>
              </LinearGradient>
            </Pressable>

            {/* Separador */}
            <View className="flex-row items-center my-2">
              <View className="h-px flex-1 bg-white/10" />
              <Text className="mx-3 text-white/40 text-xs">o continuar con</Text>
              <View className="h-px flex-1 bg-white/10" />
            </View>

            {/* Botones sociales (solo UI) */}
            <View className="flex-row gap-3">
              <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] py-3 active:opacity-90">
                <Ionicons name="logo-google" size={16} color="#ffffff" />
                <Text className="text-white">Google</Text>
              </Pressable>
              {Platform.OS === "ios" ? (
                <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] py-3 active:opacity-90">
                  <Ionicons name="logo-apple" size={16} color="#ffffff" />
                  <Text className="text-white">Apple</Text>
                </Pressable>
              ) : (
                <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] py-3 active:opacity-90">
                  <Ionicons name="logo-facebook" size={16} color="#ffffff" />
                  <Text className="text-white">Facebook</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>

        {/* Footer mini */}
        <Text className="mt-6 text-white/40 text-xs">© 2025 TuMarca. Todos los derechos reservados.</Text>
      </View>

      {/* Modal de configuración biométrica (solo visual) */}
      <Modal visible={showBioModal} transparent animationType="fade" onRequestClose={() => setShowBioModal(false)}>
        <View className="flex-1 bg-black/60 items-center justify-end">
          <Pressable className="absolute inset-0" onPress={() => setShowBioModal(false)} />

          {/* Hoja (bottom sheet) */}
          <View className="w-full max-w-xl rounded-t-3xl bg-[#0E0E0E] p-6 border-t border-white/10">
            <View className="items-center mb-5">
              <View className="h-1 w-10 rounded-full bg-white/15 mb-4" />
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Ionicons
                  name={Platform.OS === "ios" ? "scan-circle" : "finger-print"}
                  size={22}
                  color="#ffffff"
                />
              </View>
              <Text className="mt-3 text-white text-xl font-semibold tracking-tight">
                {bioTitle}
              </Text>
              <Text className="text-white/60 text-center text-xs mt-1 px-6">
                Acelera tu inicio de sesión usando {Platform.OS === "ios" ? "Face ID" : "tu huella"}. Puedes activar o desactivar esta opción cuando quieras.
              </Text>
            </View>

            {/* Ajustes visuales */}
            <View className="gap-4">
              {Platform.OS === "ios" ? (
                <RowSetting
                  title="Usar Face ID"
                  subtitle="Desbloquea con tu rostro"
                  iconName="scan-circle"
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
              <Pressable onPress={() => setShowBioModal(false)} className="flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] py-3 active:opacity-90">
                <Text className="text-white">Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => setShowBioModal(false)} className="flex-1 rounded-xl overflow-hidden active:opacity-90">
                <LinearGradient
                  colors={["#6EE7F0", "#A78BFA", "#F472B6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-xl"
                >
                  <View className="items-center justify-center py-3">
                    <Text className="text-black font-semibold">Guardar</Text>
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
    <View className="flex-row items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <View className="flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-white/10">
          <Ionicons name={iconName} size={18} color="#ffffff" />
        </View>
        <View>
          <Text className="text-white font-medium">{title}</Text>
          {subtitle ? <Text className="text-white/60 text-xs mt-0.5">{subtitle}</Text> : null}
        </View>
      </View>

      <Switch
        value={value}
        onValueChange={readOnly ? undefined : onChange}
        trackColor={{ true: "#6EE7F0", false: "#3a3a3a" }}
        thumbColor={value ? "#0b0b0b" : "#bdbdbd"}
      />
    </View>
  );
}
