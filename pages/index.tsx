import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import ListItem from "../components/list-item";
import { ProjectItem } from "../components/list-item.type";
import { PageProps, StackParams } from "../stack.type";

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: 10,
  },
});

interface HomeProjectItem extends ProjectItem {
  route: keyof StackParams;
}

const LIST_ITEMS: HomeProjectItem[] = [
  {
    label: "Reorderable List",
    route: "reorderable-list",
  },
  {
    label: "Gesture Demo",
    route: "gesture-handler-demo",
  },
  {
    label: 'Layout Demo',
    route: 'layout-transitions'
  }
];

export default function HomePage({ navigation }: PageProps<"home">) {
  return (
    <SafeAreaView style={{ backgroundColor: "beige", flex: 1 }}>
      <FlatList
        style={styles.flatList}
        data={LIST_ITEMS}
        renderItem={({ item }) => (
          <ListItem
            label={item.label}
            onPress={
              item.route ? () => navigation.navigate(item.route) : undefined
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
