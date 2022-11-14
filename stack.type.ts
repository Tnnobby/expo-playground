import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type StackParams = {
  home: {name: string},
  'reorderable-list': undefined,
  'gesture-handler-demo': undefined,
  'layout-transitions': undefined
}

export interface PageProps<R extends keyof StackParams> {
  navigation: NativeStackNavigationProp<StackParams, R>
}