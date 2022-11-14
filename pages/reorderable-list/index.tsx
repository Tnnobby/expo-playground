import { View, StyleSheet, Text } from 'react-native'
import Reorderable from '../../components/ReorderableList'
import { PageProps } from '../../stack.type'

const ITEMS = [
  {key: 'item_1', label: '1'},
  {key: 'item_2', label: '2'},
  {key: 'item_3', label: '3'},
  {key: 'item_4', label: '4'},
  {key: 'item_5', label: '5'},
]

export default function ReorderableList ({ navigation }: PageProps<'reorderable-list'>) {
  
  return (
    <View>
      <Reorderable
        data={ITEMS}
        style={styles.reorderable}
        renderItems={(data) => <View style={styles.item}><Text>{data.item.label}</Text></View>}
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
    marginTop: 10,
    backgroundColor: 'white'
  },
  reorderable: {
    marginHorizontal: 10
  }
})