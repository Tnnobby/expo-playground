import { View, StyleSheet, Text } from 'react-native'
import Reorderable from '../../components/reorderable'
import { PageProps } from '../../stack.type'

const ITEMS = [
  '1',
  '2',
  '3',
  '4',
  '5',
]

export default function ReorderableList ({ navigation }: PageProps<'reorderable-list'>) {

  
  return (
    <View>
      <Reorderable
        data={ITEMS}
        style={styles.reorderable}
        renderItems={(data) => <View style={styles.item}><Text>{data.item}</Text></View>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 10
  },
  reorderable: {
    marginHorizontal: 10
  }
})