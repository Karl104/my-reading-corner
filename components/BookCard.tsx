import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { Book } from '../types/book';

type BookCardProps = {
  book: Book;
  onStart?: () => void;
  isReading?: boolean;
};

export default function BookCard({ book, onStart, isReading = false }: BookCardProps) {
  return (
    <View style={styles.card}>
      <Image source={book.cover} style={styles.cover} resizeMode="contain" />
      <Text style={styles.title}>{book.title}</Text>
      {isReading ? (
        <Text style={{ color: '#285943', marginTop: 12, fontWeight: '700' }}>
          Currently reading
        </Text>
      ) : (
        <Pressable style={styles.button} onPress={onStart} accessibilityRole="button">
          <Text style={styles.buttonText}>Start reading</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: 170, padding: 12, marginRight: 12, backgroundColor: '#FFFFFF', borderRadius: 12 },
  cover: { width: '100%', height: 190, backgroundColor: '#EEEAE2' },
  title: { fontSize: 16, fontWeight: '700', marginTop: 10, marginBottom: 6 },
  button: { backgroundColor: '#285957', padding: 12, borderRadius: 8, marginTop: 12 },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '700' },
});
