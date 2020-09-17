import React from 'react';
import { Component, ReactElement } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, FontAwesome, Entypo, AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MedHome from './../screens/Medicines/medHome.js';
import MedReports from './../screens/Medicines/medReports.js';
import Reminder from './../screens/Medicines/reminder.js';
import MedRecord from './../screens/Medicines/medRecord.js';
import MeasureRecord from './../screens/Medicines/measureRecord.js';
import DocRecord from './../screens/Medicines/docRecord.js';
import DocApp from './../screens/Medicines/docApp.js';


const MedHomeStk = createStackNavigator();

function MedHomeStack({navigation}){
  return(
  <MedHomeStk.Navigator>
    <MedHomeStk.Screen name="MedReminder" component={MedHome} options={{title: "Medicine Home Page", headerShown: true, 
      headerLeft: (props)=>(
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
          <AntDesign name="arrowleft" size={24} color="black" style={{marginLeft:15}}/>
        </TouchableOpacity>)
      }} />
    <MedHomeStk.Screen name="MedRecord" component={MedRecord} options={{title: "Medicine Reminder", headerShown: true}} />
    <MedHomeStk.Screen name="MeasureRecord" component={MeasureRecord} options={{title: "Measurement Reminder", headerShown: true}} />
    <MedHomeStk.Screen name="DocRecord" component={DocRecord} options={{title: "Doctor Appointments", headerShown: true}} />
  </MedHomeStk.Navigator>
  )
  //
}

const Tab = createBottomTabNavigator();
const NetworkContext = React.createContext();
export function MedTab({navigation}){
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MedHome') {
            iconName = focused ? 'home' : 'home-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } 
          else if (route.name === 'Reports') {
            iconName = focused ? 'areachart' : 'linechart';
            return <AntDesign name={iconName} size={size} color={color} />;
          }

          else if (route.name === 'Reminders') {
            iconName = focused ? 'infocirlce' : 'infocirlceo';
            return <AntDesign name={iconName} size={size} color={color} />;
          }

          else if (route.name === 'Appointments') {
            iconName = focused ? 'aliwangwang' : 'aliwangwang-o1';
            return <AntDesign name={iconName} size={size} color={color} />;
          }
          

          },

        })}

      tabBarOptions={{
        activeTintColor: '#1e555c',
        inactiveTintColor: 'gray',
        fontSize: 18,
        fontWeight: "700",
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
      }}
      >
      <Tab.Screen name="MedHome" component={MedHomeStack} options={{ title: "Home"}}/>
      <Tab.Screen name="Reports" component={MedReports} options={{ headerShown: true }} />
      <Tab.Screen name="Appointments" component={DocApp} options={{ headerShown: false }} />
      <Tab.Screen name="Reminders" component={Reminder} options={{ headerShown: false }} />
      
      </Tab.Navigator>
      );
  }