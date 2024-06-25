import React from 'react';
import { useEffect } from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { List, Avatar, Caption, FAB } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useStore from '../store/store';

const SendMail = () => {
  const navigation = useNavigation();
  const { searchText, starredMail, clearSearch, handleSearch, mails, updateFlag } = useStore()

  const sortedList = [...mails].sort((a ,b) => new Date(b.time) - new Date(a.time)).filter(item => item.send)
  const filteredList = searchText
    ? sortedList.filter((mail) => {
        return (
          mail.sender.toLowerCase().includes(searchText.toLowerCase()) ||
          mail.subject.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    : sortedList;

  const navigateTo = async(item) => {
    navigation.navigate('mailView', item);
    if (!item.flag) await updateFlag(item)
  };

  const timeExtract = (param) => {
    let time = new Date(param)
    return time.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true})
  };

  const handleStarredMail = async(item) => {
    sortedList.map(mail => {
      if (mail.id = item.id) return { ...mail, starred: !mail.starred}
      else return mail
    })
    await starredMail(item)
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchText}
        placeholder="Search for mails"
      />
      {searchText ? (
        <TouchableOpacity style={styles.clear} onPress={clearSearch}>
          <Ionicons name="close" size={24} color="grey" />
        </TouchableOpacity>
      ) : null}
      <FlatList
        data={filteredList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateTo(item)}>
            <List.Item
              style={styles.listItem}
              title={() => (
                <View style={{ flexDirection: 'column'}}>
                  <Text style={styles.readItems}>{ item.from}</Text>
                  <Text style={styles.readItems}>{ item.subject}</Text>
                </View>
              )}
              titleStyle={{ marginTop: -5, paddingTop: 0, fontSize: 16 }}
              description={item.body}
              descriptionStyle={{ fontSize: 14, color: '#747264'}}
              descriptionNumberOfLines={1}
              left={() => (
                <Avatar.Text
                  size={35}
                  label={item.avatar}
                  style={[styles.avatar, { backgroundColor: item.avatarColor }]}
                />
              )}
              right={() => (
                <View style={{ flexDirection: 'column', alignItems: 'center', padding: 0, margin: 0 }}>
                  <Caption style={styles.caption}>{ timeExtract(item.time) }</Caption>
                  <TouchableOpacity onPress={() => handleStarredMail(item)}>
                    <MaterialIcons
                      name={item.starred ? "star" : "star-outline"}
                      size={18}
                      color={item.starred ? "gold" : "gray"}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <FAB
        icon="pencil"
        style={styles.fab}
        onPress={() => navigation.navigate('composeNewMail')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 5,
    marginRight: 10
  },
  listItem: {
    margin: 5,
    marginBottom: 0,
    marginTop: 0,
    paddingTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  caption: {
    marginTop: 0,
    paddingTop: 0,
    fontSize: 10,
  },
  clear: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    margin: 16,
    backgroundColor: 'red',
  },
  readItems: {
    // fontWeight: 400,
    color: '#747264',
  },
  unreadItems: {
    fontWeight: 600,
    color: '#000',
  },
});

export default SendMail;
