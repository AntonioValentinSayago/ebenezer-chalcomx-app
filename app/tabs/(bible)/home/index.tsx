import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { MotiText, MotiView } from 'moti';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Book {
  id: string;
  name: string;
  abbrev: string;
  testament: 'OT' | 'NT';
  chapters: number;
  verses: number;
}

const BOOKS: Book[] = [
  // Old Testament
  { id: 'gen', name: 'Genesis', abbrev: 'Gen', testament: 'OT', chapters: 50, verses: 1533 },
  // New Testament
  { id: 'mat', name: 'Matthew', abbrev: 'Matt', testament: 'NT', chapters: 28, verses: 1071 },
  { id: 'rev', name: 'Revelation', abbrev: 'Rev', testament: 'NT', chapters: 22, verses: 404 },
];

interface HeaderProps {
  search: string;
  setSearch: (text: string) => void;
  filter: 'ALL' | 'OT' | 'NT';
  setFilter: (filter: 'ALL' | 'OT' | 'NT') => void;
}

function Header({ search, setSearch, filter, setFilter }: HeaderProps) {
  return (
    <View className="px-4 pt-8 pb-2 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 shadow shadow-slate-600">
      <MotiText from={{ opacity: 0, translateY: -10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 500 }} className="text-2xl text-black font-semibold text-center">
        Biblia — RVA 1960
      </MotiText>
      <Text className="text-sm text-gray-700 text-center mt-1">66 libros · busca, filtra y explora</Text>

      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center bg-black/5 rounded-lg px-3 py-2">
            <AntDesign name="search1" size={18} color="black" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar libro..."
              placeholderTextColor="#4b5563"
              className="ml-2 text-black flex-1"
            />
          </View>
        </View>

        <View className="flex-row ml-2">
          {['ALL', 'OT', 'NT'].map((t) => (
            <Pressable key={t} onPress={() => setFilter(t as 'ALL' | 'OT' | 'NT')} className={`ml-2 px-3 py-2 rounded-lg ${filter === t ? 'bg-black/10' : 'bg-black/5'}`}>
              <Text className="text-sm text-black">{t === 'ALL' ? 'Todos' : t}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

interface BookCardProps {
  item: Book;
  onPress: (item: Book) => void;
}

function BookCard({ item, onPress }: BookCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 300 }}
      className="m-2 min-w-[140px] max-w-[240px] bg-white rounded-2xl shadow "
    >
      <Pressable onPress={() => onPress(item)} className="m-2 flex-1 min-w-[140px] max-w-[220px] bg-black/5 rounded-2xl shadow">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold text-black">{item.name}</Text>
            <Text className="text-xs text-gray-700 mt-1">{item.abbrev} · {item.testament}</Text>
          </View>
          <View className="bg-black/10 rounded-full px-3 py-1">
            <Text className="text-sm text-black">{item.chapters}</Text>
          </View>
        </View>

        <View className="mt-4">
          <Text className="text-sm text-gray-700">Capítulos: <Text className="text-black font-semibold">{item.chapters}</Text></Text>
          <Text className="text-sm text-gray-700 mt-1">Versículos: <Text className="text-black font-semibold">{item.verses}</Text></Text>
        </View>
      </Pressable>
    </MotiView>
  );
}

export default function App() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'OT' | 'NT'>('ALL');
  const [selected, setSelected] = useState<Book | null>(null);

  const data = useMemo(() => {
    const s = search.trim().toLowerCase();
    return BOOKS.filter(b => {
      if (filter !== 'ALL' && b.testament !== filter) return false;
      if (!s) return true;
      return b.name.toLowerCase().includes(s) || b.abbrev.toLowerCase().includes(s);
    });
  }, [search, filter]);

  function openBook(book: Book) {
    setSelected(book);
  }

  function closeDetail() {
    setSelected(null);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <Header search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

        <View className="px-2 pt-4 flex-1">
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => <BookCard item={item} onPress={openBook} />}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        </View>

        {selected && (
          <View className="absolute inset-0 top-[header-height] justify-end" style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            <Pressable style={{ flex: 1 }} onPress={closeDetail} />
            <MotiView
              from={{ translateY: 300 }}
              animate={{ translateY: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="bg-slate-100 rounded-t-3xl p-6 mb-20"
            >
              <FlatList
                data={Array.from({ length: selected.chapters }, (_, i) => ({ number: i + 1, text: ` ${i + 1}` }))}
                keyExtractor={(item) => String(item.number)}
                numColumns={4}
                renderItem={({ item }) => (
                  <MotiView
                    from={{ opacity: 0, translateY: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 300 }}
                    className="flex-1 mb-3 p-4 bg-slate-200 rounded-lg mx-1" // <-- Cambia aquí
                  >
                    <Text className="text-base text-black">{item.number}. {item.text}</Text>
                  </MotiView>
                )}
              />

              <View className="mt-4">
                <Pressable onPress={closeDetail} className="py-3 rounded-lg bg-black items-center">
                  <Text className="text-white font-semibold">Cerrar</Text>
                </Pressable>
              </View>
            </MotiView>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
