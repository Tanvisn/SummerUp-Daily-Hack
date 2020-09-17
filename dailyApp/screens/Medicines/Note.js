/*Generating multiple time slots for medicine reminder*/
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, CheckBox, TextInput } from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
export default class Note extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isTimePickerVisible: false,
			time:"",
		}

		this.hideTimePicker = this.hideTimePicker.bind(this);
		this.handleTimeConfirm = this.handleTimeConfirm.bind(this);

	}

	hideTimePicker(){
		this.setState({ isTimePickerVisible: false});
	};


	handleTimeConfirm(time) {
		this.hideTimePicker();
		this.setState({ time:moment(time).format('HH : mm')});
	};


	render() {
		return (


			<View key={this.props.keyval} style={styles.note}>

			
			<TouchableOpacity style={{ right:20, }} onPress={() => this.setState({ isTimePickerVisible: true})}>
			<TextInput style={styles.textinput} placeholder="Time" 
			placeholderTextColor="black"
			underlineColorAndroid={'transparent'} 
			editable={false}
			value={this.state.time}
			onTouchStart={() => this.setState({ isTimePickerVisible: true})}
			/>
			</TouchableOpacity>

			<DateTimePickerModal
			isVisible={this.state.isTimePickerVisible}
			mode="time"
			onConfirm={this.handleTimeConfirm}
			onCancel={() => this.setState({ isTimePickerVisible: false})}
			/>
			<TouchableOpacity onpress={this.props.deleteMethod} style={styles.noteDelete}>
			<AntDesign name="closecircle" size={24} color="red" />

			</TouchableOpacity>

			</View>
			);
		}
	}

	const styles = StyleSheet.create({
		note: {
			position: 'relative',
			top: 20,
			left: 5,
			right: 20,
			paddingLeft: 30,
			paddingRight: 30,

		},

		noteText: {
			paddingLeft: 20,
		},

		noteDelete: {
			position: 'absolute',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: '#2980b9',
			padding: 10,
			top: 0,
			bottom: 20,
			right: 10,
		},

		textinput: {
			color: 'black',
			fontSize: 18,
			alignSelf: 'stretch',
			height: 50,
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft:10,
			marginBottom: 20,
			borderColor: 'black',
			borderWidth: 1,
			borderRadius: 5,
			textAlignVertical: "top",
			backgroundColor: 'rgba(30, 85, 92,0.1)',
		},


		noteDeleteText: {
			color: 'white',
		},

	});