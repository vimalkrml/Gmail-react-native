import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useFilter from '../store/filter';

const FilterView = () => {
  const navigation = useNavigation();
  const { searchText, clearSearch, handleSearch } = useFilter()
  const [isfocus, setIsFocus] = React.useState(false)
  console.log(isfocus)

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchText}
        placeholder="Search for mails"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {isfocus ? (
        <Text>Hai</Text>
      ) : null}
      {searchText ? (
        <TouchableOpacity style={styles.clear} onPress={clearSearch}>
          <Ionicons name="close" size={24} color="grey" />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
  },
  clear: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
});

export default FilterView;
