import React from 'react';
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

import AdHome from './AdHome.js';
import Notifications from './Notifications.js';

import { AdHomeStack, NotifStack, ProfileStack, HelpStack } from './../components/createStack.js';

const Drawer = createDrawerNavigator();

export default class LoadingHomes extends React.Component
{

  render(){
  console.log('loading Home');

  //const age=this.props.route.params.age;
  
  return(
  
    <Drawer.Navigator>
      <Drawer.Screen name="Home  " component={AdHomeStack} options={{headerShown: true }}/>
      <Drawer.Screen name="Notifications    " component={NotifStack} />
      <Drawer.Screen name="Profile " component={ProfileStack} />
      <Drawer.Screen name="Feedback " component={HelpStack} />
    </Drawer.Navigator>
  )
  
}
}
