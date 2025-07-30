import { globalStylesLayout } from '@/presentation/styles/global-latout.css';
import { animateFloat } from '@/utils/functions/_layout';
import { Link } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import mujeres1 from '../assets/images/background-1.png';
import bgImage1 from '../assets/images/background-2.png';
import mujeres from '../assets/images/background-4.png';
import bgImage from '../assets/images/test.png';
import HomeAuthStep from './auth';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const float1 = useRef(new Animated.Value(0)).current;
    const float2 = useRef(new Animated.Value(0)).current;
    const float3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateFloat(float1, 0);
        animateFloat(float2, 1000);
        animateFloat(float3, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Configuracion de los Steps */
    const [step, setStep] = useState(1);

    return (
        <ImageBackground
            source={bgImage}
            style={globalStylesLayout.background}
            resizeMode="cover"
        >
            {step === 1 ? (
                <View style={globalStylesLayout.container}>
                    {/* Floating images */}
                    <Animated.View style={[globalStylesLayout.icon, globalStylesLayout.icon1, { transform: [{ translateY: float1 }] }]}>
                        <Image source={bgImage1} style={globalStylesLayout.iconImage} />
                        <LinearGradient
                            colors={['rgba(255,255,255,0.4)', 'transparent']}
                            style={globalStylesLayout.iconOverlay}
                        />
                    </Animated.View>

                    <Animated.View style={[globalStylesLayout.icon, globalStylesLayout.icon2, { transform: [{ translateY: float2 }] }]}>
                        <Image source={mujeres} style={globalStylesLayout.iconImage} />
                        <LinearGradient
                            colors={['rgba(255,255,255,0.4)', 'transparent']}
                            style={globalStylesLayout.iconOverlay}
                        />
                    </Animated.View>

                    <Animated.View style={[globalStylesLayout.icon, globalStylesLayout.icon3, { transform: [{ translateY: float3 }] }]}>
                        <Image source={mujeres1} style={globalStylesLayout.iconImage} />
                        <LinearGradient
                            colors={['rgba(255,255,255,0.4)', 'transparent']}
                            style={globalStylesLayout.iconOverlay}
                        />
                    </Animated.View>

                    {/* Text */}
                    <View style={globalStylesLayout.textBlock}>
                        <Text style={globalStylesLayout.title}>Ebenezer Principe de Paz</Text>
                        <Text style={globalStylesLayout.highlight}>¡Bienvenido! La paz de Dios sea contigo hoy y por siempre.</Text>
                        <TouchableOpacity
                            activeOpacity={0.8} style={globalStylesLayout.button}
                            onPress={() => setStep(2)}
                        >
                            <LinearGradient
                                colors={['#0c0326', '#030417']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={globalStylesLayout.gradient}
                            >
                                <Text style={globalStylesLayout.buttonText}>Continuar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <Text style={globalStylesLayout.description}>
                            Si eres nuevo puedes entrar <Link screen="Profile" params={{ id: 'jane' }} style={globalStylesLayout.color}> aqui</Link>
                        </Text>
                    </View>
                </View>
            ) : (
                <HomeAuthStep onBack={() => setStep(1)} />
            )}
        </ImageBackground>
    );
}