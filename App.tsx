import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages";
import useFonts from "./hooks/useFonts";
import { StackParams } from "./stack.type";
import ReorderableList from "./pages/reorderable-list";
import GestureHandlingPage from "./pages/gesture-handling";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LayoutTransitionsPage from "./pages/layout-transitions";

const Stack = createNativeStackNavigator<StackParams>();

export default function App() {
  const isFontsLoaded = useFonts();

  if (isFontsLoaded)
    return (
      <GestureHandlerRootView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ animation: "fade_from_bottom", headerShown: false}}>
            <Stack.Screen name="home" component={HomePage} />
            <Stack.Screen name="reorderable-list" component={ReorderableList} />
            <Stack.Screen
              name="gesture-handler-demo"
              component={GestureHandlingPage}
            />
            <Stack.Screen name='layout-transitions' component={LayoutTransitionsPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
}
