import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import React, {useState, useRef, useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import AdHome from './screens/AdHome.js';
import Record from './screens/Medicines/recordMeas.js';
import LoadingHomes from './screens/LoadingHome.js'
import { AdHomeStack, NotifStack, ProfileStack, HelpCenter } from './components/createStack.js';

const Stack = createStackNavigator();
var isLoggedIn=false;var age=0;var name="";var datax={};
const Drawer = createDrawerNavigator();

Notifications.setNotificationHandler({
    
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

function DrawerMenu()
{
  
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Home " component={AdHomeStack}/>
      <Drawer.Screen name="Notifications " component={NotifStack} />
      <Drawer.Screen name="Profile " component={ProfileStack} />
      <Drawer.Screen name="HelpCenter " component={HelpCenter} />
    </Drawer.Navigator>
  )
  
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    } 
    //Creates a token.
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

const RecordScreen = ({navigation},data) => {
  console.log(data);
  useEffect(() => {
    
    navigation.navigate('recordNotif',{name:name,data:datax});
  }, []);
  return (
    <View><Text>Pls close the app</Text></View>
  )

}

export default function App() {
  initAuthToken();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [data, setData] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      datax = response.notification.request.content.data;
      setData(response.notification.request.content.data);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  console.log(data);
  return (
    <NavigationContainer>
    {isLoggedIn?(!data?(
      <Stack.Navigator initialRouteName="loading">
                 
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="loading" component={LoadingHomes} options={{ title:"Home", headerShown:false}}/>
          <Stack.Screen name="signup" component={Signup} options={{ title:"SignUp", headerShown: true}}/>
          
          </Stack.Navigator>
          ):
          (
          <Stack.Navigator initialRouteName="recordNotif">         
            <Stack.Screen 
          component={RecordScreen}
          name="Record" options={{ title:"Exit"}}
        />
        <Stack.Screen 
          component={Record}
          name="recordNotif" options={{ title:"Confirm Receipt of Reminder"}}
        />
          
          </Stack.Navigator>
          ) 
        ): (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="signup" component={Signup} options={{ title:"SignUp", headerShown: true}}/>
          <Stack.Screen name="loading" component={LoadingHomes} options={{ title:"Home", headerShown: false}}/>
        </Stack.Navigator>
        )}     
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
