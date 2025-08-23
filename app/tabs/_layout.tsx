import CustomerHeader from '@/presentation/components/CustomerHeader/CustomerHeader';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#ED254E',
            tabBarInactiveTintColor: '#011936',
            headerShown: true,
            header: () => <CustomerHeader />,
            tabBarLabelStyle: {
                fontSize: 11,
                fontFamily: 'WinkyRough-Bold',
            },
            tabBarStyle: {
                position: 'absolute',
                bottom: 0, // Pegado abajo
                left: 0,
                right: 0,
                height: 80,
                borderTopWidth: 0,
                backgroundColor: 'tranparent', // Para usar tabBarBackground
                // Sombra hacia arriba (iOS)
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -6 }, // NEGATIVO = sombra hacia arriba
                shadowOpacity: 0.1,
                shadowRadius: 6,
                // Android
                elevation: 10,
                zIndex: 10,
            },
            tabBarBackground: () => (
                <LinearGradient
                    colors={['#F6F6F6', '#F6F6F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        flex: 1,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                />
            ),
        }}>
            <Tabs.Screen
                name="(dashboard)"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="notifications/index"
                options={{
                    title: 'Notificaciones',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="notifications" color={color} />,
                }}
            />
            <Tabs.Screen
                name="(bible)"
                options={{
                    title: 'Biblia',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="book" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings/index"
                options={{
                    title: 'Configuración',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="settings" color={color} />,
                }}
            />
        </Tabs>
    )
}

export default TabsLayout