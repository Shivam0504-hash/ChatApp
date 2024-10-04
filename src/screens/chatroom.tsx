import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { StyleSheet } from "react-native";

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
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  
});

