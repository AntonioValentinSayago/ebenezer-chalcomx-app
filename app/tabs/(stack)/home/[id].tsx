import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const BookDetailScreen = () => {
    const { id } = useLocalSearchParams();
    return (
        <SafeAreaView>
            <View className='p-4'>
                <Text>
                    { id }
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default BookDetailScreen