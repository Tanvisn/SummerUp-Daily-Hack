import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
export default class Note extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			checked: false,
		}
	}
	render() {
	return (
		

		<View key={this.props.keyval} style={styles.note}>
		
		<Text style={styles.noteText}>{this.props.val.date}</Text>
		<Text style={styles.noteText}>{this.props.val.note}</Text>
		<TouchableOpacity onpress={this.props.deleteMethod} style={styles.noteDelete}>
		<Text style={styles.noteDeleteText}>D</Text>

		<View style={{ bottom:15, }}>
		<AntDesign name="checkcircle" size={40} color="green" />
		</View>

		
		</TouchableOpacity>
		
		</View>
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
		fontWeight:"bold",
		borderLeftWidth: 10,
		borderLeftColor: '#1e555c',
	},

	noteDelete: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: '#2980b9',
		padding: 10,
		top: 30,
		bottom: 10,
		right: 10,
	},

	noteDeleteText: {
		color: 'white',
	},
	
});