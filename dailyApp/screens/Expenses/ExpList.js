import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
export default class Transac extends React.Component {

	render() {
	return (
		<TouchableOpacity onPress={this.props.view}>
		<View key={this.props.keyval} style={styles.item}>
		
		<Text  style={ (this.props.val.type === income) ? styles.itemTextIncome : styles.itemTextExp}>{this.props.val.type}</Text>
		<Text style={styles.itemText}>{this.props.val.cost}</Text>
		<Text style={styles.itemText}>{this.props.val.pur}</Text>

		<TouchableOpacity onPress={this.props.deleteMethod} style={styles.itemDelete}>
		<Text style={styles.itemDeleteText}>D</Text>
		</TouchableOpacity>
		</View>
		</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		position: 'relative',
		padding: 20,
		paddingRight: 100,
		borderBottomWidth: 2,
		borderBottomColor: '#ededed',
	},

	itemTextIncome: {
		color: 'green',
		fontWeight: "700",
		fontSize: 18,
		paddingLeft: 20,
		borderLeftWidth: 10,
		borderLeftColor: '#e91e63',
	},


	itemTextExp: {
		color: 'red',
		fontWeight: "700",
		fontSize: 18,
		paddingLeft: 20,
		borderLeftWidth: 10,
		borderLeftColor: '#e91e63',
		paddingLeft: 20,
		borderLeftWidth: 10,
		borderLeftColor: '#e91e63',
	},

	listCheckbox: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: '#2980b9',
		padding: 10,
		top: 15,
		bottom: 10,
		right: 50,
	},

	itemDelete: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2980b9',
		padding: 10,
		top: 15,
		bottom: 10,
		right: 10,
		borderRadius: 5,
	},

	itemDeleteText: {
		color: 'white',
		fontWeight: '100',
	},
	
});