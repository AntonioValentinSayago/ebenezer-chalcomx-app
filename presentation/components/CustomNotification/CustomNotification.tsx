import { MotiView } from 'moti'
import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'

import { Notification } from '@/infrastructure/interfaces'

/**
 * 
 * @returns Componente para mostrar notificaciones personalizadas
 */
interface Props {
    notifications: Notification[]
}

const CustomNotification = ({ notifications } : Props) => {
    return (
        <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Notificaciones</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
                {notifications.map((n) => (
                    <MotiView
                        key={n.id}
                        from={{ opacity: 0, translateX: 10 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ type: 'timing' }}
                        style={{ padding: 4 }}
                    >
                        <View className="w-[300px] rounded-2xl bg-white p-3 shadow mr-2">
                            <View className="flex-row items-center mb-2">
                                <Image
                                    source={n.photo ? { uri: n.photo } : require("../../../assets/images/gr2174_1080_1920.png")}
                                    className="w-16 h-16 rounded-lg mr-3"
                                />
                                <View className="flex-1">
                                    <Text className="text-sm font-semibold">{n.title}</Text>
                                    <Text className="text-xs text-gray-500">{n.date}</Text>
                                    <Text className="text-xs text-gray-600 mt-1" numberOfLines={2}>{n.excerpt}</Text>
                                </View>
                            </View>
                            <View className="flex-row justify-end">
                                <Pressable className="px-3 py-2 rounded-lg bg-indigo-600">
                                    <Text className="text-white">Ver más</Text>
                                </Pressable>
                            </View>
                        </View>
                    </MotiView>
                ))}
            </ScrollView>
        </View>
    )
}

export default CustomNotification;