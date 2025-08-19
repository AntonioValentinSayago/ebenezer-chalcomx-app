// app/tabs/(stack)/home/[chapter].tsx
import { useLocalSearchParams } from 'expo-router';
import { MotiText, MotiView } from 'moti';
import React, { useRef, useState } from 'react';
import { FlatList, Text, useColorScheme, View } from 'react-native';

type Params = {
    bookName?: string;
    chapter?: string;
};

type Verse = {
    number: number;
    text: string;
};

// Simulamos versículos (puedes reemplazar por los reales)
const makeDummyVerses = (n = 25) =>
    Array.from({ length: n }, (_, i) => ({
        number: i + 1,
        text: `Este es un versículo de ejemplo número ${i + 1}. Texto simulado para la demo de animaciones y scroll.`,
    })) as Verse[];

export default function ChapterVersesScreen() {
    const { bookName = 'Libro', chapter = '1' } = useLocalSearchParams<Params>();
    const colorScheme = useColorScheme(); // 'dark' | 'light' | null
    const themeIsDark = colorScheme === 'dark';

    const verses = makeDummyVerses(30);
    const [focusedVerse, setFocusedVerse] = useState<number>(1);

    // onViewableItemsChanged para detectar cuál está en foco al hacer scroll
    const onViewRef = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems && viewableItems.length > 0) {
            // Tomamos el primero visible con mayor % de visibilidad
            setFocusedVerse(viewableItems[0].item.number);
        }
    });
    const viewConfigRef = useRef({ itemVisiblePercentThreshold: 55 });

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold text-black mb-4">{bookName} — Capítulo {chapter}</Text>

            <FlatList
                data={verses}
                keyExtractor={(v) => String(v.number)}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item }) => {
                    const isFocused = item.number === focusedVerse;
                    // Color dinámico: si tema claro -> texto focal en negro; si oscuro -> blanco
                    const focusedColor = themeIsDark ? '#ffffff' : '#000000';
                    const unfocusedColor = themeIsDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
                    const bg = isFocused ? (themeIsDark ? 'bg-black/70' : 'bg-black/2') : 'bg-transparent';

                    return (
                        <MotiView
                            from={{ opacity: 0.6, translateY: 8 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ type: 'timing', duration: 280 }}
                            className={`mb-3 rounded-lg px-3 py-2 ${bg}`}
                        >
                            <MotiText
                                // animamos opacidad y color cuando cambia el foco
                                animate={{
                                    opacity: isFocused ? 1 : 0.45,
                                }}
                                transition={{ type: 'timing', duration: 260 }}
                                style={{ color: isFocused ? focusedColor : unfocusedColor }}
                                className="text-base"
                            >
                                <Text style={{ fontWeight: '700' }}>{item.number} </Text>
                                <Text>{item.text}</Text>
                            </MotiText>
                        </MotiView>
                    );
                }}
            />
        </View>
    );
}
