import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image, Button} from 'react-native';
import Constants from 'expo-constants';
import { Card, CardItem } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import DialogInput from 'react-native-dialog-input';
export default class Diet extends React.Component {

 constructor(props){
  super(props);
  this.state = {
    isDialogVisible: false,
  }
}

showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }


render() {
  return (
    <View style={styles.container}>
    
    <View style={styles.footer}>
    <Grid >
    <Col style={{ alignItems: 'center', justifyContent: 'center',}}>

    <Row style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginBottom: 10, justifyContent: 'center', backgroundColor: '#fff',
    width: 300, height: 230,}}>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Food')}>
    <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, left: 5,}}>
    <Image
    source={require('../../assets/diet2.png')}

    style={{
      width: 110,
      height: 110,
      marginBottom: 10,
    }}
    />
    <Text style={styles.nameText}>My Palate</Text>
    <Text style={styles.subtext}>Make it more heaithy...</Text>
    </View>
    </TouchableOpacity>
    </Row>

    <Row style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginBottom: 10, justifyContent: 'center', backgroundColor: '#fff',
    width: 300, height: 230,}}>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Water')}>
    <View style={{ alignItems: 'center', justifyContent: 'center', top: 20, }}>
    <Image
    source={require('../../assets/water.png')}

    style={{
      width: 110,
      height: 110,
      marginBottom: 10,
    }}
    />
    <Text style={styles.nameText}>Keep Yourself Hydrated</Text>
    <Text style={styles.subtext}>Tips to maintain water balance</Text>
    </View>
    </TouchableOpacity>
    </Row>

    <Row style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, justifyContent: 'center', backgroundColor: '#fff',
    width: 300, height: 230,}}>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Sleep')}>
    <View style={{ alignItems: 'center', justifyContent: 'center', top: 30,}}>
    <Image
    source={require('../../assets/sleep.png')}

    style={{
      width: 110,
      height: 110,

    }}
    />
    <Text style={styles.nameText}>Sleep well</Text>
    <Text style={styles.subtext}>How to get better sleep?</Text>
    </View>
    </TouchableOpacity>
    </Row>
      </Col>
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
    backgroundColor: 'rgba(202, 240, 248, 0.3)',
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
      fontWeight: '700',
    },

    footer: {
      position: 'absolute',
      bottom: 100,
      left: 10,
      right: 10,
      zIndex: 10,
      top: 130,
      flexDirection: 'row',
      justifyContent: 'center',

    },

     subtext: {
      fontSize: 18,
      fontWeight: '200',
    },


  });