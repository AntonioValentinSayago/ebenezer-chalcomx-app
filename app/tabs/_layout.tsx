// app/_layout.tsx
import CustomerHeader from '@/presentation/components/CustomerHeader/CustomerHeader';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#046473',
          tabBarInactiveTintColor: '#011936',
          headerShown: true,
          header: () => <CustomerHeader />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'WinkyRough-Bold',
            marginBottom: 10,
          },
          tabBarItemStyle: {
            width: 70, // Reduce el ancho de cada tab para dar espacio
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 84,
            paddingHorizontal: 24, // Espacio extra a los lados
            borderTopWidth: 0,
            backgroundColor: 'transparent',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -6 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 10,
            zIndex: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
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
        }}
      >
        {/* TAB IZQUIERDA */}
        <Tabs.Screen
          name="(dashboard)"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications/index"
          options={{
            title: 'Channels',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />
            ),
          }}
        />

        {/* TAB DERECHA */}
        <Tabs.Screen
          name="(bible)"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => (
              <Ionicons name="search-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: 'More',
            tabBarIcon: ({ color }) => (
              <Ionicons name="apps-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* BOTÓN FLOTANTE CENTRAL */}
      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#1E66FF', '#0A56F0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientRombo}
        >
          <Ionicons
            name="create-outline"
            size={26}
            color="#fff"
            style={{ transform: [{ rotate: '-45deg' }] }}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 18,
    zIndex: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    transform: [{ rotate: '45deg' }],
  },
  gradientRombo: {
    flex: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
