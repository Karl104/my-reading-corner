import { useRef, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@react-native-vector-icons/ionicons';

type ProfileScreenProps = {
  readingCount: number;
  finishedCount: number;
};

export default function ProfileScreen({ readingCount, finishedCount }: ProfileScreenProps) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const pickerOpen = useRef(false);

  async function pickProfilePhoto() {
    if (pickerOpen.current) return;

    pickerOpen.current = true;
    setIsPicking(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Could not open photo', 'Please try choosing a photo again.');
    } finally {
      pickerOpen.current = false;
      setIsPicking(false);
    }
  }

  return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Pressable
            onPress={pickProfilePhoto}
            disabled={isPicking}
            accessibilityRole="button"
            accessibilityLabel={photoUri ? 'Change profile photo' : 'Add profile photo'}
            accessibilityHint="Choose a photo from your gallery"
            accessibilityState={{ disabled: isPicking, busy: isPicking }}
            style={({ pressed }) => [styles.photoButton, { opacity: pressed || isPicking ? 0.6 : 1 }]}
          >
            <View style={styles.avatar}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
              ) : (
                <Ionicons name="person-outline" size={64} color="#285943" />
              )}
            </View>
            <Text style={styles.photoAction}>{photoUri ? 'Change photo' : 'Add photo'}</Text>
          </Pressable>
          <Text style={styles.name}>Karl</Text>
          <Text style={styles.bio}>24/7 reader</Text>
          <View style={styles.readingStats}>
            <View style={styles.stat}>
              <Text style={styles.statCount}>{readingCount}</Text>
              <Text style={styles.statLabel}>Current reads</Text>
            </View>
            <View style={[styles.stat, styles.finishedStat]}>
              <Text style={styles.statCount}>{finishedCount}</Text>
              <Text style={styles.statLabel}>Finished reads</Text>
            </View>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F3EC' },
  content: { padding: 16 },
  profileCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, alignItems: 'center' },
  photoButton: { alignItems: 'center', padding: 8 },
  avatar: {
    width: 128, height: 128, borderRadius: 64, overflow: 'hidden',
    backgroundColor: '#EEEAE2', alignItems: 'center', justifyContent: 'center',
  },
  photo: { width: '100%', height: '100%' },
  photoAction: { color: '#285943', fontSize: 16, fontWeight: '600', marginTop: 12 },
  name: { fontSize: 28, fontWeight: '700', marginTop: 8 },
  readingStats: { flexDirection: 'row', width: '100%', paddingVertical: 20, marginTop: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#EEEAE2' },
  stat: { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  finishedStat: { borderLeftWidth: 1, borderColor: '#EEEAE2' },
  statCount: { fontSize: 26, fontWeight: '700', color: '#285943' },
  statLabel: { fontSize: 14, color: '#555555', marginTop: 4, textAlign: 'center' },
  bio: { fontSize: 16, fontStyle: 'italic', color: '#555555', marginTop: 8 },
});
