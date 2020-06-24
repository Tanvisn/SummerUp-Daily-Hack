import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
export default class Entry extends React.Component {
	render() {
	return (
		
	<TouchableOpacity onPress={this.props.view}>
		<View key={this.props.val.key} style={styles.entry}>

		<Text style={styles.entryText}>{this.props.val.date}</Text>
		<Text style={styles.entryText}>{this.props.val.title}</Text>

		<TouchableOpacity onPress={this.props.deleteMethod} style={styles.entryDelete}>
		<Text style={styles.entryDeleteText}>D</Text>

		</TouchableOpacity>
		</View>
	</TouchableOpacity>
	);
	}
}

const styles = StyleSheet.create({
	entry: {
		position: 'relative',
		padding: 20,
		paddingRight: 100,
		borderBottomWidth: 2,
		borderBottomColor: '#ededed',
	},

	entryText: {
		paddingLeft: 20,
		borderLeftWidth: 10,
		borderLeftColor: '#e91e63',
	},

	entryDelete: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2980b9',
		padding: 10,
		top: 10,
		bottom: 10,
		right: 10,
	},

	entryDeleteText: {
		color: 'white',
	}
});