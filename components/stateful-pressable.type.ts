import { StyleProps } from "react-native-reanimated";

export type AnimatedPropVerifier = (
  style: StyleProps,
  animatedStyle: StyleProps
) => boolean;

export type AnimatedPropData = { [key: string]: { initial: any; active: any } };

export type AnimatedPropExtractor = (
  style: StyleProps,
  animatedStyle: StyleProps
) => AnimatedPropData;