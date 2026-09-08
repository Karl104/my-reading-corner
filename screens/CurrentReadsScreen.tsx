import { ScrollView, Text, StyleSheet } from 'react-native';
import { books } from '../data/books';
import ReadingRow from '../components/ReadingRow';
import type { ReadingStatus } from '../state/reading';

type CurrentReadsScreenProps = {
  readingIds: string[];
  onStatusChange: (bookId: string, status: ReadingStatus) => void;
};

export default function CurrentReadsScreen({
  readingIds,
  onStatusChange,
}: CurrentReadsScreenProps) {
  const visibleBooks = books.filter((book) => readingIds.includes(book.id));

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={styles.heading}>Karl is currently reading</Text>
      {visibleBooks.length === 0 ? (
        <Text style={styles.empty}>
          No current reads. Start a book from Browse.
        </Text>
      ) : (
        visibleBooks.map((book) => (
          <ReadingRow key={book.id} book={book} status="reading" onStatusChange={onStatusChange} />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F3EC' },
  heading: { fontSize: 14, fontWeight: '700', color: '#333333', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#DDD9D1' },
  empty: { fontSize: 16, lineHeight: 24, color: '#555555', paddingVertical: 20 },
});
