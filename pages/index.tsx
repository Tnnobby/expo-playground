import { FlatList, StyleSheet, SafeAreaView } from 'react-native'
import ListItem from '../components/list-item'
import { ProjectItem } from '../components/list-item.type'
import { PageProps } from '../stack.type'

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: 10
  }
})

const LIST_ITEMS: ProjectItem[] = [
  {
    label: "Reorderable List",
    route: "reorderable-list"
  }
]

export default function HomePage ({ navigation }: PageProps<'home'>) {
  
  return (
    <SafeAreaView style={{backgroundColor: 'beige', flex: 1}}>

      <FlatList
        style={styles.flatList}
        data={LIST_ITEMS}
        renderItem={({item}) => <ListItem label={item.label} onPress={item.route ? () => navigation.navigate('reorderable-list') : undefined}/>}
      />
    </SafeAreaView>
  )
}