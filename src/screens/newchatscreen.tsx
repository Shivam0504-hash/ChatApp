import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { TextInput } from 'react-native-paper';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';
import { ScreenNames } from '../navigator/screenNames';

import contacts from '../assets/contacts.json';

const getInitials = (name) => {
    const initials = name.split(' ').map((n) => n[0]).join('');
    return initials;
};

const getRandomColor = () => {
    const colors = ['#FFB6C1', '#8A2BE2', '#5F9EA0', '#FF6347', '#FFD700', '#40E0D0'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const NewChatScreen = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSelectContact = (contact) => {
        navigation.navigate(ScreenNames.ChatRoomScreen, { contact });
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconconatiner}>
                    <Image source={Icons.backicon2} style={styles.back} />
                </View>
                <TextInput
                    label={"Search here..."}
                    value={searchTerm}
                    editable={true}
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setSearchTerm}
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
        height: 48,
        width: SCREEN_WIDTH * 0.70572519084,
        marginLeft: SCREEN_WIDTH * 0.07071246819,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.07746478873,
        height: 60,
        alignItems: 'center',
        marginBottom: 15,

    },
    back: {
        height: 20,
        width: 20,
    },
    iconconatiner: {
        height: 52,
        width: 52,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',

    },
});
