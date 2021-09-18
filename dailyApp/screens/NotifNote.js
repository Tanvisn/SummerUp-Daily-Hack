import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import { Entypo, FontAwesome5, FontAwesome } from '@expo/vector-icons';
export default class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }
    render() {
        return (
            <TouchableOpacity>
                <View key={this.props.val.key} style={styles.note}>

                    <Text style={styles.noteText}>{this.props.val.date}</Text>
                    <Text style={styles.noteText}>{this.props.val.note}</Text>
                    <View style={styles.noteDelete}>

                        <View style={{ bottom: 5, }}>
                            <FontAwesome5 name="briefcase-medical" size={40} color="#e63946" />
                        </View>

                        <View style={{ bottom: 5, }}>
                            <FontAwesome name="calendar" size={40} color="black" />
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },

    noteText: {
        paddingLeft: 20,
        fontWeight: "bold",
        borderLeftWidth: 10,
        borderLeftColor: '#1e555c',
    },

    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#1e555c',
        padding: 10,
        top: 20,
        bottom: 10,
        height: 40,
        right: 10,
        borderRadius: 10,
    },

    noteDeleteText: {
        color: 'white',
        fontWeight: "bold",
    },

});
