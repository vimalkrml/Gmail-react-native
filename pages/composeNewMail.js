import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import useStore from '../store/store';

const ComposeNewMail = ({ visible, onClose }) => {

  const { mails, composeMail } = useStore()
  const navigation = useNavigation();

  const [compose, setCompose] = React.useState('');
  const [subject, setSubject] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [to, setTo] = React.useState(null);
  const [items, setItems] = React.useState([]);

  const handleSend = () => {
    const getMail = mails.find(i => i.id = to[0])
    const data = {
      id: Math.floor(Math.random() * 1000000),
      from: 'Vimal',
      sender: getMail.sender,
      subject: subject,
      body: compose,
      avatarColor: getRandomColor()
    }
    setSubject('')
    setTo(null)
    setCompose('')
    composeMail(data)
    navigation.goBack();
  };

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  React.useEffect(() => {
    const mailList =  mails.map(item => ({label: item.sender, value: item.id}))
    setItems(mailList)
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>
            Compose
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10}}>From</Text>
            <TextInput
            style={{ color: '#5C5470' }}
              value={'vimal@gmail.app'}
              disabled
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10}}>To</Text>
            <DropDownPicker
              open={open}
              value={to}
              items={items}
              setValue={setTo}
              setItems={setItems}
              setOpen={setOpen}
              autoScroll
              disableBorderRadius={true}
              multiple={true}
              mode='BADGE'
              dropDownContainerStyle={styles.dropDownContainer}
              style={styles.inputStyle}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
            style={{ color: '#5C5470' }}
              value={subject}
              onChangeText={sub => setSubject(sub)}
              placeholder='Subject'
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
            style={{ color: '#5C5470' }}
              value={compose}
              onChangeText={text => setCompose(text)}
              placeholder='Compose mail'
            />
          </View>
        </View>

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
            icon="send"
            color="gray"
            uppercase={false}
            style={styles.buttonList}
            onPress={ handleSend }>
            Send
          </Button>
        </Card.Actions>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  buttonList: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  actionItem: {
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
  },
  icon: {
    marginRight: 5,
  },
  dropDownContainer: {
    borderWidth: 0,
    borderRadius: 0,
    width: '90%',
  },
  inputStyle: {
    width: '90%',
    borderWidth: 0,
    padding: 0,
    margin: 0
  }
});

export default ComposeNewMail;
