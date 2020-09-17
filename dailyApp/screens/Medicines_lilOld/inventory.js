import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';

export default class Inventory extends React.Component {

  constructor(props){
    super(props);
    this.state={
      curr: 15,
      rem: 5,
      each: 1,
      name: "",
    };
    this.changeNumCurr = this.changeNumCurr.bind(this);
    this.changeNumRem = this.changeNumRem.bind(this);
    this.changeNumEach = this.changeNumEach.bind(this);
  }

  changeNumCurr = (n) => {
    this.setState({ curr: this.state.curr + n});
  }

  changeNumRem = (n) => {
    this.setState({ rem: this.state.rem + n});
  }

   changeNumEach = (n) => {
    this.setState({ each: this.state.each + n});
  }

  render() {
    return (
      <View style={styles.container}>

      <TextInput style={styles.textinput} placeholder="Name of the Medicine" 
      placeholderTextColor="#1e555c"
      underlineColorAndroid={'transparent'} 
      value={this.state.name}
      onChange = {(e)=>this.setState({ name: e.nativeEvent.text})}/>



      <Text style={styles.paragraph}>
      Current Inventory
      </Text>

      <View>

      <View style={{ left: 150, }}>
      <TextInput style={{
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        color: 'black',
        borderBottomWidth: 1,
        width: 100,
        borderBottomColor: '#1e555c',
      }}>
      {this.state.curr}
      </TextInput>
      </View>

      <TouchableOpacity style={{
        position:'absolute',
        right:120,
        top: 5
      }}
      onPress={() => this.changeNumCurr(+1)}>
      <AntDesign name="pluscircle" size={26} color="#1e555c" />
      </TouchableOpacity>

      <TouchableOpacity style={{
        position:'absolute',
        right:250,
        top: 5
      }}
      onPress={() => this.changeNumCurr(-1)}>
      <AntDesign name="minuscircle" size={26} color="#1e555c" />
      </TouchableOpacity>

      </View>

      <Text style={styles.paragraph}>
      Pill(s)
      </Text>

      <Text style={styles.paragraph}>
      Pill(s) taken in one dose
      </Text>

      <View>

      <View style={{ left: 150, }}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        color: 'black',
        borderBottomWidth: 1,
        width: 100,
        borderBottomColor: '#1e555c',
        marginBottom: 20,
      }}>
      {this.state.each}
      </Text>
      </View>

      <TouchableOpacity style={{
        position:'absolute',
        right:120,
        top: 5
      }}
      onPress={() => this.changeNumEach(+0.25)}>
      <AntDesign name="pluscircle" size={26} color="#1e555c" />
      </TouchableOpacity>

      <TouchableOpacity style={{
        position:'absolute',
        right:250,
        top: 5
      }}
      onPress={() => this.changeNumEach(-0.25)}>
      <AntDesign name="minuscircle" size={26} color="#1e555c" />
      </TouchableOpacity>

      </View>


      <Text style={styles.paragraph}>
      Remind me when
      </Text>

      <View>

      <View style={{ left: 150, }}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        color: 'black',
        borderBottomWidth: 1,
        width: 100,
        borderBottomColor: '#1e555c',
      }}>
      {this.state.rem} &nbsp;
      </Text>
      </View>

      <TouchableOpacity style={{
        position:'absolute',
        right:120,
        top: 5
      }}
      onPress={() => this.changeNumRem(+1)}>
      <AntDesign name="pluscircle" size={26} color="#1e555c" />
      </TouchableOpacity>

      <TouchableOpacity style={{
        position:'absolute',
        right:250,
        top: 5
      }}
      onPress={() => this.changeNumRem(-1)}>
      <AntDesign name="minuscircle" size={26} color="#1e555c" />
      </TouchableOpacity>

      </View>

      <Text style={styles.paragraph}>
      pill(s) are remaining
      </Text>


      <TouchableOpacity style={styles.button}>
      <Text style={styles.btntext}>Set a Reminder</Text>
      </TouchableOpacity>
      
      
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e555c',
  },

  textinput: {
      color: 'black',
      fontSize: 18,
      alignSelf: 'stretch',
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 10,
      width: 300,
      left: 40,
      borderRadius: 5,
      textAlignVertical: "top",
      //backgroundColor: 'rgba(30, 85, 92,0.1)',
      borderBottomColor: '#1e555c',
      borderBottomWidth: 2,
    },


  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e555c',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    left: 100,
    top: 40,
  },

  btntext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
  },

});