import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiText, MotiView } from "moti";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import HomeAuthStep from './auth';

import logoBackground from '../assets/images/logo_sinBackground.png';

export default function WelcomeEbenezer() {
    /** Configuracion de los Steps */
    const [step, setStep] = useState(1);

    return (
        <>
            {step === 1 ? (
                <View className="flex-1" style={{ backgroundColor: 'white' }}>
                    <LinearGradient
                        colors={["#ffffff", "#f8f8f8", "#f0f0f0"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                    />

                    {/* Glow Orbs */}
                    <MotiView
                        from={{ opacity: 0, translateY: 30 }}
                        animate={{ opacity: 1, translateY: -10 }}
                        transition={{ type: "timing", duration: 2200, loop: true, repeatReverse: true }}
                        className="absolute -top-16 -left-10 h-56 w-56 rounded-full"
                        style={{ backgroundColor: "rgba(131, 172, 189, 200)", filter: "blur(60px)" as any }}
                    />
                    <MotiView
                        from={{ opacity: 0.2, translateX: -20 }}
                        animate={{ opacity: 0.8, translateX: 20 }}
                        transition={{ type: "timing", duration: 2600, loop: true, repeatReverse: true }}
                        className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full"
                        style={{ backgroundColor: "rgba(16, 21, 39, 0.20)", filter: "blur(70px)" as any }}
                    />

                    {/* Floating Icons */}
                    <MotiView
                        from={{ translateY: 0 }}
                        animate={{ translateY: -12 }}
                        transition={{ loop: true, repeatReverse: true, duration: 3000 }}
                        className="absolute top-24 left-8"
                    >
                        <Ionicons name="sparkles-outline" size={28} color="#6e7588" />
                    </MotiView>
                    <MotiView
                        from={{ translateY: 0, rotate: "0deg" }}
                        animate={{ translateY: 10, rotate: "10deg" }}
                        transition={{ loop: true, repeatReverse: true, duration: 3200 }}
                        className="absolute top-10 right-10"
                    >
                        <Ionicons name="diamond-outline" size={24} color="#e43e5a" />
                    </MotiView>

                    {/* Header / Logo */}
                    <View className="items-center mt-28">
                        {/* Placeholder logo circle */}
                        <View className="h-20 w-20 rounded-full items-center justify-center bg-cyan-700 border border-slate/10">
                            <Image source={logoBackground} style={{ width: 60, height: 60 }} />
                        </View>
                        <MotiText
                            from={{ opacity: 0, translateY: 8 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ type: "timing", duration: 700 }}
                            className="text-2xl font-extrabold mt-4 tracking-wide"
                            style={{ color: '#343d53', fontFamily: 'WinkyRough-Bold' }}
                        >
                            Ebenezer - Principe de Paz
                        </MotiText>
                        <MotiText
                            from={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 400, duration: 700 }}
                            className="text-slate-400 text-base mt-1 text-center px-8"
                            style={{ fontFamily: 'WinkyRough-Bold' }}
                        >
                            Hasta que todos lleguemos a la unidad de la fe.
                        </MotiText>
                    </View>

                    {/* Welcome Card */}
                    <View className="flex-1 justify-center px-6">
                        <MotiView
                            className="bg-white rounded-2xl p-6 relative"
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.15,
                                shadowRadius: 6,
                                elevation: 8, // Android
                            }}
                        >
                            {/* Tarjeta innovadora en el centro */}
                            <View className="items-center bg-white rounded-2xl p-6">
                                {/* Versículo con animación */}
                                <MotiText
                                    from={{ opacity: 0, translateY: 10 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: "timing", duration: 1200 }}
                                    className="text-center text-lg leading-6 px-4"
                                    style={{ color: "#343d53", fontFamily: "WinkyRough-Bold" }}
                                >
                                    “Jehová te bendiga y te guarde; Jehová haga resplandecer su rostro sobre ti,
                                    y tenga de ti misericordia.”
                                </MotiText>
                                <Text className="text-slate-400 text-sm mt-2 italic">
                                    Números 6:24-25
                                </Text>

                                {/* Línea decorativa animada */}
                                <MotiView
                                    from={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ type: "timing", duration: 1000, delay: 300 }}
                                    className="h-0.5 bg-red-400 w-2/3 mt-4 rounded-full"
                                />

                                {/* Íconos decorativos */}
                                <View className="flex-row mt-6 gap-8">
                                    <MotiView
                                        from={{ rotate: "0deg" }}
                                        animate={{ rotate: "360deg" }}
                                        transition={{ loop: true, duration: 5000 }}
                                    >
                                        <Ionicons name="flame-outline" size={28} color="#e43e5a" />
                                    </MotiView>
                                    <MotiView
                                        from={{ scale: 0.8 }}
                                        animate={{ scale: 1.2 }}
                                        transition={{ loop: true, repeatReverse: true, duration: 2000 }}
                                    >
                                        <Ionicons name="heart-outline" size={28} color="#343d53" />
                                    </MotiView>
                                    <MotiView
                                        from={{ opacity: 0.4 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ loop: true, repeatReverse: true, duration: 1800 }}
                                    >
                                        <Ionicons name="musical-notes-outline" size={28} color="#6e7588" />
                                    </MotiView>
                                </View>
                            </View>

                        </MotiView>
                    </View>

                    {/* Actions */}
                    <View className="px-6 mb-10">
                        <Pressable
                            onPress={() => setStep(2)}
                            className="active:bg-red-900 rounded-2xl items-center justify-center py-4 shadow-lg shadow-emerald-700/20"
                            style={{ backgroundColor: '#83acbd' }}
                            android_ripple={{ color: "#34d399" }}
                        >

                            <View className="flex-row items-center gap-2">
                                <Ionicons name="log-in-outline" size={20} color="#0b1020" />
                                <Text className="text-white font-bold text-base tracking-wide">Entrar</Text>
                            </View>
                        </Pressable>

                        <Pressable onPress={() => { }} className="items-center mt-4">
                            <Text className="text-slate-900">Entrar como <Text className="text-red-900 font-semibold">Invitado</Text></Text>
                        </Pressable>

                        {/* Footer */}
                        <View className="items-center mt-6 opacity-80">
                            <Text className="text-slate-700 text-xs">© {new Date().getFullYear()} Ministerios Ebenezer</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <HomeAuthStep onBack={() => setStep(1)} />
            )}
        </>
    );
}
