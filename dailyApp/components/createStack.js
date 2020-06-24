import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import AllEntries from './../screens/Diary/AllEntries.js';
import NewEntry from '../screens/Diary/NewEntry.js';
import AllLists from './../screens/Shopping/AllLists.js';
import AdHome from './../screens/AdHome.js';
import Notifications from './../screens/Notifications.js';
import NewList from './../screens/Shopping/NewList.js';
import Allfeatures from './../screens/Sports/Allfeatures.js';
import StopWatch from './../screens/Sports/StopWatch.js';
import Timer from './../screens/Sports/Timer.js';
import Fitness from './../screens/Sports/Diet.js';

const AdHomeStk = createStackNavigator();

export function AdHomeStack({navigation}){
	return(
	<AdHomeStk.Navigator>
		<AdHomeStk.Screen name="Home" component={AdHome} options={{
		title: "Home",
			headerShown: true,
			headerLeft: (props)=>(<TouchableOpacity onPress={()=>{navigation.openDrawer()}}><Ionicons 
                name="md-menu" 
                size={25} 
                color="blue" 
                style={{ margin: 7,}} /></TouchableOpacity>)
		}} />
		<AdHomeStk.Screen name="Diary" component={AllEntries} options={{title:"My Diary", headerShown: true}} screenProps={{lockMode: 'locked-closed'}}/>
		<AdHomeStk.Screen name="NewEntry" component={NewEntry} options={{title:"New Entry", headerShown: true}} screenProps={{lockMode: 'locked-closed'}}/>
		<AdHomeStk.Screen name="Shopping" component={AllLists} />
		<AdHomeStk.Screen name="NewList" component={NewList} options={{title: "New List"}} />
		<AdHomeStk.Screen name="Sports" component={Allfeatures} options={{title: "Sports Home"}} />
		<AdHomeStk.Screen name="StopWatch" component={StopWatch} options={{title: "Stop Watch", headerShown: false}} />
		<AdHomeStk.Screen name="Timer" component={Timer} options={{title: "Timer", headerShown: false}} />
		<AdHomeStk.Screen name="Fitness" component={Fitness} options={{title: "Diet", headerShown: false}} />
	</AdHomeStk.Navigator>
	)
}

const NotifStk = createStackNavigator();

export function NotifStack({navigation}){
	return(
	<NotifStk.Navigator>
		<NotifStk.Screen name="Notifications" component={Notifications} options={{
			headerShown: true,
			headerLeft: (props)=>(<TouchableOpacity onPress={()=>{navigation.openDrawer()}}><Ionicons 
                name="md-menu" 
                size={25} 
                color="blue" 
                style={{ margin: 7,}} /></TouchableOpacity>)
		}} />
	</NotifStk.Navigator>
	)
}