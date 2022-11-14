import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  SharedValue,
  StyleProps,
  TransformStyleTypes,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  AnimatedPropData,
  AnimatedPropExtractor,
  AnimatedPropVerifier,
} from "./stateful-pressable.type";

interface StatefulPressableProps extends PressableProps {
  onPress?: () => void;
  animateStyles?: boolean;
  style?: StyleProps;
  activeStyle?: StyleProps;
  trigger?: "press" | "longpress";
  triggerFunction?: () => boolean;
}

const checkProps: AnimatedPropVerifier = (style, animatedStyle) => {
  if (!animatedStyle) return false;
  return Object.keys(animatedStyle).every((key) => style.hasOwnProperty(key));
};

const getAnimatedProps: AnimatedPropExtractor = (style, animatedStyle) => {
  if (!checkProps(style, animatedStyle)) return {};
  const _style: AnimatedPropData = {};

  for (const s in animatedStyle) {
    if (s === "transform") {
      const transformList: TransformStyleTypes[] = animatedStyle[s];
      for (let i = 0; i < transformList.length; i++) {
        const _transformType = Object.keys(transformList[i])[0];

        _style[`transform_${_transformType}`] = {
          initial: style[s][i][_transformType],
          active: animatedStyle[s][i][_transformType],
        };
      }
    } else {
      _style[s] = { initial: style[s], active: animatedStyle[s] };
    }
  }

  return _style;
};

export default function StatefulPressable({
  onPress,
  animateStyles = true,
  trigger = "press",
  triggerFunction,
  style,
  activeStyle,
  onLayout,
  children,
  onPressIn,
  onPressOut,
  onLongPress,
  ...props
}: StatefulPressableProps) {
  const animatedData = animateStyles
    ? getAnimatedProps(style, activeStyle)
    : undefined;
  const sharedValues: { [key: string]: SharedValue<any> } = {};
  for (const prop in animatedData) {
    sharedValues[prop] = useSharedValue(animatedData[prop].initial);
  }
  const [pressing, setPressing] = useState<boolean>(false);

  const _animatedStyles = animateStyles
    ? useAnimatedStyle(() => {
        let _return = {};
        for (const key in sharedValues) {
          if (key.startsWith("transform_")) {
            _return["transform"] = _return["transform"]
              ? [
                  ..._return["transform"],
                  {
                    [key.split("_")[1]]: sharedValues[key].value,
                  },
                ]
              : [{ [key.split("_")[1]]: sharedValues[key].value }];
          } else {
            _return[key] = sharedValues[key].value;
          }
        }
        return _return;
      })
    : undefined;

  useEffect(() => {
    if (pressing) {
      // Animate to active state
      for (const key in sharedValues) {
        sharedValues[key].value = withSpring(animatedData[key].active);
      }
    } else {
      // Animate back to inactive state
      for (const key in sharedValues) {
        sharedValues[key].value = withSpring(animatedData[key].initial);
      }
    }
  }, [pressing]);

  const pressInHandle = (ev) => {
    onPressIn && onPressIn(ev);
    trigger === "press" && setPressing(true);
  };
  const longPressHandle = (ev) => {
    onLongPress && onLongPress(ev);
    trigger === "longpress" && setPressing(true);
  };

  const pressOutHandle = (ev) => {
    onPressOut && onPressOut(ev);
    setPressing(false);
  };

  return (
    <Animated.View onLayout={onLayout} style={_animatedStyles}>
      <Pressable
        style={style}
        onPressIn={pressInHandle}
        onPressOut={pressOutHandle}
        onLongPress={longPressHandle}
        onPress={onPress}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
