import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image, Button} from 'react-native';
import Constants from 'expo-constants';
import { Card, CardItem } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import DialogInput from 'react-native-dialog-input';
export default class Allfeatures extends React.Component {

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
    
    <Text style={styles.paragraph}>

    </Text>
    <View style={styles.footer}>
    <Grid>
    <Row>

    <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginBottom: 10, marginRight: 10, justifyContent: 'center', borderRadius: 120, backgroundColor: '#fff',}}>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllListSports',{name:this.props.route.params.name})}>
    <View style={{ alignItems: 'center', }}>
    <Image
    source={require('../../assets/list.png')}

    style={{
      width: 110,
      height: 110,

    }}
    />
    <Text style={styles.nameText}>All Lists </Text>
    </View>
    </TouchableOpacity>
    </Col>

    <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginBottom: 10, justifyContent: 'center', borderRadius: 120, backgroundColor: '#fff',}}>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('StopWatch')}>
    <View style={{ alignItems: 'center', justifyContent: 'center',}}>
    <Image
    source={require('../../assets/stop-watch.png')}

    style={{
      width: 110,
      height: 110,

    }}
    />
    <Text style={styles.nameText}>Stop Watch  </Text>
    </View>
    </TouchableOpacity>
    </Col>
    </Row>
    <Row>
    <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginRight: 10, justifyContent: 'center', borderRadius: 120, backgroundColor: '#fff',}}>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Timer')}>
    <View style={{ alignItems: 'center', justifyContent: 'center',}}>
    <Image
    source={require('../../assets/timer.png')}

    style={{
      width: 110,
      height: 110,

    }}
    />
    <Text style={styles.nameText}>Timer </Text>
    </View>
    </TouchableOpacity>
    </Col>
    <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, justifyContent: 'center', borderRadius: 120, backgroundColor: '#fff',}}>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Diet')}>
    <View style={{ alignItems: 'center', justifyContent: 'center', left: 5, }}>
    <Image
    source={require('../../assets/food.png')}

    style={{
      width: 110,
      height: 110,
        //left: 15,
      }}
      />
      <Text style={styles.nameText}>Health </Text>
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
      bottom: 200,
      left: 10,
      right: 10,
      zIndex: 10,
      top: 150,
      flexDirection: 'row',
      justifyContent: 'center',

    },
  });