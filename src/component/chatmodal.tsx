import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';
import { ScreenNames } from '../navigator/screenNames';

// Define props interface
interface ChatModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  navigation: {
    navigate: (screen: string) => void;
  };
}

const ChatModal: React.FC<ChatModalProps> = ({ modalVisible, setModalVisible, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.optioncontainer}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate(ScreenNames.NewChatScreen);
              }}
            >
              <View style={styles.option}>
                <Image source={Icons.newchat} style={styles.img} />
                <Text style={styles.text}>New Chat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('NewGroupChat'); // Updated navigation name to be consistent
              }}
            >
              <View style={styles.option}>
                <Image source={Icons.newgroup} style={styles.img} />
                <Text style={styles.text}>New Group Chat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('NewAnnouncement'); // Updated navigation name to be consistent
              }}
            >
              <View style={[styles.option, { marginBottom: 60 }]}>
                <Image source={Icons.announcement} style={styles.img} />
                <Text style={styles.text}>New Announcement</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  optioncontainer: {
    height: SCREEN_HEIGHT * 0.31924882629,
    width: SCREEN_WIDTH,
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'flex-end',
  },
  option: {
    flexDirection: 'row',
    padding: 20,
    height: 60,
    borderColor: "#e8ebe9",
    marginBottom: 10,
  },
  img: {
    height: 30,
    width: 30,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
});
