import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

const ChatModal = ({ modalVisible, setModalVisible, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('NewChat');
          }}
        >
          <Text style={styles.modalOption}>New Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={styles.modalOption}>New Group Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={styles.modalOption}>New Announcement</Text>
        </TouchableOpacity>
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </View>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalOption: {
    fontSize: 18,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});