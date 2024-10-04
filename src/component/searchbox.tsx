import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';

const Searchbox = () => {
  const [search, setSearch] = useState(''); 

  return (
    <View style={styles.container}>
      <TextInput
        label={"Search Message"}
        value={search} 
        editable={true} 
        mode="outlined"
        style={styles.input}
        onChangeText={text => setSearch(text)} 
        left={
          <TextInput.Icon
            icon={() => (
              <Image source={Icons.search} style={styles.icon} />
            )}
          />
        }
        outlineColor='#E7EBF3'
      />
    </View>
  );
};

export default Searchbox;

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_HEIGHT * 0.01938967136,
    marginLeft: SCREEN_WIDTH * 0.05089058524,
  },
  input: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT * 0.05322444678,
    width: SCREEN_WIDTH - (2 * 20),
  },
  icon: {
    width: 24,
    height: 24,
  },
});