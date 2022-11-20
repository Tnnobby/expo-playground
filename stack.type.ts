import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type StackParams = {
  home: {name: string},
  'reorderable-list': undefined,
  'gesture-handler-demo': undefined,
  'layout-transitions': undefined,
  'swipe-to-edit': undefined,
  'reorderable-swipeable-demo': undefined
}

export interface PageProps<R extends keyof StackParams> {
  navigation: NativeStackNavigationProp<StackParams, R>
}