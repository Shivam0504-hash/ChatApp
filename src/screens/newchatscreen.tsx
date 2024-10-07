import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';
import contacts from '../assets/contacts.json';


interface Contact {
  id: string; 
  name: string;
}

interface NewChatScreenProps {
  navigation: {
    navigate: (screen: string, params: { contact: string }) => void;
    goBack: () => void;
  };
}

const getInitials = (name: string): string => {
  return name.split(' ').map((n) => n[0]).join('');
};

const getRandomColor = (): string => {
  const colors = ['#FFB6C1', '#8A2BE2', '#5F9EA0', '#FF6347', '#FFD700', '#40E0D0'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const NewChatScreen: React.FC<NewChatScreenProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const filteredContacts = (contacts as Contact[]).filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSelectContact = (contact: Contact) => {
    navigation.navigate('ChatRoomScreen', { contact: contact.name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconconatiner}>
            <Image source={Icons.backicon2} style={styles.back} />
          </View>
        </TouchableOpacity>
        <TextInput
          label={isFocused ? '' : "Search here..."}
          value={searchTerm}
          mode="flat"
          style={styles.input}
          onChangeText={setSearchTerm}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)} 
          left={
            <TextInput.Icon
              icon={() => <Image source={Icons.search} style={styles.icon} />}
            />
          }
          outlineColor='#E7EBF3'
          underlineStyle={{
            display: 'none',
          }}
        />
      </View>

      {searchTerm === '' ? null : (
        filteredContacts.length > 0 ? (
          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectContact(item)}>
                <View style={styles.contactItem}>
                  <View style={[styles.initialsCircle, { backgroundColor: getRandomColor() }]}>
                    <Text style={styles.initialsText}>{getInitials(item.name)}</Text>
                  </View>
                  <Text style={styles.contactText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.noContactsContainer}>
            <Image source={Icons.nocontact} style={styles.noContactsImage} />
            <Text style={styles.noContactsText}>No results found</Text>
          </View>
        )
      )}
    </View>
  );
};

export default NewChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EDF3',
    paddingLeft: SCREEN_WIDTH * 0.04071246819,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: "#fff",
    width: SCREEN_WIDTH - 34,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    height: SCREEN_HEIGHT * 0.05633802816,
    width: SCREEN_WIDTH * 0.70572519084,
    marginLeft: SCREEN_WIDTH * 0.07071246819,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginTop: SCREEN_HEIGHT * 0.07746478873,
    height: SCREEN_HEIGHT * 0.05633802816,
    marginBottom: 15,
  },
  back: {
    height: 20,
    width: 20,
  },
  iconconatiner: {
    height: SCREEN_HEIGHT * 0.05633802816,
    width: 52,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactsContainer: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.14929577464,
  },
  noContactsImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  noContactsText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
});
