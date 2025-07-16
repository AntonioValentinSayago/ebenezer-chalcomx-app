import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import "../global.css"

const _layout = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center px-6 space-y-6">
      {/* Ilustración */}
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        className="w-72 h-72"
        resizeMode="contain"
      />

      {/* Título */}
      <Text className="text-2xl font-bold text-orange-600 text-center">
        Discover Your{'\n'}Dream Job here
      </Text>

      {/* Subtítulo */}
      <Text className="text-base text-gray-500 text-center px-2">
        Explore all the existing job roles based on your{'\n'}
        interest and study major
      </Text>

      {/* Botones */}
      <View className="flex-row space-x-4 mt-6">
        <TouchableOpacity
          onPress={() => console.log('Login Pressed')}
          className="bg-orange-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('Register Pressed')}
          className="border border-orange-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-orange-600 font-semibold">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default _layout