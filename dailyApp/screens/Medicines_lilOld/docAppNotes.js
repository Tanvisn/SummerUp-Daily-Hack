import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign, Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons';
export default class Note extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			checked: false,
		}
	}
	render() {
		return (

			<TouchableOpacity>
			<View key={this.props.keyval} style={styles.note}>

			<Text style={styles.noteText}>{this.props.val.date}</Text>
			<Text style={styles.noteText}>{this.props.val.time}</Text>
			<Text style={styles.noteText}>{this.props.val.typeOfMeasurement}</Text>
			<Text style={styles.noteText}>{this.props.val.value} {this.props.val.unit}</Text>
			<View style={styles.noteDelete}>

			<View style={{ bottom:15, }}>
			<Ionicons name="md-pulse" size={40} color="black" />
			</View>


			<View style={{ bottom:15, }}>
			<FontAwesome5 name="briefcase-medical" size={40} color="#e63946" />
			</View>

			</View>

			</View>
			</TouchableOpacity>
			);
		}
	}

	/*For measure
	<View style={{ bottom:15, }}>
	<Ionicons name="md-pulse" size={40} color="black" />
	</View>
	For Medicine
	<View style={{ bottom:15, }}>
	<FontAwesome5 name="briefcase-medical" size={40} color="#e63946" />
	</View>

	*/



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