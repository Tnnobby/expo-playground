import { SafeAreaView} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import useReorderableManager from "./useReorderableManager";
import ReorderableItem from "./reorderable-item";

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
  const manager = useReorderableManager(data);


  return (
    <SafeAreaView style={style}>
      <Animated.View>
        {manager.elements && manager.elements.map(({id, val}, index) => {
          return (
            <ReorderableItem
              key={id}
              id={id}
              manager={manager}
            >
              {renderItems({ item: val })}
            </ReorderableItem>
          );
        })}
      </Animated.View>
      
    </SafeAreaView>
  );
}
