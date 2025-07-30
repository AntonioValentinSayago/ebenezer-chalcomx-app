import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ 
            tabBarActiveTintColor: '#13213C',
            headerShown: false
        }}>
            <Tabs.Screen
                name="dashboard/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="(stack)"
                options={{
                    title: 'Biblia',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="book-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="person-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings/index"
                options={{
                    title: 'Configuración',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="menu-outline" color={color} />,
                }}
            />
        </Tabs>
    )
}

export default TabsLayout