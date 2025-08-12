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

const BOOKS = [
  // Old Testament
  { id: 'gen', name: 'Genesis', abbrev: 'Gen', testament: 'OT', chapters: 50, verses: 1533 },
  { id: 'exo', name: 'Exodus', abbrev: 'Exo', testament: 'OT', chapters: 40, verses: 1213 },
  { id: 'lev', name: 'Leviticus', abbrev: 'Lev', testament: 'OT', chapters: 27, verses: 859 },
  { id: 'num', name: 'Numbers', abbrev: 'Num', testament: 'OT', chapters: 36, verses: 1288 },
  { id: 'deu', name: 'Deuteronomy', abbrev: 'Deu', testament: 'OT', chapters: 34, verses: 959 },
  { id: 'jos', name: 'Joshua', abbrev: 'Josh', testament: 'OT', chapters: 24, verses: 658 },
  { id: 'jdg', name: 'Judges', abbrev: 'Jud', testament: 'OT', chapters: 21, verses: 618 },
  { id: 'rut', name: 'Ruth', abbrev: 'Ruth', testament: 'OT', chapters: 4, verses: 85 },
  { id: '1sa', name: '1 Samuel', abbrev: '1Sam', testament: 'OT', chapters: 31, verses: 810 },
  { id: '2sa', name: '2 Samuel', abbrev: '2Sam', testament: 'OT', chapters: 24, verses: 695 },
  { id: '1ki', name: '1 Kings', abbrev: '1Ki', testament: 'OT', chapters: 22, verses: 816 },
  { id: '2ki', name: '2 Kings', abbrev: '2Ki', testament: 'OT', chapters: 25, verses: 719 },
  { id: '1ch', name: '1 Chronicles', abbrev: '1Chr', testament: 'OT', chapters: 29, verses: 942 },
  { id: '2ch', name: '2 Chronicles', abbrev: '2Chr', testament: 'OT', chapters: 36, verses: 822 },
  { id: 'ezr', name: 'Ezra', abbrev: 'Ezra', testament: 'OT', chapters: 10, verses: 280 },
  { id: 'neh', name: 'Nehemiah', abbrev: 'Neh', testament: 'OT', chapters: 13, verses: 406 },
  { id: 'est', name: 'Esther', abbrev: 'Est', testament: 'OT', chapters: 10, verses: 167 },
  { id: 'job', name: 'Job', abbrev: 'Job', testament: 'OT', chapters: 42, verses: 1070 },
  { id: 'ps', name: 'Psalms', abbrev: 'Ps', testament: 'OT', chapters: 150, verses: 2461 },
  { id: 'pro', name: 'Proverbs', abbrev: 'Prov', testament: 'OT', chapters: 31, verses: 915 },
  { id: 'ecc', name: 'Ecclesiastes', abbrev: 'Eccl', testament: 'OT', chapters: 12, verses: 222 },
  { id: 'sos', name: 'Song of Solomon', abbrev: 'Song', testament: 'OT', chapters: 8, verses: 117 },
  { id: 'isa', name: 'Isaiah', abbrev: 'Isa', testament: 'OT', chapters: 66, verses: 1292 },
  { id: 'jer', name: 'Jeremiah', abbrev: 'Jer', testament: 'OT', chapters: 52, verses: 1364 },
  { id: 'lam', name: 'Lamentations', abbrev: 'Lam', testament: 'OT', chapters: 5, verses: 154 },
  { id: 'ezk', name: 'Ezekiel', abbrev: 'Ezek', testament: 'OT', chapters: 48, verses: 1273 },
  { id: 'dan', name: 'Daniel', abbrev: 'Dan', testament: 'OT', chapters: 12, verses: 357 },
  { id: 'hos', name: 'Hosea', abbrev: 'Hos', testament: 'OT', chapters: 14, verses: 197 },
  { id: 'joe', name: 'Joel', abbrev: 'Joel', testament: 'OT', chapters: 3, verses: 73 },
  { id: 'amo', name: 'Amos', abbrev: 'Amos', testament: 'OT', chapters: 9, verses: 146 },
  { id: 'oba', name: 'Obadiah', abbrev: 'Obad', testament: 'OT', chapters: 1, verses: 21 },
  { id: 'jon', name: 'Jonah', abbrev: 'Jon', testament: 'OT', chapters: 4, verses: 48 },
  { id: 'mic', name: 'Micah', abbrev: 'Mic', testament: 'OT', chapters: 7, verses: 105 },
  { id: 'nah', name: 'Nahum', abbrev: 'Nah', testament: 'OT', chapters: 3, verses: 47 },
  { id: 'hab', name: 'Habakkuk', abbrev: 'Hab', testament: 'OT', chapters: 3, verses: 56 },
  { id: 'zep', name: 'Zephaniah', abbrev: 'Zeph', testament: 'OT', chapters: 3, verses: 53 },
  { id: 'hag', name: 'Haggai', abbrev: 'Hag', testament: 'OT', chapters: 2, verses: 38 },
  { id: 'zec', name: 'Zechariah', abbrev: 'Zech', testament: 'OT', chapters: 14, verses: 211 },
  { id: 'mal', name: 'Malachi', abbrev: 'Mal', testament: 'OT', chapters: 4, verses: 55 },

  // New Testament
  { id: 'mat', name: 'Matthew', abbrev: 'Matt', testament: 'NT', chapters: 28, verses: 1071 },
  { id: 'mar', name: 'Mark', abbrev: 'Mark', testament: 'NT', chapters: 16, verses: 678 },
  { id: 'luk', name: 'Luke', abbrev: 'Luke', testament: 'NT', chapters: 24, verses: 1151 },
  { id: 'joh', name: 'John', abbrev: 'John', testament: 'NT', chapters: 21, verses: 879 },
  { id: 'act', name: 'Acts', abbrev: 'Acts', testament: 'NT', chapters: 28, verses: 1007 },
  { id: 'rom', name: 'Romans', abbrev: 'Rom', testament: 'NT', chapters: 16, verses: 433 },
  { id: '1co', name: '1 Corinthians', abbrev: '1Cor', testament: 'NT', chapters: 16, verses: 437 },
  { id: '2co', name: '2 Corinthians', abbrev: '2Cor', testament: 'NT', chapters: 13, verses: 257 },
  { id: 'gal', name: 'Galatians', abbrev: 'Gal', testament: 'NT', chapters: 6, verses: 149 },
  { id: 'eph', name: 'Ephesians', abbrev: 'Eph', testament: 'NT', chapters: 6, verses: 155 },
  { id: 'phi', name: 'Philippians', abbrev: 'Phil', testament: 'NT', chapters: 4, verses: 104 },
  { id: 'col', name: 'Colossians', abbrev: 'Col', testament: 'NT', chapters: 4, verses: 95 },
  { id: '1th', name: '1 Thessalonians', abbrev: '1Th', testament: 'NT', chapters: 5, verses: 89 },
  { id: '2th', name: '2 Thessalonians', abbrev: '2Th', testament: 'NT', chapters: 3, verses: 47 },
  { id: '1ti', name: '1 Timothy', abbrev: '1Tim', testament: 'NT', chapters: 6, verses: 113 },
  { id: '2ti', name: '2 Timothy', abbrev: '2Tim', testament: 'NT', chapters: 4, verses: 83 },
  { id: 'tit', name: 'Titus', abbrev: 'Titus', testament: 'NT', chapters: 3, verses: 46 },
  { id: 'phm', name: 'Philemon', abbrev: 'Phlm', testament: 'NT', chapters: 1, verses: 25 },
  { id: 'heb', name: 'Hebrews', abbrev: 'Heb', testament: 'NT', chapters: 13, verses: 303 },
  { id: 'jam', name: 'James', abbrev: 'Jas', testament: 'NT', chapters: 5, verses: 108 },
  { id: '1pe', name: '1 Peter', abbrev: '1Pet', testament: 'NT', chapters: 5, verses: 105 },
  { id: '2pe', name: '2 Peter', abbrev: '2Pet', testament: 'NT', chapters: 3, verses: 61 },
  { id: '1jo', name: '1 John', abbrev: '1John', testament: 'NT', chapters: 5, verses: 105 },
  { id: '2jo', name: '2 John', abbrev: '2John', testament: 'NT', chapters: 1, verses: 13 },
  { id: '3jo', name: '3 John', abbrev: '3John', testament: 'NT', chapters: 1, verses: 14 },
  { id: 'jud', name: 'Jude', abbrev: 'Jude', testament: 'NT', chapters: 1, verses: 25 },
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
    <View className="px-4 pt-8 pb-2 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100">
      <MotiText from={{ opacity: 0, translateY: -10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 500 }} className="text-2xl text-black font-semibold text-center">
        Biblia — Dashboard
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
    <MotiView from={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'timing', duration: 300 }}>
      <Pressable onPress={() => onPress(item)} className="m-2 flex-1 min-w-[140px] max-w-[220px] bg-black/5 rounded-2xl p-4">
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
          <View className="absolute inset-0 bg-black/30 justify-end">
            <Pressable style={{ flex: 1 }} onPress={closeDetail} />
            <MotiView from={{ translateY: 300 }} animate={{ translateY: 0 }} transition={{ type: 'spring', damping: 15 }} className="bg-white rounded-t-3xl p-6">
              <Text className="text-xl font-bold text-black">{selected.name} · {selected.abbrev}</Text>
              <Text className="mt-2 text-sm text-black">Testamento: {selected.testament}</Text>
              <Text className="mt-2 text-sm text-black">Capítulos: {selected.chapters}</Text>
              <Text className="mt-2 text-sm text-black">Versículos: {selected.verses}</Text>

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
