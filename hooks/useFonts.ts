import * as Font from "expo-font";
import { useState } from "react";

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      MonaSans_400: require("../assets/fonts/mona-sans/Mona-Sans-Regular.ttf"),
    });
    setFontsLoaded(true);
  };
  loadFonts();

  return fontsLoaded;
}
