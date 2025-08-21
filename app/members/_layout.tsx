import { globalStylesLayout } from '@/presentation/styles/global-latout.css';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
         animation: "slide_from_right", // 🔹 animación al entrar
        // Header personalizado
        header: ({ back }) => (
          <View className="flex-row justify-between items-center px-4 pt-12 pb-4 mt-8">
            {/* Botón volver */}
            <TouchableOpacity
              onPress={() => {
                if (router.canGoBack()) {
                  router.back(); // 🔹 vuelve a la última pantalla visitada (ej. dashboard)
                } else {
                  router.replace("/tabs/(dashboard)"); // 🔹 fallback si no hay historial
                }
              }}
              className="p-2 rounded-full shadow shadow-black/10"
            >
              <Ionicons
                name="arrow-back-outline"
                size={22}
                color="#333"
              />
            </TouchableOpacity>

            {/* Título */}
            <Text
              className="text-xl font-semibold text-slate-950"
              style={globalStylesLayout.tabsBottom}
            >
              Miembros con Membresía
            </Text>

          </View>
        ),
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          headerShown: false,
          animation: "slide_from_bottom", // 🔹 solo aquí
        }}
      />
    </Stack>
  );
};

export default StackLayout;
