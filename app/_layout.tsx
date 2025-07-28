import { Link } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import mujeres1 from '../assets/images/background-1.png';
import bgImage1 from '../assets/images/background-2.png';
import mujeres from '../assets/images/background-4.png';
import bgImage from '../assets/images/test.png';


const { width } = Dimensions.get('window');
SplashScreen.preventAutoHideAsync();

export default function App() {
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  // Reusable floating animation
  const animateFloat = (animatedValue: Animated.Value | Animated.ValueXY, delay = 0) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -10,
          duration: 2000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateFloat(float1, 0);
    animateFloat(float2, 1000);
    animateFloat(float3, 2000);
  }, []);

  const [fontsLoaded, error] = useFonts({
    'WinkyRough-Light': require('../assets/fonts/static/WinkyRough-Light.ttf'),
    'WinkyRough-Medium': require('../assets/fonts/static/WinkyRough-Medium.ttf')
  })

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null

  return (
    <ImageBackground
      source={bgImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Floating images */}
        <Animated.View style={[styles.icon, styles.icon1, { transform: [{ translateY: float1 }] }]}>
          <Image source={bgImage1} style={styles.iconImage} />
          <LinearGradient
            colors={['rgba(255,255,255,0.4)', 'transparent']}
            style={styles.iconOverlay}
          />
        </Animated.View>

        <Animated.View style={[styles.icon, styles.icon2, { transform: [{ translateY: float2 }] }]}>
          <Image source={mujeres} style={styles.iconImage} />
          <LinearGradient
            colors={['rgba(255,255,255,0.4)', 'transparent']}
            style={styles.iconOverlay}
          />
        </Animated.View>

        <Animated.View style={[styles.icon, styles.icon3, { transform: [{ translateY: float3 }] }]}>
          <Image source={mujeres1} style={styles.iconImage} />
          <LinearGradient
            colors={['rgba(255,255,255,0.4)', 'transparent']}
            style={styles.iconOverlay}
          />
        </Animated.View>

        {/* Text */}
        <View style={styles.textBlock}>
          <Text style={styles.title}>Ebenezer Principe de Paz</Text>
          <Text style={styles.highlight}>¡Bienvenido! La paz de Dios sea contigo hoy y por siempre.</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <LinearGradient
              colors={['#0c0326', '#030417']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.description}>
            Si eres nuevo puedes entrar <Link screen="Profile" params={{ id: 'jane' }} style={styles.color}> aqui</Link>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  position: {
    marginTop: 2000
  },
  icon: {
    position: 'absolute',
    width: 180,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 2,
    elevation: 14,
    shadowColor: 'rgba(0,0,0,0.10)',
    shadowOffset: { width: 12, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 75,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
  },
  icon1: {
    top: 80,
    left: 10,
  },
  icon2: {
    top: 150,
    left: width / 2 - 105,
  },
  icon3: {
    top: 120,
    right: 10,
  },
  textBlock: {
    zIndex: 1,
  },
  title: {
    fontFamily: 'WinkyRough-Light',
    fontSize: 52,
    lineHeight: 56,
    fontWeight: '400',
    color: '#13213C',
  },
  highlight: {
    fontFamily: 'WinkyRough-Medium',
    fontSize: 20,
    lineHeight: 38,
    fontWeight: '900',
    color: '#0E0F552',
    marginTop: 4,
  },
  description: {
    fontFamily: 'WinkyRough-Light',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  button: {
    marginTop: 24,
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#ffff',
  },
  color: {
    color: '#FF6B6B',
    fontWeight: 900
  }
});
