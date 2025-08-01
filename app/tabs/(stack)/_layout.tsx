import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, StackActions } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const StackLayout = () => {
    const navigation = useNavigation();

    const onHeaderLeftClick = (canGoBack: boolean) => {
        if (canGoBack) {
            navigation.dispatch(StackActions.pop());
        } else {
            navigation.dispatch(DrawerActions.toggleDrawer());
        }
    };

    return (
        <Stack
            screenOptions={{
                // 👇 Usamos header completamente personalizado
                header: ({ back }) => (
                    <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
                        <TouchableOpacity
                            onPress={() => onHeaderLeftClick(!!back)}
                            className="p-2 rounded-full bg-yellow-500 shadow shadow-black/10"
                        >
                            <Ionicons
                                name={back ? 'arrow-back-outline' : 'arrow-back-outline'}
                                size={22}
                                color="#333"
                            />
                        </TouchableOpacity>
                        <Text className="text-xl font-semibold text-gray-800">Reyna Valena 1960</Text>
                        <TouchableOpacity
                            onPress={() => onHeaderLeftClick(!!back)}
                            className="p-2 rounded-full bg-yellow-500 shadow shadow-black/10"
                        >
                            <Ionicons
                                name={back ? 'menu-outline' : 'menu-outline'}
                                size={22}
                                color="#333"
                            />
                        </TouchableOpacity>

                    </View>
                ),
                contentStyle: {
                    backgroundColor: '#F1f1e8',
                },
            }}
        >
            <Stack.Screen
                name="home/index"
                options={{
                    headerShown: true,
                }}
            />
        </Stack>
    );
};

export default StackLayout;
