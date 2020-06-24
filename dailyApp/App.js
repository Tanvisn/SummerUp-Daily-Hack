import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import AdHome from './screens/AdHome.js';
import Notifications from './screens/Notifications.js';
import LoadingHomes from './screens/LoadingHome.js'
import { AdHomeStack, NotifStack } from './components/createStack.js';

const Stack = createStackNavigator();
var isLoggedIn=false;var age=0;var name="";
const Drawer = createDrawerNavigator();
function DrawerMenu()
{
  if(age===1){
  return(
    //kid
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={AdHome} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  )
  }
  else if(age===2){
  
  return(
    //teen
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={AdHome} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  )
  }
  else if(age===3){
  return(
  //adult
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={AdHomeStack}/>
      <Drawer.Screen name="Notifications" component={NotifStack} />
    </Drawer.Navigator>
  )
  }
  else {
    //elderly
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={AdHome} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  )
  }
}



const initAuthToken = async () => {
  const authData = await AsyncStorage.getItem('auth_data');

  if(authData !== null){
    console.log("hi");
    const authDataJson = JSON.parse(authData);
    age=authDataJson.age;
    age=3;
    name=authDataJson.name;
    //drawerMenu=DrawerMenu(age);
    isLoggedIn=true;
  }
}

export default function App() {
  initAuthToken();
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {isLoggedIn ? (
          <>          
          <Stack.Screen name="Welcome back" component={DrawerMenu} options={{ title:"Home", headerShown:false}}/>
          </>
        ) : (
        <>
        <Stack.Screen name="Welcome" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="signup" component={Signup} options={{ title:"SignUp", headerShown: true}}/>
        <Stack.Screen name="loading" component={LoadingHomes} options={{ title:"Home", headerShown: false}}/>
        </>
        )}        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
