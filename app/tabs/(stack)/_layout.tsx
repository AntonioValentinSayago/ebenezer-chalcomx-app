import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, StackActions } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';

const StackLayout = () => {
    const navigation = useNavigation();

    const onHeaderLeftClick = (canGoBack: boolean) => {
        if (canGoBack) {
            navigation.dispatch(StackActions.pop());
            return;
        }

        navigation.dispatch(DrawerActions.toggleDrawer);
    };
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: 'white',
                },
                headerLeft: ({ tintColor, canGoBack }) => (
                    <Ionicons
                        name={canGoBack ? 'arrow-back-outline' : 'grid-outline'}
                        className="mr-5"
                        size={20}
                        onPress={() => onHeaderLeftClick(canGoBack)}
                    />
                ),
            }}
        >
            <Stack.Screen
                name="home/index"
                options={{
                    title: 'Inicio',
                }}
            />

        </Stack>
    )
}

export default StackLayout