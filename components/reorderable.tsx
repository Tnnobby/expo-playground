import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import ReorderableItem from "./reorderable-item";
import StatefulPressable from "./stateful-pressable";

type ReordererRender<Item> = (info: {
  item: Readonly<Item>;
}) => React.ReactNode;

interface ReorderableProps<Item> extends SafeAreaViewProps {
  data: Item[];
  renderItems: ReordererRender<Item>;
}

export default function Reorderable<T>({
  style,
  data,
  renderItems,
}: ReorderableProps<T>) {
  const [listItems, setListItems] = useState<T[]>(data);

  return (
    <SafeAreaView style={style}>
      {data.map((value, index) => (
        <ReorderableItem
          key={
            value.hasOwnProperty("key")
              ? value["key"]
              : `reorderable_item_${index}`
          }
        >
          {renderItems({ item: value })}
        </ReorderableItem>
      ))}
    </SafeAreaView>
  );
}
