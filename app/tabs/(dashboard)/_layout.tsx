import { globalStylesLayout } from '@/presentation/styles/global-latout.css';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const StackLayout = () => {
    const navigation = useNavigation();

    // La función que se encarga de la navegación
    const handleGoBack = () => {
        // Usa `navigation.goBack()` para volver al stack anterior
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            // Si no se puede volver, muestra el menú del Drawer
            navigation.dispatch(DrawerActions.toggleDrawer());
        }
    };

    return (
        <Stack
            screenOptions={{
                // Usamos header completamente personalizado
                header: ({ back }) => (
                    <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
                        {/* El botón para volver */}
                        <TouchableOpacity
                            // Llama a la nueva función `handleGoBack`
                            onPress={handleGoBack}
                            className="p-2 rounded-full shadow shadow-black/10 "
                        >
                            <Ionicons
                                // Muestra el ícono de flecha hacia atrás si `back` es verdadero
                                name={back ? 'arrow-back-outline' : 'menu-outline'}
                                size={22}
                                color="#333"
                            />
                        </TouchableOpacity>
                        <Text
                            className="text-xl font-semibold text-slate-950"
                            style={globalStylesLayout.tabsBottom}
                        >Reyna Valera 1960</Text>
                        {/* El botón para abrir el menú (si existe) */}
                        <TouchableOpacity
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            className="p-2 rounded-full shadow shadow-black/10"
                        >
                            <Ionicons
                                name={'menu-outline'}
                                size={22}
                                color="#333"
                            />
                        </TouchableOpacity>
                    </View>
                ),
                contentStyle: {
                    backgroundColor: 'white', // Top del menu
                },
            }}
        >
            <Stack.Screen
                name="home/index"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            />
        </Stack>
    );
};

export default StackLayout;