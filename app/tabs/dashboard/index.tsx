import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DashboardScreen = () => {
    return (
        <SafeAreaView>
            <View className='px-10 mt-5'>
                <Text>DashboardScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default DashboardScreen