import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default mailView = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params;
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.subject}>{item.subject}</Text>
      <ScrollView style={styles.scrollView}>
        <Card.Title
          title={item.sender}
          style={styles.cardTitle}
          subtitle={`Today ${item.time}`}
          left={() => (
            <Avatar.Text
              size={40}
              label={item.avatar}
              style={{ marginRight: 4 }}
            />
          )}
          right={() => (
            <View style={{ padding: 0, margin: 0 }}>
              <Button
                color="white"
                uppercase={false}
                style={styles.quickButton}
                onPress={() => {
                  console.log('Pressed');
                }}>
                Quick Reply
              </Button>
            </View>
          )}
        />
        <Card.Content style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10 }}>
          <Text>{item.body}</Text>
        </Card.Content>
      </ScrollView>
      <Card.Actions style={styles.actionItem}>
        <Button
          icon="reply"
          color="gray"
          uppercase={false}
          style={styles.buttonList}
          onPress={() => {
            navigation.goBack();
          }}>
          Back
        </Button>
        <Button
          icon="share"
          color="gray"
          uppercase={false}
          style={styles.buttonList}
          onPress={() => {
            console.log('Pressed');
          }}>
          Forward
        </Button>
      </Card.Actions>
    </View>
  );
};

const styles = StyleSheet.create({
  subject: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    backgroundColor: '#FEFBF6',
  },
  cardTitle: {
    marginTop: 0,
    marginLeft: 0,
    paddingLeft: 0,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  mainContainer: {
    height: '100%',
    paddingVertical: 40,
  },
  scrollView: {
    paddingTop: 0,
    paddingHorizontal: 12,
    backgroundColor: '#EEEEEE',
  },
  buttonList: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  quickButton: {
    flex: 1,
    borderColor: '#9195F6',
    borderWidth: 1,
    marginHorizontal: 1,
    backgroundColor: '#9195F6',
  },
  actionItem: {
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
  },
});