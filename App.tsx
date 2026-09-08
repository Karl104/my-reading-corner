import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReducer } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';

import BrowseScreen from './screens/BrowseScreen';
import CurrentReadsScreen from './screens/CurrentReadsScreen';
import ProfileScreen from './screens/ProfileScreen';
import type { RootTabParamList } from './types/navigation';
import { getReadingIds, readingReducer } from './state/reading';
import type { ReadingStatus } from './state/reading';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons = {
  Browse: 'library-outline',
  'Current Reads': 'book-outline',
  Profile: 'person-outline',
} as const;

export default function App() {
  const [library, dispatch] = useReducer(readingReducer, {});
  const readingIds = getReadingIds(library, 'reading');
  const finishedIds = getReadingIds(library, 'finished');

  function startReading(bookId: string): void {
    dispatch({ type: 'start', bookId });
  }

  function changeReadingStatus(bookId: string, status: ReadingStatus): void {
    dispatch({ type: 'set-status', bookId, status });
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#285943',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tabIcons[route.name]} color={color} size={size} />
            ),
          })}
        >
          <Tab.Screen name="Browse">
            {(screenProps) => (
              <BrowseScreen
                {...screenProps}
                readingIds={readingIds}
                onStartReading={startReading}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Current Reads">
            {() => (
              <CurrentReadsScreen
                readingIds={readingIds}
                onStatusChange={changeReadingStatus}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Profile">
            {() => (
              <ProfileScreen readingCount={readingIds.length} finishedCount={finishedIds.length} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
