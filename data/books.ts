import type { Book } from '../types/book';
import type { ImageSourcePropType } from 'react-native';

export const books: Book[] = [
  {
    id: 'book-1',
    title: 'The Climber Volume 5',
    author: 'Shin-ichi Sakamoto',
    kind: 'Manga',
    cover: require('../assets/covers/the-climber-vol-5.jpg'),
  },

  {
    id: 'book-2',
    title: 'The Climber Volume 6',
    author: 'Shin-ichi Sakamoto',
    kind: 'Manga',
    cover: require('../assets/covers/the-climber-vol-6.jpg'),
  },

  {
    id: 'book-3',
    title: 'Stoner',
    author: 'John Williams',
    kind: 'Book',
    cover: require('../assets/covers/Stoner.jpg'),
  },

   {
    id: 'book-4',
    title: 'Martyr!',
    author: 'Kaveh Akbar',
    kind: 'Book',
    cover: require('../assets/covers/martyr.jpg'),
  },

  {
    id: 'book-5',
    title: 'Morning Star',
    author: 'Pierce Brown',
    kind: 'Book',
    cover: require('../assets/covers/Morning-Start.jpg'),
  },

  {
    id: 'book-6',
    title: 'Real Volume 2',
    author: 'Takehito Inoue',
    kind: 'Manga',
    cover: require('../assets/covers/Real2.jpg'),
  },

  {
    id: 'book-7',
    title: 'Nausea',
    author: 'Jean Paul Sartre',
    kind: 'Book',
    category: 'Philosophy',
    cover: require('../assets/covers/nausea.jpg'),
  },

  {
    id: 'book-8',
    title: 'The Myth Of Sisyphus',
    author: 'Albert Camus',
    kind: 'Book',
    category: 'Philosophy',
    cover: require('../assets/covers/sisyphus.jpg'),
  },

];
