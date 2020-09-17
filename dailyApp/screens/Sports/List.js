import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
export default class List extends React.Component {

	render() {
	return (
		<TouchableOpacity onPress={this.props.view}>
		<View key={this.props.keyval} style={styles.item}>
		
		<Text style={styles.itemText}>{this.props.val.date}</Text>

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

	itemText: {
		paddingLeft: 20,
		borderLeftWidth: 10,
		borderLeftColor: 'rgb(29, 53, 87)',
	},

	listCheckbox: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
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