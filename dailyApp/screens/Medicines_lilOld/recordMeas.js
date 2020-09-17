import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Permissions, Notifications } from 'expo';

const PUSH_REGISTRATION_ENDPOINT = 'http://ddf558bd.ngrok.io/token';
const MESSAGE_ENPOINT = 'http://ddf558bd.ngrok.io/message';

export default class Record extends React.Component {
  state = {
    notification: null,
    messageText: ''
  }

  handleNotification = (notification) => {
    this.setState({ notification });
  }

  handleChangeText = (text) => {
    this.setState({ messageText: text });
  }
/*
  sendMessage = async () => {
    fetch(MESSAGE_ENPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: this.state.messageText,
      }),
    });
    this.setState({ messageText: '' });
  }

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    return fetch(PUSH_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: 'warly',
          name: 'Dan Ward'
        },
      }),
    });

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }
*/
  componentDidMount() {
  }

  renderNotification() {
    return(
      <View style={styles.container}>
        <Text style={styles.label}>A new message was recieved!</Text>
        <Text>{this.state.notification.data.message}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>


        <View style={styles.input}>

        <TextInput style={styles.textinput} placeholder="Type of Measurement" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} />

        <TextInput style={styles.textinput} placeholder="Enter the reading" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} />

        

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
        <Text style={styles.btntext}>Save</Text>
        </TouchableOpacity>
        </View>

        {this.state.notification ?
          this.renderNotification()
        : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: '#f6f6f6',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  button: {
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  label: {
    fontSize: 18
  },
   input: {
      top: 100,
      paddingLeft: 40,
      paddingRight: 40,
    },

    textinput: {
      color: 'black',
      fontSize: 18,
      alignSelf: 'stretch',
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 20,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      textAlignVertical: "top",
      backgroundColor: 'rgba(30, 85, 92,0.1)',
    },

   
    button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1e555c',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
    },
    btntext: {
      color: '#fff',
      fontSize: 20,
      fontWeight: "bold",
    },
});