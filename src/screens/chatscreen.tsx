import { View, Text,StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../component/header'
import Searchbox from '../component/searchbox'
const ChatScreen= ({ navigation }) => {
  return (
    <View>
     <Header text='Meaasege'/>
     <Searchbox/>
     <View style={styles.container}>
     <Text style={styles.text}>No chats,yet!</Text>
     <TouchableOpacity>
      <View style={styles.button}>
        <Text style={styles.buttontext}>Start Chat</Text>
      </View>
     </TouchableOpacity>
     </View >
     <ChatModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </View>
    
    
    
  )
}

export default ChatScreen;
const styles = StyleSheet.create({
  container:
  {
    justifyContent:'center',
    alignItems:'center',
    paddingTop:300,
  },
  text:{
    fontSize:20,
    marginBottom:40,
  },
  button:
  {
    width:130,
    height:40,
    backgroundColor:'#2A7BBB',
    paddingHorizontal:20,
    paddingVertical:10,
  },
  buttontext:
  {
    color:'#fff',
    fontSize:18,
  }
  

})