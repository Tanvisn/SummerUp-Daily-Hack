import React from 'react';
	import { StyleSheet, Text, View,TouchableOpacity, CheckBox } from 'react-native';
	import Constants from 'expo-constants';
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


				<TouchableOpacity>
				<View key={this.props.val.key} style={styles.note}>

				<Text style={styles.noteText}>{this.props.val.date}</Text>
				<Text style={styles.noteText}>{this.props.val.hour+" : "+this.props.val.minutes}</Text>
				<Text style={styles.noteText}>{this.props.val.name}</Text>

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
			fontWeight:"bold",
			borderLeftWidth: 10,
			borderLeftColor: '#1e555c',
		},

		noteDelete: {
			position: 'absolute',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#1e555c',
			padding: 10,
			top: 20,
			bottom: 10,
			height:40,
			right: 10,
			borderRadius:10,
		},

		noteDeleteText: {
			color: 'white',
			fontWeight:"bold",
		},

	});