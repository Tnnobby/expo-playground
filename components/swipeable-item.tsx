import { cloneElement, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, LayoutRectangle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface SwipeableItemProps {
  leftElement?: JSX.Element;
  children?: JSX.Element;
  closed?: boolean;
}

export default function SwipeableItem({
  leftElement,
  children,
  closed,
}: SwipeableItemProps) {
  const [layout, setLayout] = useState<LayoutRectangle>(null);
  const leftButtonLayout = useSharedValue<LayoutRectangle>(null);
  const xOffset = useSharedValue<number>(0);
  const offset = useSharedValue(0);

  const swipeGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate((ev) => {
          if (closed) return;
          let amnt = Boolean(leftButtonLayout.value)
            ? Math.min(
                ev.translationX + xOffset.value,
                leftButtonLayout.value.width - leftButtonLayout.value.x
              )
            : ev.translationX;
          offset.value = amnt;
        })
        .onEnd((ev) => {
          if (
            Boolean(leftButtonLayout.value) &&
            ev.translationX >= leftButtonLayout.value.width
          ) {
            xOffset.value = leftButtonLayout.value.width;
            return;
          }
          offset.value = withSpring(0, { mass: 0.5 });
          xOffset.value = 0;
        }),
    [closed]
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  useEffect(() => {
    console.log(closed);
    console.log(xOffset.value);
    if (closed && xOffset.value !== 0) {
      offset.value = withSpring(0, { mass: 0.5 });
      xOffset.value = 0;
    }
  }, [closed]);

  const layoutHandle = (ev) => {
    setLayout(ev.nativeEvent.layout);
  };
  const leftLayoutHandle = (ev) => {
    leftButtonLayout.value = ev.nativeEvent.layout;
  };

  return (
    <Animated.View entering={SlideInLeft} exiting={SlideInRight}>
      {layout && (
        <Animated.View
          style={
            layout && {
              position: "absolute",
              height: layout.height,
              width: layout.width,
            }
          }
          pointerEvents="auto"
        >
          {leftElement &&
            cloneElement(leftElement, { onLayout: leftLayoutHandle })}
        </Animated.View>
      )}
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={animatedStyles}>
          {cloneElement(children, { onLayout: layoutHandle })}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
