import React from "react";
import { StyleSheet, Text } from "react-native";
import { ProjectItem } from "./list-item.type";
import StatefulPressable from "./stateful-pressable";

const styles = StyleSheet.create({
  main: {
    // width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "MonaSans_400",
    fontSize: 16,
  },
  caret: {
    fontFamily: "MonaSans_400",
    fontSize: 20,
  },
});

interface ListItemProps {
  label: string;
  onPress?: () => void;
}

export default function ListItem({ label, onPress }: ListItemProps) {
  return (
    <StatefulPressable
      style={styles.main}
      // onLayout={(ev) => console.log(ev.nativeEvent.layout)}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.caret}>{">"}</Text>
    </StatefulPressable>
  );
}
