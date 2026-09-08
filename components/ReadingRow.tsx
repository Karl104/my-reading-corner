import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import type { Book } from '../types/book';
import type { ReadingStatus } from '../state/reading';

type ReadingRowProps = {
  book: Book;
  status: ReadingStatus;
  onStatusChange: (bookId: string, status: ReadingStatus) => void;
};

export default function ReadingRow({ book, status, onStatusChange }: ReadingRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isFinished = status === 'finished';

  function chooseStatus(nextStatus: ReadingStatus) {
    setMenuOpen(false);
    onStatusChange(book.id, nextStatus);
  }

  return (
    <View style={styles.row}>
      <Image source={book.cover} style={styles.cover} resizeMode="contain" accessibilityLabel={`${book.title} cover`} />
      <View style={styles.details}>
        <Text style={styles.activity}>{isFinished ? 'Karl finished reading' : 'Karl is currently reading'}</Text>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Pressable
          onPress={() => setMenuOpen((open) => !open)}
          accessibilityRole="button"
          accessibilityLabel={`${book.title}: ${isFinished ? 'Finished' : 'Currently reading'}. Change reading status`}
          accessibilityState={{ expanded: menuOpen }}
          style={({ pressed }) => [styles.statusButton, pressed && styles.pressed]}
        >
          <Ionicons name={isFinished ? 'checkmark-circle' : 'book-outline'} size={18} color="#285943" />
          <Text style={styles.statusText}>{isFinished ? 'Finished' : 'Currently reading'}</Text>
          <View style={styles.arrow}>
            <Ionicons name={menuOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#FFFFFF" />
          </View>
        </Pressable>
        {menuOpen && (
          <View style={styles.menu}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Mark ${book.title} as finished`}
              accessibilityState={{ selected: isFinished }}
              onPress={() => chooseStatus('finished')}
              style={({ pressed }) => [styles.option, pressed && styles.pressed]}
            >
              <Text style={styles.optionText}>Finished</Text>
              {isFinished && <Ionicons name="checkmark" size={18} color="#285943" />}
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Mark ${book.title} as not finished and keep reading`}
              accessibilityState={{ selected: !isFinished }}
              onPress={() => chooseStatus('reading')}
              style={({ pressed }) => [styles.option, pressed && styles.pressed]}
            >
              <Text style={styles.optionText}>Not finished</Text>
              {!isFinished && <Ionicons name="checkmark" size={18} color="#285943" />}
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#DDD9D1' },
  cover: { width: 72, height: 108, backgroundColor: '#EEEAE2', marginRight: 14 },
  details: { flex: 1, minWidth: 0 },
  activity: { color: '#285943', fontSize: 13, lineHeight: 19, marginBottom: 4 },
  title: { fontSize: 17, fontWeight: '700', lineHeight: 23, color: '#222222' },
  author: { fontSize: 14, lineHeight: 21, color: '#555555', marginTop: 3 },
  statusButton: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', maxWidth: '100%',
    minHeight: 44, paddingLeft: 10, marginTop: 12, borderWidth: 1, borderColor: '#C9D5CC',
    borderRadius: 6, overflow: 'hidden', backgroundColor: '#F3F6F2',
  },
  statusText: { flexShrink: 1, color: '#285943', fontWeight: '600', fontSize: 13, marginHorizontal: 7, paddingVertical: 8 },
  arrow: { alignSelf: 'stretch', width: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#285943' },
  pressed: { opacity: 0.65 },
  menu: { marginTop: 6, borderWidth: 1, borderColor: '#C9D5CC', borderRadius: 6, backgroundColor: '#FFFFFF' },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44, padding: 12 },
  optionText: { fontSize: 14, color: '#285943', flexShrink: 1 },
});
