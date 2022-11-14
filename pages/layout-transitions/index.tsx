import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Animated, {
  Layout,
  SlideInDown,
  SlideInUp,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";

const ITEM_LIST = ["1", "2", "3", "4", "5"];

export default function LayoutTransitionsPage() {
  const [items, setItems] = useState<string[]>(ITEM_LIST);

  const WrappedItem = Wrapped(Item)

  const addHandle = () => {
    setItems([...items, (parseInt(items[items.length - 1]) + 1).toString()]);
  };

  const removeHandle = () => {
    // const index = Math.floor(Math.random() * items.length)
    setItems(items.filter((_, i) => i !== 0));
  };
  const moveUp = (val: string) => {
    const i = items.findIndex((value) => value === val);
    var el = items[i];
    const _temp = items;
    _temp.splice(i, 1);
    _temp.splice(i - 1, 0, el);
    setItems([..._temp]);
  };
  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        {items.map((val) => (
          <Item key={val} val={val} onPress={moveUp}/>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.remove} onPress={removeHandle} />
        <Pressable style={styles.add} onPress={addHandle} />
      </View>
    </View>
  );
}

const Item = ({ val, onPress }) => {

  const pressHandle = () => onPress(val)

  return (
    <Animated.View
      layout={Layout.springify()}
      entering={SlideInDown.springify()}
      exiting={SlideOutLeft.springify()}
      
    >
      <Pressable onPress={pressHandle} style={styles.item}>
        <Text>{val}</Text>
      </Pressable>
    </Animated.View>
  );
};

const Wrapped = (WComponent: React.ElementType) => {
  return (props) => {
    return <WComponent {...props} />;
  };
};

const styles = StyleSheet.create({
  list: {
    width: "90%",
    flex: 1,
  },
  item: {
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  add: {
    backgroundColor: "green",
    height: 50,
    width: 75,
    borderRadius: 30,

  },
  remove: {
    backgroundColor: "red",
    height: 50,
    width: 75,
    borderRadius: 30,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
