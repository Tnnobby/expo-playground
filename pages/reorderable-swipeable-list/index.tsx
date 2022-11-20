import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Reorderable from "../../components/ReorderableList";
import { PageProps } from "../../stack.type";

interface ReorderableSwipeableDemoPageProps
  extends PageProps<"reorderable-swipeable-demo"> {}


  
export default function ReorderableSwipeableDemoPage({
  navigation,
}: ReorderableSwipeableDemoPageProps) {
  const [items, setItems] = useState([])


  return <View style={styles.main}>
    <Reorderable
      data={}
      renderItems={}
    >

    </Reorderable>
  </View>;
}

const styles = StyleSheet.create({
  main: {},
});
