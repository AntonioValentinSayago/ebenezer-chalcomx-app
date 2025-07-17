import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import "../global.css"
import { Colors } from '../utils/constants/Colors'

const _layout = () => {
  const { colorsPrimary, fondosBotones, fondosCards  } = Colors;
  return (
    <View className="flex-1 justify-center items-center px-6 space-y-6"
      style={{ backgroundColor: colorsPrimary.backgroundWhiteSix }}
    >
      {/* Título */}
      <Text className="text-2xl font-bol text-center"
        style={{
          color: fondosBotones.fondoBotonAzulFour,
          fontWeight: 'bold',
        }}
      >
        Principe de Paz{'\n'}Ebenezer Chalco MX
      </Text>

      {/* Subtítulo */}
      <Text className="text-center px-2 rounded-xl"
        style={{ 
          color: fondosBotones.fondoBotonAzulThree, 
          width: '95%',
          height: 90,
          backgroundColor: colorsPrimary.backgroundWhiteFour,
          padding: 10,
          boxShadow: '4px 5px 21px 9px rgba(0,0,0,0.1);',
          fontWeight: '900',
        }}
      >
        Explore all the existing job roles based on your{'\n'}
        Aqui va el texto de una card .......
      </Text>

      {/* Botones */}
      <View className="flex-row space-x-4 mt-6">
        <TouchableOpacity
          onPress={() => console.log('Login Pressed')}
          className="rounded-xl"
          style={{ 
            backgroundColor:   fondosBotones.fondoBotonAzulThree,
            paddingHorizontal: 5,
            paddingVertical: 55, 
          }}
        >
          <Text className="text-white font-semibold">Botones Guardar/ver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('Register Pressed')}
          className="border rounded-xl"
          style={{ 
            backgroundColor: fondosBotones.fondoBotonRojoFive,
            paddingHorizontal: 5,
            paddingVertical: 55, 
          }}
        >
          <Text className="text-white font-semibold">Botones Secundarios{'\n'} para eliminar o cancelar</Text>
        </TouchableOpacity>
                <TouchableOpacity
          onPress={() => console.log('Register Pressed')}
          className="border rounded-xl"
          style={{ 
            backgroundColor: fondosCards.fondoAmarilloCardSeven,
            paddingHorizontal: 5,
            paddingVertical: 55, 
          }}
        >
          <Text className="text-slate-900 font-semibold">Botones Tercero</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default _layout