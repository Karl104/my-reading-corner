import assert from 'node:assert/strict';
import test from 'node:test';
import { getReadingIds, readingReducer } from '../state/reading.ts';

test('starting the same book repeatedly adds it once and preserves other reads', () => {
  let library = readingReducer({}, { type: 'start', bookId: 'book-1' });
  library = readingReducer(library, { type: 'start', bookId: 'manga-1' });
  library = readingReducer(library, { type: 'start', bookId: 'book-1' });
  assert.deepEqual(getReadingIds(library, 'reading'), ['book-1', 'manga-1']);
  assert.deepEqual(getReadingIds(library, 'finished'), []);
});

test('finishing a book moves it between shelves without changing the other books', () => {
  const previous = { 'book-1': 'reading', 'manga-1': 'reading' };
  const library = readingReducer(previous, { type: 'set-status', bookId: 'book-1', status: 'finished' });
  assert.deepEqual(getReadingIds(library, 'reading'), ['manga-1']);
  assert.deepEqual(getReadingIds(library, 'finished'), ['book-1']);
  assert.equal(previous['book-1'], 'reading');
});

test('not finished restores a finished book to current reads', () => {
  const library = readingReducer({ 'book-1': 'finished' }, {
    type: 'set-status', bookId: 'book-1', status: 'reading',
  });
  assert.deepEqual(getReadingIds(library, 'reading'), ['book-1']);
  assert.deepEqual(getReadingIds(library, 'finished'), []);
});

test('a finished book can be started again from Browse without duplicates', () => {
  let library = readingReducer({}, { type: 'start', bookId: 'book-1' });
  library = readingReducer(library, { type: 'set-status', bookId: 'book-1', status: 'finished' });
  assert.deepEqual(getReadingIds(library, 'reading'), []);
  library = readingReducer(library, { type: 'start', bookId: 'book-1' });
  library = readingReducer(library, { type: 'start', bookId: 'book-1' });
  assert.deepEqual(getReadingIds(library, 'reading'), ['book-1']);
  assert.deepEqual(getReadingIds(library, 'finished'), []);
});

test('changing status for an unselected book does not create a phantom read', () => {
  assert.deepEqual(readingReducer({}, {
    type: 'set-status', bookId: 'missing-book', status: 'finished',
  }), {});
});
