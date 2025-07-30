import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";

import { useFonts } from 'expo-font';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'WinkyRough-Light': require('../assets/fonts/static/WinkyRough-Light.ttf'),
    'WinkyRough-Medium': require('../assets/fonts/static/WinkyRough-Medium.ttf')
  })

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return <Slot />;
};
export default RootLayout;
