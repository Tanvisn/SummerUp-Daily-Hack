import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image, Button} from 'react-native';
import Constants from 'expo-constants';
import { Card, CardItem } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { VictoryPie } from 'victory-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { url } from './../../components/url';
import moment from "moment";

const graphicColor = ['#156064', '#e63946']; // Colors
const defaultGraphicData = [{ y: 10 }, { y: 100 }];

export default class Manager extends React.Component {
  constructor(props){
    super(props);
    this.state={
      graphicData:defaultGraphicData,
      monthlyTrans:[],
      inc:0,
      sav:0,
      exp:0,
    }

    this.fetchEntries=this.fetchEntries.bind(this);
    this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
        //console.warn('focus expenditure manager');
        this.fetchEntries();
    });
  }
 componentDidMount(){
//  if(Platform.OS === 'ios' || Platform.OS === 'android'){}
//  else{
    this.focusListener = this.props.navigation.addListener('focus', ()=>{
      this.fetchEntries();
    });
  }
  componentWillUnmount(){
    this.props.navigation.removeListener('focus', this.fetchEntries);
  }

  fetchEntries(){
    fetch(url+'/getMonthlyExpenses',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:this.props.route.params.name,
        
      })
    })

    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      //Alert.alert(res.message);
      if(res.success === true){
        var d=moment(Date.now()).format('MM-YYYY');
        var currMonth=res.content.filter(i => i._id.month===d);
        var inc=currMonth.filter(i=>i._id.type==="income")[0].amt;
        var exp = currMonth.filter(i=>i._id.type==="expenses")[0].amt;
        console.log(currMonth);
        console.log(inc);
        this.setState({
          inc,
          exp,
          sav:(inc - exp),
          graphicData:[{ x:(inc-exp), y:(inc-exp)}, {x:exp, y:exp}],
          monthlyTrans:res.content,
        })
        
      }
      else {
        alert("Something went wrong. Please try again");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
    
  }
  render() {
    console.log(this.props.route.params.name);
    return (
      <View style={styles.container}>
      <View style={{ top:220 }}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={this.state.graphicData}
        width={400}
        height={400}
        colorScale={graphicColor}
        innerRadius={80}
      />

      <View style={{ bottom: 230, left: 170, }}>
      <Text style={{ fontSize:18, fontWeight:"bold" }}>Income</Text>
      <Text style={{ fontSize:18, fontWeight:"bold" }}>{this.state.inc}</Text>
      </View>

    </View>

    

      <View style={{ top:130, left:30 }}>
       <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="15" y="15" width="10" height="10" strokeWidth="2" fill="#e63946" />
    </Svg>
   
    </View>
     <View style={{ bottom:205, left:90, }}>
      <Text style={{ fontWeight:"bold" }}>Expenses</Text>
      </View>


    <View style={{ bottom:248, left:200 }}>
       <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="15" y="15" width="10" height="10" strokeWidth="2" fill="#156064" />
    </Svg>
   
    </View>
     <View style={{ bottom:580, left:260, }}>
      <Text style={{ fontWeight:"bold" }}>Savings</Text>
      </View>
      <Text style={styles.paragraph}>
      
      </Text>
      <View style={styles.footer}>
      <Grid>
      <Row>
      
      <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginBottom: 10, marginRight: 10, justifyContent: 'center',}}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Income',{name:this.props.route.params.name, edit:1, key:Date.now()})}>
      <View style={{ alignItems: 'center', }}>
      <Image
      source={require('../../assets/payment-min.png')}

      style={{
        width: 110,
        height: 110,

      }}
      />
      <Text style={styles.nameText}>Add Income  </Text>
      </View>
      </TouchableOpacity>
      </Col>
      
      <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginBottom: 10, justifyContent: 'center',}}>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('Expenditure',{name:this.props.route.params.name, edit:1, key:Date.now()})}>
      <View style={{ alignItems: 'center', justifyContent: 'center',}}>
      <Image
      source={require('../../assets/pay-min.png')}

      style={{
        width: 110,
        height: 110,

      }}
      />
      <Text style={styles.nameText}>Add Expenses  </Text>
      </View>
      </TouchableOpacity>
      </Col>
      </Row>
      <Row>
      <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, marginRight: 10, justifyContent: 'center',}}>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('Reports',{name:this.props.route.params.name, monthlyTrans:this.state.monthlyTrans})}>
      <View style={{ alignItems: 'center', justifyContent: 'center',}}>
      <Image
      source={require('../../assets/bar-chart-min.png')}

      style={{
        width: 110,
        height: 110,

      }}
      />
      <Text style={styles.nameText}>Reports  </Text>
      </View>
      </TouchableOpacity>
      </Col>
      <Col style={{ borderColor: 'rgb(29, 53, 87)', borderWidth: 2, justifyContent: 'center',}}>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('AllTrans',{name:this.props.route.params.name})}>
      <View style={{ alignItems: 'center', justifyContent: 'center',}}>
      <Image
      source={require('../../assets/note-min.png')}

      style={{
        width: 110,
        height: 110,
        left: 15,
      }}
      />
      <Text style={styles.nameText}>All Transactions  </Text>
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