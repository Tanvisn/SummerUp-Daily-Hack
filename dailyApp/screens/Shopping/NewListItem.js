import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
export default class Item extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			checked: false,
		}
	}
	render() {
	return (
		<View key={this.props.keyval} style={styles.item}>
		
		<Text style={styles.itemText}>{this.props.val.item}</Text>

		<CheckBox
			value={this.state.checked}
			style={styles.listCheckbox}
			onValueChange={() => this.setState({ checked: !this.state.checked })}
			/>
		<TouchableOpacity onPress={this.props.deleteMethod} style={styles.itemDelete}>
		<Text style={styles.itemDeleteText}>D</Text>
		</TouchableOpacity>
		</View>
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
