import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import AllEntries from './../screens/Diary/AllEntries.js';
import NewEntry from '../screens/Diary/NewEntry.js';
import AllLists from './../screens/Shopping/AllLists.js';
import AdHome from './../screens/AdHome.js';
import Notifications from './../screens/Notifications.js';
import HelpCenter from './../screens/Help-center.js';
import NewList from './../screens/Shopping/NewList.js';
import Allfeatures from './../screens/Sports/Allfeatures.js';
import AllListSports from './../screens/Sports/AllListSports.js';
import NewListSports from './../screens/Sports/NewListSports.js';
import StopWatch from './../screens/Sports/StopWatch.js';
import Timer from './../screens/Sports/Timer.js';
import Diet from './../screens/Sports/Diet.js';
import Profile from './../screens/Profile.js';
import Home from './../screens/Expenses/ExHome';
import Manager from './../screens/Expenses/Manager.js';
import Income from './../screens/Expenses/Income.js';
import Expenditure from './../screens/Expenses/Expenditure.js';
import Reports from './../screens/Expenses/Reports.js';
import AllTrans from './../screens/Expenses/AllTrans.js';
import Calculator from './../screens/Expenses/Calculator.js';
import Food from './../screens/Sports/Food.js';
import Water from './../screens/Sports/Water.js';
import Sleep from './../screens/Sports/Sleep.js';
import MedRecord from './../screens/Medicines/medRecord.js';

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
		<AdHomeStk.Screen name="NewListSports" component={NewListSports} options={{title: "Make a Workout Schedule"}} />
		<AdHomeStk.Screen name="AllListSports" component={AllListSports} options={{title: "Your Plans"}} />
		<AdHomeStk.Screen name="Food" component={Food} options={{title: "My Palate"}} />
		<AdHomeStk.Screen name="Water" component={Water} options={{title: "Keep Yourself Hydrated"}} />
		<AdHomeStk.Screen name="Sleep" component={Sleep} options={{title: "Sleep well"}} />
		<AdHomeStk.Screen name="StopWatch" component={StopWatch} options={{title: "Stop Watch"}} />
		<AdHomeStk.Screen name="Timer" component={Timer} options={{title: "Timer"}} />
		<AdHomeStk.Screen name="Diet" component={Diet} options={{title: "Health"}} />
		<AdHomeStk.Screen name="Manager" component={Manager} options={{title: "Daily Expenses Manager", headerShown: true,
			headerRight: (props)=> (<TouchableOpacity style={{padding:10}} onPress={() => navigation.navigate('Calculator')}>
				<MaterialCommunityIcons name="calculator-variant" size={24} color="black" /></TouchableOpacity>)
		}} />
		<AdHomeStk.Screen name="Income" component={Income} options={{title: "Income", headerShown: false}} />
		<AdHomeStk.Screen name="Expenditure" component={Expenditure} options={{title: "Expenditure", headerShown: false}} />
		<AdHomeStk.Screen name="Reports" component={Reports} options={{title: "Reports"}} />
		<AdHomeStk.Screen name="AllTrans" component={AllTrans} options={{title: "All Transactions"}} />
		<AdHomeStk.Screen name="Calculator" component={Calculator} options={{title: "Calculator"}} />
		<AdHomeStk.Screen name="MedRecord" component={MedRecord} options={{title: "Medicine Reminder", headerShown: true}} />
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

const ProfileStk = createStackNavigator();

export function ProfileStack({navigation}){
	return(
	<ProfileStk.Navigator>
		<ProfileStk.Screen name="Profile" component={Profile} options={{
			headerShown: true,
			headerLeft: (props)=>(<TouchableOpacity onPress={()=>{navigation.openDrawer()}}><Ionicons 
                name="md-menu" 
                size={25} 
                color="blue" 
                style={{ margin: 7,}} /></TouchableOpacity>)
		}} />
    </ProfileStk.Navigator>
	)
}

const HelpStk = createStackNavigator();

export function HelpStack({navigation}){
	return(
	<HelpStk.Navigator>
		<HelpStk.Screen name="Help Center" component={HelpCenter} options={{ title: "Help Centre", headerShown: true,
			headerLeft: (props)=>(<TouchableOpacity onPress={()=>{navigation.openDrawer()}}><Ionicons 
                name="md-menu" 
                size={25} 
                color="blue" 
                style={{ margin: 7,}} /></TouchableOpacity>)}} />
	</HelpStk.Navigator>
	)
}