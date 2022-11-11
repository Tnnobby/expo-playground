import StatefulPressable from "./stateful-pressable";
import { LayoutRectangle, StyleSheet } from "react-native";
import { useState } from "react";
import Animated from "react-native-reanimated";

export default function ReorderableItem({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [layout, setLayout] = useState<LayoutRectangle>(null);

  return (
    <Animated.View
      style={styles.container}
    >
      <StatefulPressable
        style={styles.itemContainer}
        activeStyle={styles.itemContainerActive}
        animateStyles={true}
        trigger="longpress"
        delayLongPress={600}
        onLayout={(ev) => {
          setLayout(ev.nativeEvent.layout);
        }}
      >
        {children}
      </StatefulPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    elevation: 0,
    transform: [{ scale: 1 }],
  },
  itemContainerActive: {
    elevation: 3,
    transform: [{ scale: 1.03 }],
  },
});
