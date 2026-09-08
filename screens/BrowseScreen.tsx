import { ScrollView, Text } from 'react-native';
import { books } from '../data/books';
import ScreenTitle from '../components/ScreenTitle';
import BookCard from '../components/BookCard';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../types/navigation';

type BrowseScreenProps = BottomTabScreenProps<RootTabParamList, 'Browse'> & {
  readingIds: string[];
  onStartReading: (bookId: string) => void;
};

export default function BrowseScreen({
  navigation,
  readingIds,
  onStartReading,
}: BrowseScreenProps) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F7F3EC' }} contentContainerStyle={{ padding: 16 }}>
      <ScreenTitle title="Your Next Read?" subtitle="Books/Manga" />
      <ScrollView horizontal style={{ flexGrow: 0 }} showsHorizontalScrollIndicator={false}>
        {books.filter((book) => book.category !== 'Philosophy').map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isReading={readingIds.includes(book.id)}
            onStart={() => {
              onStartReading(book.id);
              navigation.navigate('Current Reads');
            }}
          />
        ))}
      </ScrollView>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 16, marginBottom: 12 }}>
        Philosophy
      </Text>
      <ScrollView horizontal style={{ flexGrow: 0 }} showsHorizontalScrollIndicator={false}>
        {books.filter((book) => book.category === 'Philosophy').map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isReading={readingIds.includes(book.id)}
            onStart={() => {
              onStartReading(book.id);
              navigation.navigate('Current Reads');
            }}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
