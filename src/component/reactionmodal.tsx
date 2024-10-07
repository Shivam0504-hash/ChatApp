import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity,Image,TouchableWithoutFeedback } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';

interface ReactionModalProps {
  visible: boolean;
  message: string; // The message text for which the reaction modal is triggered
  onClose: () => void; // Close the modal
  onReactionSelect: (reaction: string) => void; // Handle reaction selection
  onDelete: () => void;
}

const reactions = ['👍', '❤️', '😂', '🎉', '👎'];

const ReactionModal: React.FC<ReactionModalProps> = ({ visible, message, onClose, onReactionSelect,onDelete }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
     
      <View style={styles.modalOverlay}>
      <View style={styles.textcontainer}>
      <Text style={styles.messageText}>{message}</Text>
      </View>
      
        <View style={styles.modalContent}>
          

          
          <View style={styles.reactionRow}>
            {reactions.map((reaction, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reactionButton}
                onPress={() => onReactionSelect(reaction)}
              >
                <Text style={styles.reactionEmoji}>{reaction}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.line}/>
          <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.reply} style={styles.img} />
                  <Text style={styles.optionText}>Reply</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.forward} style={styles.img} />
                  <Text style={styles.optionText}>Forward</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.copy} style={styles.img} />
                  <Text style={styles.optionText}>Copy</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.star} style={styles.img} />
                  <Text style={styles.optionText}>Star</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={Icons.edit} style={styles.img} />
                  <Text style={styles.optionText}>Edit</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete}>
                <View style={styles.row}>
                <Image source={Icons.delete} style={styles.img} />
                <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
          

         
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReactionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal:SCREEN_WIDTH*0.05089058524,
    paddingTop:SCREEN_HEIGHT*0.02816901408,
    paddingBottom:SCREEN_HEIGHT*0.07042253521,
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT*0.60211267605,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign:'center',
    lineHeight:19.6,
    color:"#3A4F5F"
  },
  reactionRow: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    marginBottom: 20,
    width:345,
  },
  reactionButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  reactionEmoji: {
    fontSize: 24,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  textcontainer:
  {
    width:SCREEN_WIDTH*0.91857506361,
    height:SCREEN_HEIGHT*0.05572769953,
    backgroundColor:'#fff',
    marginBottom:SCREEN_HEIGHT*0.01408450704,
    paddingHorizontal:SCREEN_WIDTH*0.04071246819,
    paddingTop:SCREEN_HEIGHT*0.00938967136,
    paddingBottom:SCREEN_HEIGHT*0.00938967136,
    borderRadius:12,

  },
  line: {
    width: 345,
    backgroundColor: '#e3e5e8',
    height: 1,
    marginTop: SCREEN_HEIGHT * 0.0234741784,
    marginBottom: SCREEN_HEIGHT * 0.0234741784,
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    height: SCREEN_HEIGHT * 0.02816901408,
    width: SCREEN_WIDTH * 0.06106870229,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: SCREEN_HEIGHT * 0.01877934272,
    color: '#3A4F5F',
    marginLeft: SCREEN_WIDTH * 0.03053435114,
    lineHeight: 20.8,
    fontWeight: '500',
  },
});