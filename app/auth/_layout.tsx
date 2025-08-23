import { Stack } from 'expo-router';

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_left", // 🔹 default para todas las screens
        contentStyle: {
          backgroundColor: "white",
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
