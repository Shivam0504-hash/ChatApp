import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import Searchbox from '../component/searchbox';
import ChatModal from '../component/chatmodal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import contacts from '../assets/contacts.json';
import { Icons } from '../assets';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';

const getInitials = (name) => {
  return name.split(' ').map((n) => n[0]).join('');
};

const getRandomColor = () => {
  const colors = ['#FFB6C1', '#8A2BE2', '#5F9EA0', '#FF6347', '#FFD700', '#40E0D0'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ChatScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chatPromises = contacts.map(async (contact) => {
        const messages = await AsyncStorage.getItem(contact.name);
        return { name: contact.name, messages: messages ? JSON.parse(messages) : [] };
      });

      const chatResults = await Promise.all(chatPromises);
      const existingChats = chatResults.filter(chat => chat.messages.length > 0);
      setChats(existingChats);
    };

    fetchChats();
  }, []);

  return (
    <View>
      <Header text='Messages' setModalVisible={setModalVisible} />
      <Searchbox />
      <View style={styles.container}>
        {chats.length === 0 ? (
          <>
            <Image source={Icons.nochat} style={styles.img}/>
            <Text style={styles.text}>No chats yet!</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.button}>
                <Text style={styles.buttontext}>Start Chat</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ChatRoomScreen', { contact: item.name })}>
                <View style={styles.contactItem}>
                  <View style={[styles.initialsCircle, { backgroundColor: getRandomColor() }]}>
                    <Text style={styles.initialsText}>{getInitials(item.name)}</Text>
                  </View>
                  <Text style={styles.contactText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <ChatModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: SCREEN_HEIGHT*0.01877934272,
    fontWeight:'700',
    color:'#3A4F5F'
  },
  button: {
    marginTop:SCREEN_HEIGHT*0.02816901408,
    width:SCREEN_WIDTH*0.36641221374,
    height:SCREEN_HEIGHT*0.05751173708,
    backgroundColor: '#2A7BBB',
    paddingHorizontal: SCREEN_WIDTH*0.08142493638,
    paddingVertical: SCREEN_HEIGHT*0.01643192488,
    borderRadius:8,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'500',
    lineHeight:20.8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: "#fff",
    width: '100%',
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
  },
  img:
  {
    width:SCREEN_WIDTH*0.4223918575,
    height:SCREEN_HEIGHT*0.15157863849,
    marginTop:SCREEN_HEIGHT*0.12558685446,
    resizeMode:'contain',

  }
});