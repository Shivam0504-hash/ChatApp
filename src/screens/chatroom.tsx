import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { StyleSheet, View } from "react-native";

interface ChatRoomScreenProps {
  route: {
    params?: {
      contact?: string;
    };
  };
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route }) => {
  const { contact } = route?.params || {};
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ]);
  }, []);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, newMessages)
    );
  };

  return (
    <View style={{
      flex: 1, paddingBottom: 40
    }}>

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

});

