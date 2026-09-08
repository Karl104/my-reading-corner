import type { ImageSourcePropType } from 'react-native';

export type Book = {
  id: string;
  title: string;
  author: string;
  kind: 'Book' | 'Manga';
  category?: 'Philosophy';
  cover: ImageSourcePropType;
};
