
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_left", // 🔹 default para todas las screens
        header: ({ back }) => (
          <View className="flex-row justify-between items-center px-4 pt-12 pb-4 mt-8">
            {/* Botón volver */}
            <TouchableOpacity
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/tabs/(dashboard)");
                }
              }}
              className="p-2 rounded-full shadow shadow-black/10"
            >
              <Ionicons name="arrow-back-outline" size={22} color="#333" />
            </TouchableOpacity>

            {/* Título */}
            <Text className="text-sm font-semibold text-slate-950">
              Miembros Activos de la Iglesia
            </Text>
          </View>
        ),
        contentStyle: {
          backgroundColor: "#fff8ec",
        },
      }}
    >
      {/* Pantalla Home sin header */}
      <Stack.Screen
        name="home/index"
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>

  );
};

export default StackLayout;
