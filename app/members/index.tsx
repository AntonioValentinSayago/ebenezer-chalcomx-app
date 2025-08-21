
import { ScrollView } from "moti";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";


const users = [
    { id: 1, name: 'Neil Sims', email: 'neil.sims@flowbite.com', position: 'React Developer', status: 'Online', profilePic: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg' },
    { id: 2, name: 'Bonnie Green', email: 'bonnie@flowbite.com', position: 'Designer', status: 'Online', profilePic: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg' },
    { id: 3, name: 'Jese Leos', email: 'jese@flowbite.com', position: 'Vue JS Developer', status: 'Online', profilePic: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg' },
    { id: 4, name: 'Thomas Lean', email: 'thomes@flowbite.com', position: 'UI/UX Engineer', status: 'Online', profilePic: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg' },
    { id: 5, name: 'Leslie Livingston', email: 'leslie@flowbite.com', position: 'SEO Specialist', status: 'Offline', profilePic: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg' },
];

export default function MembersScreen() {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View className="flex-1 bg-gray-900 pt-10">
            {/* Header and Search */}
            <View className="flex-row items-center justify-between p-4 bg-gray-900">
                <View>
                    <TouchableOpacity
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                        className="flex-row items-center border border-gray-600 rounded-lg px-3 py-1.5"
                    >
                        <Text className="text-gray-400 font-medium text-sm">Action</Text>
                        <Text className="ml-2 text-gray-400">▼</Text>
                    </TouchableOpacity>

                    {/* Dropdown menu - simplified for mobile */}
                    {dropdownVisible && (
                        <View className="absolute top-12 z-10 w-44 bg-gray-700 rounded-lg shadow-sm">
                            <TouchableOpacity className="py-2 px-4 hover:bg-gray-600">
                                <Text className="text-gray-200">Reward</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="py-2 px-4 hover:bg-gray-600">
                                <Text className="text-gray-200">Promote</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="py-2 px-4 hover:bg-gray-600">
                                <Text className="text-gray-200">Activate account</Text>
                            </TouchableOpacity>
                            <View className="h-px bg-gray-600 my-1" />
                            <TouchableOpacity className="py-2 px-4 hover:bg-gray-600">
                                <Text className="text-sm text-gray-200">Delete User</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Search input */}
                <View className="relative">
                    <TextInput
                        placeholder="Search for users"
                        placeholderTextColor="gray"
                        value={searchText}
                        onChangeText={setSearchText}
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-600 rounded-lg w-40 bg-gray-700 text-white"
                    />
                    <Text className="absolute inset-y-0 start-0 flex items-center pl-3 text-gray-400">🔍</Text>
                </View>
            </View>

            <ScrollView className="w-full">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <View key={user.id} className="flex-row items-center p-4 border-b border-gray-700 bg-gray-800 justify-end">
                            <View className="flex-row items-center flex-1"> 
                                <Image
                                    source={{ uri: user.profilePic }}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <View>
                                    <Text className="text-white font-semibold text-base">{user.name}</Text>
                                    <Text className="text-gray-500 font-normal">{user.email}</Text>
                                </View>
                            </View>

                            <View className="flex-1 justify-items-end">
                                <Text className="text-gray-400">{user.position}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <View className="flex-1 items-center justify-center mt-10">
                        <Text className="text-gray-400 text-lg">No users found.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
