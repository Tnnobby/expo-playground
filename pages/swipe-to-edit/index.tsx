import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import StatefulPressable from "../../components/stateful-pressable";
import SwipeableItem from "../../components/swipeable-item";
import { PageProps } from "../../stack.type";

export default function SwipeToEditDemoPage({
  navigation,
}: PageProps<"swipe-to-edit">) {
  const [items, setItems] = useState([0]);

  const deleteHandle = (i: number) => {
    console.log(i);
    setItems(items.filter((val, index) => index !== i));
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        {items.map((val, index) => {
          return <IngredientItem key={index} id={index} onDelete={deleteHandle} />;
        })}
      </ScrollView>
      <View
        style={{
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
          elevation: 1
        }}
      >
        <StatefulPressable
          style={{
            backgroundColor: "lightgreen",
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 20,
            elevation: 3,
            transform: [{scale: 1}]
          }}
          activeStyle={{ transform: [{scale: 1.05}] }}
          onPress={() => setItems([...items, items.length])}
        >
          <Text>Add Item</Text>
        </StatefulPressable>
      </View>
    </SafeAreaView>
  );
}

const IngredientItem = ({ onDelete, id }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<TextInput>();

  const editHandle = () => inputRef && inputRef.current.focus()
  const blurHandle = () => setEditing(false);
  const focusHandle = () => setEditing(true)

  return (
    <SwipeableItem
      leftElement={<DeleteButton onPress={() => onDelete(id)} />}
      closed={editing}
    >
      <Pressable style={styles.item} onPress={editHandle}>
        <TextInput
          maxLength={40}
          style={styles.text}
          defaultValue="Swipe to Interact"
          ref={inputRef}
          onBlur={blurHandle}
          onFocus={focusHandle}
        />
      </Pressable>
    </SwipeableItem>
  );
};

const DeleteButton = (props) => (
  <Pressable
    style={{
      paddingHorizontal: 20,
      maxWidth: 80,
      backgroundColor: "red",
      height: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
    }}
    {...props}
  >
    <Text style={{ color: "white" }}>Delete</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {},
  item: {
    backgroundColor: "lightblue",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    width: "100%",
  },
  text: {
    fontSize: 18,
    fontFamily: "MonaSans_400",
  },
  main: {
    flex: 1,
    flexDirection: "column",
  },
});
