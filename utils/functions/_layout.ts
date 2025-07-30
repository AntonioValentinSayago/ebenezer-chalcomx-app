import { Animated } from 'react-native';

/**
 * Animación de flotación infinita para un valor animado
 * @param animatedValue - Valor de tipo Animated.Value
 * @param delay - Retraso opcional para desincronizar animaciones
 */
export const animateFloat = (
    animatedValue: Animated.Value,
    delay: number = 0
) => {
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
