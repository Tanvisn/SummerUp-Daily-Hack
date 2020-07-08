import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';


const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const wantedGraphicData = [{ x:'hi',y: 1 }, { x:'hello',y: 7 }, { x:'hola',y: 4 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

export default class Home extends React.Component {
 // const [graphicData, setGraphicData] = useState(defaultGraphicData);

  constructor(props){
    super(props);
    this.state={
      graphicData:defaultGraphicData,
    }
  }
 
  componentDidMount(){
    this.setState({graphicData:wantedGraphicData});
  }

  render(){
  return (
    <View style={styles.container}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={this.state.graphicData}
        width={300}
        height={300}
        colorScale={graphicColor}
        innerRadius={0}
      />
    </View>
  );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
