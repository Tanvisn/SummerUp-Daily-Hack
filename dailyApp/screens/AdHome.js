import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet,Text, View, Button, Image, Platform, Alert, BackHandler } from "react-native";
import { Card, CardItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class AdHome extends React.Component{

  constructor(props){
    super(props);
    this.state={
      name: "",
    }
    this.getFromAsync=this.getFromAsync.bind(this);
    this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    });
    this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
        
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        );
    });
  }
  getFromAsync = async()=>{
    if(Platform.OS === 'ios' || Platform.OS === 'android'){
      const authData = await AsyncStorage.getItem('auth_data');
      if(authData !== null){
        console.log("hi");
        const authDataJson = JSON.parse(authData);
        this.setState({name: authDataJson.name});
      }
    }
    else{
      const authData = localStorage.getItem('auth_data');
      if(authData !== null){
        console.log("hi");
        const authDataJson = JSON.parse(authData);
        this.setState({name: authDataJson.name});
      }
    }     
  }

  async registerForPushNotificationsAsync() {
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
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    this.setState({expoPushToken:token});
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

  handleBackButton = () => {
   Alert.alert(
       'Exit App',
       'Exiting the application?', [{
           text: 'Cancel',
           onPress: () => console.log('Cancel Pressed'),
           style: 'cancel'
       }, {
           text: 'OK',
           onPress: () => BackHandler.exitApp()
       }, ], {
           cancelable: false
       }
    )
    return true;
  } 

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.getFromAsync();
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentDidDisappear(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  render(){
  return (
    <View style={styles.container}>
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
     <Card>
     <View style={{ alignItems: 'center' }}>
     <Image
     source={require('./../assets/diary.png')}

     style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Diary" onPress={() => this.props.navigation.navigate('Diary',{name: this.state.name})}/>
    </Card>

    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/shop.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Shopping" onPress={() => this.props.navigation.navigate('ShoppingHome',{name: this.state.name})}/>
    </Card>
    </View>

    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/med.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Medicines" onPress={() => this.props.navigation.navigate('Medicine',{name: this.state.name})}/>
    </Card>

    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/sports.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Fitness" onPress={() => this.props.navigation.navigate('Sports',{name: this.state.name})}/>
    </Card>

    </View>

    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/events.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Events" onPress={() => this.props.navigation.navigate('EventHome',{name: this.state.name})}/>
    </Card>

    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/expenses.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Expenses" onPress={() => this.props.navigation.navigate('Manager',{name: this.state.name})}/>
    </Card>

    </View>


    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(43,161,137,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
