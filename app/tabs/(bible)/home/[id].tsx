import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { FlatList, Pressable, SafeAreaView, Text } from 'react-native';

export default function ChaptersScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const chapters = Array.from({ length: 50 }, (_, i) => i + 1); // simulado

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-black mb-4">Capítulos de {id}</Text>
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.toString()}
        numColumns={4}
        renderItem={({ item, index }) => (
          <MotiView from={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 50 }} className="m-2">
            <Pressable onPress={() => router.push({
              pathname: '/tabs/(stack)/home/[id]',
              params: { id: id?.toString(), chapter: item.toString() }
            })} className="bg-black/10 rounded-xl px-4 py-3">
              <Text className="text-black font-semibold">{item}</Text>
            </Pressable>
          </MotiView>
        )}
      />
    </SafeAreaView>
  );
}
