import React from 'react';
import { Component, ReactElement } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, FontAwesome, Entypo, AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterShop from '../screens/Shopping/sellRegisterShop.js';
import ModifyShop from '../screens/Shopping/sellModifyShop.js';
import AddDeleteItems from '../screens/Shopping/addDeleteItems.js';
import AddSoldItems from '../screens/Shopping/addSoldItems.js';
import MonthSales from '../screens/Shopping/monthSales.js';
import ProductSales from '../screens/Shopping/productwiseSales.js';


const ShopSellStk = createStackNavigator();

function ShopSellStack({navigation}){
  return(
  <ShopSellStk.Navigator>
    <ShopSellStk.Screen name="RegisterShop" component={RegisterShop} options={{title: "Register", headerShown: true}} />
    
  </ShopSellStk.Navigator>
  )
  //
}

const Tab = createBottomTabNavigator();

export function SellTab({navigation}){
  return (
     
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'RegisterShop') {
            iconName = focused ? 'home' : 'home-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'ModifyShop') {
            iconName = focused ? 'pencil-circle' : 'pencil-circle-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }

          else if (route.name === 'AddDeleteItems') {
            iconName = focused ? 'infocirlce' : 'infocirlceo';
            return <AntDesign name={iconName} size={size} color={color} />;
          }

          else if (route.name === 'AddSoldItems') {
            iconName = focused ? 'money-bill' : 'money-bill-alt';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          }

           else if (route.name === 'MonthSales') {
            iconName = focused ? 'calendar-day' : 'calendar';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          }

           else if (route.name === 'ProductSales') {
            iconName = focused ? 'cart' : 'cart-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
          

          },

        })}

      tabBarOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'gray',
        fontSize: 18,
        fontWeight: "700",
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
      }}
      >

      <Tab.Screen name="RegisterShop" component={ShopSellStack} options={{title: "Register", headerShown: true}} />
      <Tab.Screen name="ModifyShop" component={ModifyShop} options={{title: "Modify", headerShown: true}} />
    <Tab.Screen name="AddDeleteItems" component={AddDeleteItems} options={{title: "Items", headerShown: true}} />
    <Tab.Screen name="AddSoldItems" component={AddSoldItems} options={{title: "Sales", headerShown: true}} />
    <Tab.Screen name="MonthSales" component={MonthSales} options={{title: "Monthly", headerShown: true}} />
    <Tab.Screen name="ProductSales" component={ProductSales} options={{title: "Pro-info", headerShown: true}} />
      </Tab.Navigator>

      );
  }


