import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import { useFonts } from 'expo-font';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'WinkyRough-Light': require('../assets/fonts/static/WinkyRough-Light.ttf'),
    'WinkyRough-Medium': require('../assets/fonts/static/WinkyRough-Medium.ttf'),
    'WinkyRough-Bold': require('../assets/fonts/static/WinkyRough-Bold.ttf'),
  })

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return <Stack>
    <Stack.Screen
      name="index"
      options={{
        headerShown: false, // <-- Agrega esta línea para ocultar el header
      }}
    />
    <Stack.Screen
      name="tabs"
      options={{ headerShown: false, animation: 'slide_from_right' }}
    />
    <Stack.Screen
      name="auth"
      options={{ headerShown: false, animation: 'slide_from_right' }}
    />
    <Stack.Screen
      name="members"
      // <---- Agrega esta opción para ocultar el header principal
      options={{ headerShown: false, animation: 'slide_from_right' }}
    />
  </Stack>
};
export default RootLayout;
