import { Feather } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

const CustomClapsBendiciones = () => {
    // Datos de ejemplo para el muro de bendiciones
    const blessingsData = [
        { id: 1, sender: 'Ana L.', blessing: '¡Tu sonrisa siempre ilumina mi día! Dios te bendiga.', timestamp: 'hace 2 horas' },
        { id: 2, sender: 'Carlos M.', blessing: 'Gracias por tu ayuda con el evento. Tu servicio es un reflejo del amor de Dios.', timestamp: 'hace 1 día' },
        { id: 3, sender: 'Familia R.', blessing: 'Oramos por ti y tu familia. Que el Señor les dé paz.', timestamp: 'hace 3 días' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="p-4">
                {/* Cabecera del Dashboard */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-lg font-bold text-gray-800">
                        Mi Muro de Bendiciones
                    </Text>
                </View>

                {/* Resumen de Bendiciones */}
                <View className="bg-white rounded-sm shadow p-6 mb-20">
                    <View className="flex-row items-center mb-2">
                        <Text className="text-4xl font-extrabold text-cyan-800">
                            47
                        </Text>
                        <Feather name="gift" size={32} color="#ffa8ff" className="ml-2" />
                    </View>
                    <Text className="text-gray-600 text-lg font-medium">
                        Bendiciones recibidas
                    </Text>
                </View>

                {/* Muro de Bendiciones */}
                {/* <View>
                    <Text className="text-xl font-semibold text-gray-800 mb-4">
                        Bendiciones Recientes
                    </Text>
                    {blessingsData.map((item) => (
                        <View key={item.id} className="bg-white rounded-xl shadow-lg p-4 mb-4">
                            <Text className="text-gray-800 text-base leading-snug">{item.blessing}</Text>
                            <View className="flex-row justify-between items-center mt-3">
                                <Text className="text-gray-500 text-xs mt-2">De: {item.sender}</Text>
                                <Text className="text-gray-500 text-xs mt-2">{item.timestamp}</Text>
                            </View>
                        </View>
                    ))}
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CustomClapsBendiciones;