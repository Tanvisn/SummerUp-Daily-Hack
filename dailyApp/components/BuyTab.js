import React from 'react';
import { Component, ReactElement } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, FontAwesome, Entypo, AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SearchShop from '../screens/Shopping/buySearch.js';
import MyShop from '../screens/Shopping/buyMyShop.js';
import ShopItems from '../screens/Shopping/buyShopItems.js';

const ShopBuyStk = createStackNavigator();

function ShopBuyStack({navigation}){
  return(
  <ShopBuyStk.Navigator>
    <ShopBuyStk.Screen name="RegisterShop" component={RegisterShop} options={{title: "Register", headerShown: true}} />
    
  </ShopBuyStk.Navigator>
  )
  //
}

const Tab = createBottomTabNavigator();

export function BuyTab({navigation}){
  return (
     
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'SearchShop') {
            iconName = focused ? 'feature-search' : 'feature-search-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'MyShop') {
            iconName = focused ? 'star' : 'staro';
            return <AntDesign name={iconName} size={size} color={color} />;
          }

          else if (route.name === 'ShopItems') {
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

    <Tab.Screen name="SearchShop" component={SearchShop} options={{title: "Search", headerShown: true}} />
    <Tab.Screen name="MyShop" component={MyShop} options={{title: "Favourites", headerShown: true}} />
    <Tab.Screen name="ShopItems" component={ShopItems} options={{title: "Items", headerShown: true}} />
    
    </Tab.Navigator>

      );
  }


