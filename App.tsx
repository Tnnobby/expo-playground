import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from './pages';
import useFonts from './hooks/useFonts';
import { StackParams } from './stack.type';
import ReorderableList from './pages/reorderable-list';

const Stack = createNativeStackNavigator<StackParams>()

export default function App() {
  const isFontsLoaded = useFonts()

  if (isFontsLoaded) return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}} defaultScreenOptions={{headerShown: false}}>
        <Stack.Screen name='home' component={HomePage} />
        <Stack.Screen name='reorderable-list' component={ReorderableList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
