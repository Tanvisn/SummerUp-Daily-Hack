import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export default class Note extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			checked: false,
		}
	}
	render() {
	return (
		
	<TouchableOpacity onPress={this.props.view}>
		<View key={this.props.keyval} style={styles.note}>
		<Text style={styles.noteText}>{(this.props.val.title==="Special Event Reminder"||this.props.val.title==="Event Reminder")?this.props.val.title:"Note"}</Text>
		<Text style={styles.noteText}>{this.props.val.date}</Text>

		{this.props.val.title==="Event Reminder"? 

		<View>
		<View style={{bottom: 30, left: 330, }}>
		<AntDesign name="clockcircle" size={40} color="#577399" />
		</View>
		<View style={{ bottom: 42 }}>
		<Text style={styles.noteText}>{this.props.val.eventName}</Text>
		</View>
		</View>

		:(
		this.props.val.title==="Special Event Reminder"?
		<View>
		<View style={{bottom: 30, left: 330, }}>
		<AntDesign name="heart" size={40} color="#ff006e" />
		</View>
		<View style={{ bottom: 42 }}>
		<Text style={styles.noteText}>{this.props.val.eventName}</Text>
		</View>
		</View>
		:
		<View>
		<View style={{bottom: 30, left: 330, }}>
		<Entypo name="book" size={40} color="#006d77" />
		</View>
		<View style={{ bottom: 42 }}>
		<Text style={styles.noteText}>{this.props.val.title}</Text>
		</View>
		</View>
		)}
		</View>
	</TouchableOpacity>
		);
	}
}

/*For Reminder
<AntDesign name="clockcircle" size={40} color="#577399" />
For special events
<AntDesign name="heart" size={40} color="#ff006e" />
For notes
<Entypo name="book" size={40} color="#006d77" />*/


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
		borderLeftColor: '#3D348B',
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