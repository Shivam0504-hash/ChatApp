import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { StyleSheet, View ,Image, TouchableOpacity} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatRoomScreenProps {
  route: {
    params?: {
      contact?: string;  // Ensure contact is a string
    };
  };
  navigation: any;
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route, navigation }) => {
  const contact = route?.params?.contact || "default_contact";  // Fallback to a default string
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(contact);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.log('Error fetching messages: ', error);
      }
    };
    fetchMessages();
  }, [contact]);

  // Store the messages whenever new messages are sent
  const onSend = async (newMessages: IMessage[] = []) => {
    const updatedMessages = GiftedChat.append(messages, newMessages);
    setMessages(updatedMessages);

    try {
      await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
    } catch (error) {
      console.log('Error saving messages: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.iconcontainer}>
              <Image source={Icons.backicon2} style={styles.Icon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  header: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.14436619718,
    backgroundColor: "#f7faf8"
  },
  row: {
    flexDirection: 'row',
    marginTop: SCREEN_HEIGHT * 0.07394366197,
    paddingHorizontal: SCREEN_WIDTH * 0.04071246819,
  },
  iconcontainer: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  }
});