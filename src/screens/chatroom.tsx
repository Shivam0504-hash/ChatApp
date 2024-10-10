import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatOptionsModal from '../component/chatoptionmodal';
import ReactionModal from '../component/reactionmodal';

interface CustomMessage extends IMessage {
  metadata?: {
    reaction?: string;
  };
}

interface ChatRoomScreenProps {
  route: {
    params?: {
      contact?: string;
    };
  };
  navigation: any;
}

const getInitials = (name: string) => {
  return name.split(' ').map((n) => n[0]).join('');
};

const getRandomColor = () => {
  const colors = ['#FFB6C1', '#8A2BE2', '#5F9EA0', '#FF6347', '#FFD700', '#40E0D0'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route, navigation }) => {
  const contact = route?.params?.contact || "default_contact";
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reactionModalVisible, setReactionModalVisible] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<CustomMessage | null>(null);
  const [initialColor] = useState<string>(getRandomColor());
  const [messageText, setMessageText] = useState<string>('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(contact);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          setMessages([
            {
              _id: 2,
              text: 'Hii, How are you??',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: contact,
              },
            } as CustomMessage,
          ]);
        }
      } catch (error) {
        console.log('Error fetching messages: ', error);
      }
    };
    fetchMessages();
  }, [contact]);

  const onSend = async (newMessages: CustomMessage[] = []) => {
    const updatedMessages = GiftedChat.append(messages, newMessages);
    setMessages(updatedMessages);
    setMessageText('');

    try {
      await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
    } catch (error) {
      console.log('Error saving messages: ', error);
    }
  };


  const onMessageLongPress = (context: any, message: CustomMessage) => {
    setSelectedMessage(message);
    setReactionModalVisible(true);
  };

  const renderSend = (props: any) => {
    if (messageText.trim().length > 0) {
      return (
        <Send {...props}>
          <View style={styles.sendButtonContainer}>
            <Image source={Icons.send} style={styles.sendIcon} />
          </View>
        </Send>
      );
    }
    return null;
  };

  const deleteMessage = async () => {
    if (selectedMessage) {
      const updatedMessages = messages.filter(msg => msg._id !== selectedMessage._id);
      setMessages(updatedMessages);

      try {
        await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
      } catch (error) {
        console.log('Error deleting message: ', error);
      }

      setReactionModalVisible(false);
    }
  };

  // const onReactionSelect = (reaction: string) => {
  //   if (selectedMessage) {
  //     const updatedMessages = messages.map((msg) => {
  //       if (msg._id === selectedMessage._id) {
  //         return {
  //           ...msg,
  //           metadata: {
  //             ...msg.metadata,
  //             reaction,
  //           },
  //         };
  //       }
  //       return msg;
  //     });
  //     setMessages(updatedMessages);
  //     setReactionModalVisible(false);
  //   }
  // };

  const onReactionSelect = (reaction: string) => {
    if (selectedMessage) {
      const updatedMessages = messages.map((msg) => {
        if (msg._id === selectedMessage._id) {
          return {
            ...msg,
            metadata: {
              ...msg.metadata,
              reaction,
            },
          };
        }
        return msg;
      });
      setMessages(updatedMessages);
      // console.log('Updated messages:', updatedMessages);
      setReactionModalVisible(false);

      AsyncStorage.setItem(contact, JSON.stringify(updatedMessages)).catch((error) => {
        console.log('Error saving messages after reaction: ', error);
      });
    }
  };


  // Custom input toolbar
  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbarContainer}
        renderComposer={() => (
          <View style={styles.inputContainer}>

            <TouchableOpacity style={styles.addIconContainer}>
              <Image source={Icons.addicon} style={styles.addIcon} />
            </TouchableOpacity>

            <TextInput
              style={styles.textInput}
              placeholder="Message..."
              placeholderTextColor="#ADB5BD"
              value={messageText}
              onChangeText={(text) => {
                setMessageText(text);
                props.onTextChanged(text);
              }}
              multiline
            />
          </View>
        )}
      />
    );
  };

  const renderBubble = (props: any) => {
    // console.log(props.currentMessage)
    // console.log(props.currentMessage.metadata?.reaction)
    return (
      <View style={{ marginBottom:28, position:'relative',}}>
        <View style={{ position:'absolute', left:50, zIndex:999}} >
            {props.currentMessage.metadata?.reaction && (
              <Text style={{ fontSize: 20 }}>{props.currentMessage.metadata?.reaction}</Text>
            )}
          </View>

        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#F8F9F9',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 5,
            },
            right: {
              backgroundColor: '#2A7CBC',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 5,
            },
          }}
          textStyle={{
            left: {
              color: "#3A4F5F",
              fontSize: 16,
            },
            right: {
              color: '#fff',
              fontSize: 16,
            },
          }}
        >


          
          {/* <View style={{ position: 'absolute', left: 50, backgroundColor: 'red' }} ><Text>sdf</Text></View> */}

        </Bubble>
      </View>

    );

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

          <View style={[styles.initialsCircle, { backgroundColor: initialColor }]}>
            <Text style={styles.initialsText}>{getInitials(contact)}</Text>
          </View>

          <Text style={styles.contactName}>{contact}</Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={[styles.iconcontainer, { marginLeft: SCREEN_WIDTH * 0.24173027989 }]}>
              <Image source={Icons.dot} style={styles.Icon} />
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
        onLongPress={onMessageLongPress}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
      />


      {selectedMessage && (
        <ReactionModal
          visible={reactionModalVisible}
          message={selectedMessage.text}
          onClose={() => setReactionModalVisible(false)}
          onReactionSelect={onReactionSelect}
          onDelete={deleteMessage}
        />
      )}

      <ChatOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        contactname={contact}
        navigation={navigation}
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
    backgroundColor: "#F8F9F9",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.07394366197,
    paddingHorizontal: SCREEN_WIDTH * 0.04071246819,
    width: SCREEN_WIDTH,
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
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  initialsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactName: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#3A4F5F',
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
    // backgroundColor:'red',

  },
  sendIcon: {
    marginTop: 20,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  inputToolbarContainer: {
    borderTopWidth: 0,
    borderTopColor: '#3A4F5F',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderRadius: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    height: 40,
  },
  addIconContainer: {
    marginLeft: 10,
  },
  addIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#3A4F5F',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
