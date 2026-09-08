export type ReadingStatus = 'reading' | 'finished';
export type ReadingLibrary = Partial<Record<string, ReadingStatus>>;

type ReadingAction =
  | { type: 'start'; bookId: string }
  | { type: 'set-status'; bookId: string; status: ReadingStatus };

export function readingReducer(library: ReadingLibrary, action: ReadingAction): ReadingLibrary {
  if (action.type === 'start') {
    if (library[action.bookId] === 'reading') return library;
    return { ...library, [action.bookId]: 'reading' };
  }

  if (!library[action.bookId] || library[action.bookId] === action.status) return library;
  return { ...library, [action.bookId]: action.status };
}

export function getReadingIds(library: ReadingLibrary, status: ReadingStatus): string[] {
  return Object.keys(library).filter((bookId) => library[bookId] === status);
}
