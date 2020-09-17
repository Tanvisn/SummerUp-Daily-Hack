import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image, Button} from 'react-native';
import Constants from 'expo-constants';
import { Card, CardItem } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { VictoryPie } from 'victory-native';
import Svg, { Circle, Rect } from 'react-native-svg';

const graphicColor = ['#ef476f', '#ee964b', '#ffd166',  '#06d6a0', '#118ab2', '#073b4c']; // Colors
const wantedGraphicData = [{ y: 10, label:"10%" }, { y: 20, label:"R" }, { y: 25, label:"F" }, { y: 10, label:"M" }, { y: 20, label:"T" }, { y: 30, label:"O" },]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 10 }, { y: 100 }]; // Data used to make the animate prop work

export default class Pie extends React.Component {
  constructor(props){
    super(props);
    this.state={
      graphicData:this.props.data,
      exp:this.props.exp,
    }
  }
 
  componentDidMount(){
    
  }
  render() {
    console.log(this.props.exp);
    console.log("pie");
    return (
      <View style={styles.container}>
      <View style={{ top:20, position: 'absolute', }}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={this.state.graphicData}
        width={400}
        height={400}
        colorScale={graphicColor}
        innerRadius={80}
      />

      <View style={{ bottom: 170, left: 160, position: 'absolute', }}>
      <Text style={{ fontSize:18, fontWeight:"bold" }}>Expenses</Text>
      <Text style={{ fontSize:18, fontWeight:"bold" }}>{this.state.exp}</Text>
      </View>
      </View>

      <View style={{ position: 'absolute', top:450, left:80, }}>
      <View style={{ flexDirection:"row", }}>
      
       <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#e63946" />
    </Svg>
      <View style={{ right: 140, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Shopping</Text>
      </View>
      </View>
      <View style={{ flexDirection:"row", }}>
      
        <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#ee964b" />
    </Svg>
      <View style={{ right: 140, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Restaurant</Text>
      </View>
      </View>
      <View style={{ flexDirection:"row", }}>
      
        <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#ffd166" />
    </Svg>
      <View style={{ right: 140, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Fuel</Text>
      </View>
      </View>
      </View>



       <View style={{ position: 'absolute', top:450, left:220, }}>
       <View style={{ flexDirection:"row", }}>
      
       <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#06d6a0" />
    </Svg>
      <View style={{ right: 120, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Medical</Text>
      </View>
      </View>

      <View style={{ flexDirection:"row", }}>
      
        <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#118ab2" />
    </Svg>
      <View style={{ right: 120, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Travel</Text>
      </View>
      </View>

      <View style={{ flexDirection:"row", }}>
      
        <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#073b4c" />
    </Svg>
      <View style={{ right: 120, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Other</Text>
      </View>
      </View>
      </View>
      



    

      
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
      padding: 8,
      //backgroundColor: 'rgba(202, 240, 248, 0.3)',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    nameText: {
      fontSize: 20,
      fontWeight: '400',
    },

    footer: {
      position: 'absolute',
      bottom: 20,
      left: 10,
      right: 10,
      zIndex: 10,
      top: 380,
      flexDirection: 'row',
      justifyContent: 'center',

    },
  });
