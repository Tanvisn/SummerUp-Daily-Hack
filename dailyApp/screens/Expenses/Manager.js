import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image, Button} from 'react-native';
import Constants from 'expo-constants';
import { Card, CardItem } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { VictoryPie } from 'victory-native';


const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const wantedGraphicData = [{ y: 1 }, { y: 7 }, { y: 4 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

export default class Manager extends React.Component {
  constructor(props){
    super(props);
    this.state={
      graphicData:defaultGraphicData,
    }
  }
 
  componentDidMount(){
    this.setState({graphicData:wantedGraphicData});
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{paddingTop:0, paddingBottom:300, paddingLeft:50}}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={this.state.graphicData}
        width={300}
        height={300}
        colorScale={graphicColor}
        innerRadius={0}
      />
    </View>
      <Text style={styles.paragraph}>
      
      </Text>
      <View style={styles.footer}>
      <Grid>
      <Row>
      
      <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginBottom: 10, marginRight: 10, justifyContent: 'center',}}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Income')}>
      <View style={{ alignItems: 'center', }}>
      <Image
      source={require('../../assets/payment-min.png')}

      style={{
        width: 110,
        height: 110,

      }}
      />
      <Text style={styles.nameText}>Add Income</Text>
      </View>
      </TouchableOpacity>
      </Col>
      
      <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginBottom: 10, justifyContent: 'center',}}>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('Expenditure')}>
      <View style={{ alignItems: 'center', justifyContent: 'center',}}>
      <Image
      source={require('../../assets/pay-min.png')}

      style={{
        width: 110,
        height: 110,

      }}
      />
      <Text style={styles.nameText}>Add Expenses</Text>
      </View>
      </TouchableOpacity>
      </Col>
      </Row>
      <Row>
      <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginRight: 10, justifyContent: 'center',}}>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('Reports')}>
      <View style={{ alignItems: 'center', justifyContent: 'center',}}>
      <Image
      source={require('../../assets/bar-chart-min.png')}

      style={{
        width: 110,
        height: 110,

      }}
      />
      <Text style={styles.nameText}>Reports</Text>
      </View>
      </TouchableOpacity>
      </Col>
      <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, justifyContent: 'center',}}>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('AllTrans')}>
      <View style={{ alignItems: 'center', justifyContent: 'center',}}>
      <Image
      source={require('../../assets/note-min.png')}

      style={{
        width: 110,
        height: 110,
        left: 15,
      }}
      />
      <Text style={styles.nameText}>All Transactions</Text>
      </View>
      </TouchableOpacity>
      </Col>
      </Row>
      </Grid>
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