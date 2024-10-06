import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';

interface ChatOptionsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ChatOptionsModal: React.FC<ChatOptionsModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.eye} style={styles.img} />
                  <Text style={styles.optionText}>View Details</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.pinchat} style={styles.img} />
                  <Text style={styles.optionText}>Pin Chat</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.searchchat} style={styles.img} />
                  <Text style={styles.optionText}>Search Chat</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.delete} style={styles.img} />
                  <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: SCREEN_WIDTH * 0.06106870229,
    paddingBottom: SCREEN_HEIGHT * 0.07042253521,
    paddingTop: SCREEN_HEIGHT * 0.02816901408,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.35521688159,
  },
  option: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: SCREEN_HEIGHT * 0.01877934272,
    color: '#3A4F5F',
    marginLeft: SCREEN_WIDTH * 0.03053435114,
    lineHeight: 20.8,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: 'red',
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    height: SCREEN_HEIGHT * 0.02816901408,
    width: SCREEN_WIDTH * 0.06106870229,
    resizeMode: 'contain',
  },
  line: {
    width: SCREEN_WIDTH * 0.33587786259,
    backgroundColor: '#e3e5e8',
    height: 1,
    marginTop: SCREEN_HEIGHT * 0.0234741784,
    marginBottom: SCREEN_HEIGHT * 0.0234741784,
  },
});

export default ChatOptionsModal;
