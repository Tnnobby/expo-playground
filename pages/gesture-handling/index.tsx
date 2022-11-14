import { useMemo, useState } from "react";
import { View, SafeAreaView, StyleSheet, Pressable, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import StatefulPressable from "../../components/stateful-pressable";
import { PageProps } from "../../stack.type";

type AnimateModes = "spring" | "timing" | "instant";

export default function GestureHandlingPage({
  navigation,
}: PageProps<"gesture-handler-demo">) {
  const offset = useSharedValue({ x: 0, y: 0 });
  const color = useSharedValue("#87CEEB"); // to: #0000FF
  const [mode, setMode] = useState<AnimateModes>("spring");
  const handler = useMemo(
    () =>
      Gesture.Pan()
        .onBegin((ev) => {
          color.value = withTiming("#0000FF", { duration: 300 });
        })
        .onChange((ev) => {
          offset.value = {
            x: ev.translationX,
            y: ev.translationY,
          };
        })
        .onEnd((ev) => {
          color.value = withTiming("#87CEEB", { duration: 300 });
          offset.value = {
            x: 0,
            y: 0,
          };
        }),
    [color, offset]
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      transform: [
        {
          translateX:
            mode === "spring"
              ? withSpring(offset.value.x)
              : withTiming(offset.value.x, { duration: 150 }),
        },
        {
          translateY:
            mode === "spring"
              ? withSpring(offset.value.y)
              : withTiming(offset.value.y, { duration: 150 }),
        },
      ],
      backgroundColor: color.value,
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={handler}>
        <Animated.View style={[styles.base, animatedProps]}></Animated.View>
      </GestureDetector>
      <View style={styles.buttonList}>
        <Pressable style={styles.button} onPress={() => setMode('spring')}>
          <Text>Spring</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setMode('timing')}>
          <Text>Timing</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  base: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "skyblue",
  },
  buttonList: {
    position: "absolute",
    bottom: 20,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 5,
    backgroundColor: "lightblue",
    borderRadius: 8,
  },
});
