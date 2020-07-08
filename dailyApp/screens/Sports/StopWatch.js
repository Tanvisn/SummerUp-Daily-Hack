import React, { Component } from 'react';
//import React in our project
import { StyleSheet,Text,View, TouchableOpacity, TextInput } from 'react-native';
//import all the required components
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
//importing library to use Stopwatch and Timer
import { WebView } from "react-native-webview";
export default class StopWatch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      isTimerStart: false,
      minutes_Counter: '00',
      seconds_Counter: '00',
      hour_Counter: '00',
      startDisable: false,
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  onButtonStart = () => {

    let timer = setInterval(() => {

      var sec = (Number(this.state.seconds_Counter) + 1).toString(),//for stop watch do + 1
      min = this.state.minutes_Counter,
      hr = this.state.hour_Counter;


      if (Number(this.state.seconds_Counter) == 59) {//==59
        min = (Number(this.state.minutes_Counter) + 1).toString();
        sec = '00';//='00'
      }

      if (Number(this.state.minutes_Counter) == 59) {
      if(Number(this.state.seconds_Counter) == 59){//==59
        hr = (Number(this.state.hour_Counter) + 1).toString();
        min = '00';//='00'
      }
    }

    this.setState({
      minutes_Counter: min.length == 1 ? '0' + min : min,
      seconds_Counter: sec.length == 1 ? '0' + sec : sec,
      hour_Counter: hr.length == 1 ? '0' + hr : hr
    });
  }, 1000);
    this.setState({ timer });

    this.setState({startDisable : true})
  }


  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({startDisable : false})
  }


  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      hour_Counter: '00',
    });
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'rgba(202, 240, 248, 0.3)',}}>
      <View style={styles.watchContainer}>
      <Text style={styles.text}>{this.state.hour_Counter} : {this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
      </View>
      <View style={{flexDirection: 'row',}}>
      <TouchableOpacity
      onPress={this.onButtonStart}
      activeOpacity={0.6}
      style={styles.watchButton} 
      disabled={this.state.startDisable} >

      <Text style={styles.watchButtonText}>START</Text>

      </TouchableOpacity>

      <TouchableOpacity
      onPress={this.onButtonStop}
      activeOpacity={0.6}
      style={styles.watchButton} >

      <Text style={styles.watchButtonText}>STOP</Text>

      </TouchableOpacity>

      <TouchableOpacity
      onPress={this.onButtonClear}
      activeOpacity={0.6}
      style={styles.watchButton} 
      disabled={this.state.startDisable} >

      <Text style={styles.watchButtonText}> RESET </Text>

      </TouchableOpacity>
      </View>


   {   /*<View style={styles.footer}>

      <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('Sports')}><Text style={styles.navButtonText}>My Plan</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navButton}><Text style={styles.navButtonTextSpecial}>Stop Watch</Text></TouchableOpacity>    
      <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('Timer')}><Text style={styles.navButtonText}>Timer</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('Fitness')}><Text style={styles.navButtonText}>Fitness</Text></TouchableOpacity>

      </View>
*/}
      </View>
      );
    }
  }
  const handleTimerComplete = () => alert("Custom Completion Function");

  const options = {


    button: {
      backgroundColor: '#e91e63',
    },
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: 8,
    },

    watchContainer: {
      borderColor: 'rgb(29, 53, 87)',
      padding: 5,
      borderWidth: 10,
      borderRadius: 200,
      width: 350,
      height: 350,
      alignItems:'center',
      justifyContent: 'center',
    },

    text: {
      fontSize: 40,
      color: 'black',
      marginLeft: 7,
    },

    navButton: {
      margin: 10,
      marginBottom: 15,
    },

    navButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: 'rgba(29, 53, 87,0.4)',
    },
    navButtonTextSpecial: {
      fontSize: 18,
      fontWeight: "bold",
      color: 'rgb(29, 53, 87)',
    },

    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: 'row',
      justifyContent: 'center',

    },

    watchButton: {
      backgroundColor: "rgb(29, 53, 87)" , 
      margin: 10, 
      padding: 10, 
      borderRadius: 10,
      marginTop: 40,
    },

    watchButtonText: {
      fontSize: 20, 
      marginTop:10, 
      color: "white", 
      justifyContent: 'center',
    },

  });

