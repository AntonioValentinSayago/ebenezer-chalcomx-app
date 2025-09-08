import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomerHeader = () => {
    const { top } = useSafeAreaInsets();
    return (
        <View
            style={{
                paddingTop: top,
                paddingHorizontal: 16,
                paddingBottom: 12,
                backgroundColor: "#fff8ec",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'}}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginRight: 12,
                    }}
                />
                <View>
                    <Text style={{ fontSize: 14, color: 'blue'}}>nombre completo</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold'}}>Nombre departamento</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", gap: 16 , alignItems: "center" }}>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={28}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="log-out-outline" size={28}></Ionicons>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CustomerHeader;