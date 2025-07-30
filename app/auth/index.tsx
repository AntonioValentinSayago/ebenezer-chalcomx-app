import { router } from 'expo-router';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    onBack: () => void;
}
const HomeAuthStep = ({ onBack }: Props) => {
    return (
        <SafeAreaView>
            <View>
                <Text>HomeAuthStep</Text>
                <Button title="Volver al paso 1" onPress={onBack} />
                <TextInput
                    value="Usuario"
                />
                <TextInput
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                />
                <Button
                    title="Entrar"
                    onPress={() =>  router.push('/tabs/dashboard')}
                />
            </View>
        </SafeAreaView>
    )
}

export default HomeAuthStep