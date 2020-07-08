import * as React from 'react';
import * as RN from 'react-native';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
class MyCalendar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      activeDate: new Date(),
    };
  }


  months = ["January", "February", "March", "April", 
  "May", "June", "July", "August", "September", "October", 
  "November", "December"];

  weekDays = [
  "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
  ];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];



  changeMonth = (n) => {
    this.setState(() => {
      this.state.activeDate.setMonth(
        this.state.activeDate.getMonth() + n
        )
      return this.state;
    });
  }

  generateMatrix() {
    var matrix = [];
    // Create header
    matrix[0] = this.weekDays;

    // More code here
    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = this.nDays[month];
  if (month == 1) { // February
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }
var counter = 1;
for (var row = 1; row < 7; row++) {
  matrix[row] = [];
  for (var col = 0; col < 7; col++) {
    matrix[row][col] = " ";
    if (row == 1 && col >= firstDay) {
      // Fill in rows only after the first day of the month
      matrix[row][col] =  counter++;
    } else if (row > 1 && counter <= maxDays) {
      // Fill in rows only if the counter's not greater than
      // the number of days in the month
      matrix[row][col] = counter++;
    }
  }
}
return matrix;

}

_onPress = (item) => {    
  this.setState(() => {
    if (!item.match && item != -1) {
      this.state.activeDate.setDate(item);
      return this.state;
    }
  });
};

render() {

  var matrix = this.generateMatrix();
  var today = this.state.activeDate.getDate();
  return (
    <RN.View
    style={{
      flex: 1,
      padding: 40,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>

    

    <RN.View
    style={{
      width: 500,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingLeft: 15,
      paddingRight: 15,
      alignItems: 'center',
      backgroundColor: '#457b9d',}}>


      <RN.Text style={{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
      }}>
      {this.months[this.state.activeDate.getMonth()]} &nbsp;
      {this.state.activeDate.getFullYear()}
      </RN.Text>
      </RN.View>
      
      <RN.View style={{ 
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: 'rgba(168, 218, 220,0.4)',
      height: 300,
      width: 400,}}>
      <Grid style={{ justifyContent: 'flex-start', alignItems: 'center', padding: 10, left: 10, }}>
      
      <Row style={{ height: 40, paddingRight: 15, justifyContent: 'center', alignItems: 'center',}}>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ color: 'red', fontSize: 18, fontWeight: "bold",}}>
      {matrix[0][0]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18, fontWeight: "bold",}}>
      {matrix[0][1]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18, fontWeight: "bold",}}>
      {matrix[0][2]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18, fontWeight: "bold",}}>
      {matrix[0][3]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18, fontWeight: "bold",}}>
      {matrix[0][4]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18, fontWeight: "bold",}}>
      {matrix[0][5]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18, fontWeight: "bold",}}>
      {matrix[0][6]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      
      </Row>
      
      
      <Row style={{ height: 40, padding: 15, justifyContent: 'center', alignItems: 'center',}}>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ color: 'red', fontSize: 18,}}>
      {matrix[1][0]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[1][1]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[1][2]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[1][3]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[1][4]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[1][5]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[1][6]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      
      </Row>
      <Row style={{ height: 40, padding: 15, justifyContent: 'center', alignItems: 'center',}}>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ color: 'red', fontSize: 18,}}>
      {matrix[2][0]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[2][1]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[2][2]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[2][3]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[2][4]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[2][5]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[2][6]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      
      </Row>
      
      <Row style={{ height: 40, padding: 15, justifyContent: 'center', alignItems: 'center',}}>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ color: 'red', fontSize: 18,}}>
      {matrix[3][0]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[3][1]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[3][2]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[3][3]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[3][4]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[3][5]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[3][6]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      
      </Row>
      
      <Row style={{ height: 40, padding: 15, justifyContent: 'center', alignItems: 'center',}}>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ color: 'red', fontSize: 18,}}>
      {matrix[4][0]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[4][1]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[4][2]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[4][3]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[4][4]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[4][5]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[4][6]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      
      </Row>
      
      <Row style={{ height: 40, padding: 15, justifyContent: 'center', alignItems: 'center',}}>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ color: 'red', fontSize: 18,}} >
      {matrix[5][0]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[5][1]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[5][2]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[5][3]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[5][4]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[5][5]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[5][6]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      
      </Row>

      <Row style={{ height: 40, padding: 15, justifyContent: 'center', alignItems: 'center',}}>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ color: 'red', fontSize: 18, }}>
      {matrix[6][0]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[6][1]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[6][2]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[6][3]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[6][4]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[6][5]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity>
      <RN.Text style={{ fontSize: 18,}}>
      {matrix[6][6]}
      </RN.Text>
      </TouchableOpacity>
      </Col>
      
      </Row>
       </Grid>
      </RN.View>
     

      <RN.View style={styles.footer}>
      <TouchableOpacity 
      style={{ margin: 10}}
      onPress={() => this.changeMonth(-1)}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
      }}>
      Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={{ margin: 10}}
      onPress={() => this.changeMonth(+1)}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
      }}>
      Next</Text>
      </TouchableOpacity>
      </RN.View>
      </RN.View>
      );
    }
  }

  export default class App extends React.Component {
    render() {
      return <MyCalendar/>;
    }
  }


  const styles = StyleSheet.create({
   backBtn: {
    position: 'absolute',
    zIndex: 11,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'rgba(168, 218, 220,0.4)',
  },

  one: {
    color: 'red',
    fontSize: 18,
    fontWeight: "bold",
  },

  two: {
    color: 'red',
    fontSize: 18,
  },

});