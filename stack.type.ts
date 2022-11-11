import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type StackParams = {
  home: {name: string},
  'reorderable-list': undefined
}

export interface PageProps<R extends keyof StackParams> {
  navigation: NativeStackNavigationProp<StackParams, R>
}