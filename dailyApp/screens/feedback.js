import * as React from 'react';
import { Component, ReactElement } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Picker } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class Feedback extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: "",
            name: "",
            email: "",
            feed: "",
        };
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 70, left: 170, }}>
                    <FontAwesome name="handshake-o" size={60} color="#3b5998" />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 70, left: 140, }}>
                    <Text style={styles.btnTextTitle}>Feedback</Text>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, alignSelf: 'stretch', bottom: 50, right: 30 }}>
                    <TextInput style={styles.textinput} placeholder="Your Name"
                        placeholderTextColor="black"
                        underlineColorAndroid={'transparent'}
                        onChange={(e) => this.setState({ name: e.nativeEvent.text })}
                        value={this.state.name} />

                    <TextInput style={styles.textinput} placeholder="Email"
                        placeholderTextColor="black"
                        underlineColorAndroid={'transparent'}
                        onChange={(e) => this.setState({ email: e.nativeEvent.text })}
                        value={this.state.email} />


                    <TextInput style={styles.textinputDiary} placeholder="Your Suggestions/Feedback"
                        placeholderTextColor="black" multiline={true}
                        underlineColorAndroid={'transparent'}
                        onChange={(e) => this.setState({ feed: e.nativeEvent.text })}
                        value={this.state.feed} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 10, left: 40, }}>
                        <Text style={styles.btnTextRate}>Please Enter a Rating :-</Text>
                    </View>


                    <View style={styles.dropdown}>
                        <Picker mode='dropdown'
                            style={styles.picker}
                            selectedValue={this.state.mode}
                            onValueChange={(itemValue, itemIndex) => this.setState({ mode: itemValue })}>
                            <Picker.Item label="⭐ ⭐ ⭐ ⭐ ⭐" value="5" />
                            <Picker.Item label="⭐ ⭐ ⭐ ⭐" value="4" />
                            <Picker.Item label="⭐ ⭐ ⭐" value="3" />
                            <Picker.Item label="⭐ ⭐" value="2" />
                            <Picker.Item label="⭐" value="1" />

                        </Picker>
                    </View>

                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
        padding: 8,
        backgroundColor: '#fff',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    btnText: {
        fontSize: 20,
        fontWeight: "700",
        color: 'white',
    },

    btnTextTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: 'black',
    },

    btnTextRate: {
        fontSize: 18,
        fontWeight: "700",
        color: 'black',
    },


    img: {
        width: 40,
        height: 40,
    },

    imgTitle: {
        width: 50,
        height: 50,
    },

    dropdown: {
        color: 'black',
        width: 330,
        height: 50,
        paddingTop: 0,
        paddingBottom: 10,
        paddingLeft: 0,
        marginTop: 10,
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        left: 40,
        textAlignVertical: "top",
        backgroundColor: '#fff',
    },

    textinput: {
        color: 'black',
        fontSize: 18,
        width: 330,
        height: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: "top",
        top: 10,
        left: 40,
        backgroundColor: '#dfe3ee',
    },


    textinputDiary: {
        color: 'black',
        backgroundColor: '#dfe3ee',
        width: 330,
        height: 150,
        marginBottom: 30,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
        left: 40,
        borderRadius: 5,
        textAlignVertical: "top",
        padding: 10,
    },



    button: {
        borderWidth: 2,
        borderColor: 'rgba(30, 85, 92, 0.5)',
        borderRadius: 5,
        padding: 15,
        left: 30,
        height: 60,
        bottom: 40,
        //marginLeft: 28,
        backgroundColor: "#3b5998",
        width: 330,
        alignItems: 'center',
    },
});

