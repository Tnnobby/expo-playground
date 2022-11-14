import {
  ReorderableElement,
  ReorderableManager,
} from "../hooks/useReorderableManager";
import { LayoutRectangle } from "react-native";
import Animated from "react-native-reanimated";

interface WrappedReorderableManager {
  setLayout: (layout: LayoutRectangle) => void;
  getLayout: () => LayoutRectangle;
  setMoving: () => void;
  checkOverlap: (verticalOffset: number) => string;
}

export type WrappedManager = ReorderableManager & WrappedReorderableManager;

export default function withReorderManager(
  WrappedComponent: React.ElementType,
  manager: ReorderableManager
) {
  return (props) => {
    const { id } = props;

    const setLayout = (layout: LayoutRectangle) => {
      manager.setLayout(id, layout);
    };
    const getLayout = () => manager.getLayout(id);
    const checkOverlap = (verticalOffset: number) => {
      manager.checkOverlap(id, verticalOffset);
    };
    const setMoving = () => manager.setMoving();

    return (
      <Animated.View>
        <WrappedComponent
          manager={{
            ...manager,
            setMoving,
            setLayout,
            getLayout,
            checkOverlap,
          }}
          {...props}
        />
      </Animated.View>
    );
  };
}
