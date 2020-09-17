import * as React from 'react';
import * as RN from 'react-native';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import moment from "moment";

export default class MyCalendar extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      activeDate: new Date(),
      entryArray: this.props.entryArray,
      dots: [],
    };
  }


  months = ["January", "February", "March", "April", 
  "May", "June", "July", "August", "September", "October", 
  "November", "December"];

  weekDays = [
  "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
  ];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  componentDidMount(){
    var a=[];
    for(var i=0;i<=31;i++){
      a.push(false);
    }
  //  this.setState({dots:a});
    this.setState({dots:this.setDots()});
  }


  changeMonth = (n) => {
    var a=this.state.activeDate;
    this.setState(() => {
      this.state.activeDate.setMonth(
        this.state.activeDate.getMonth() + n
        );
      this.state.dots=this.setDots();
      return this.state;
    });
  //  this.setDots();
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
//console.log("hi"+matrix[1][0]+"hi");
//console.log(typeof(matrix[1][0]));
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

dispMatrix(matrix){
  var m = matrix.map((row, k)=>{
    return(
  <Row style={(k===0? styles.dayRow:styles.otherRows)}>
  {row.map((d, ind)=>{
    return(
  <Col>
  <TouchableOpacity disabled={(k===0 || d===' ')?true:false} 
    onPress={()=>this.viewEntry(d, this.state.activeDate.getMonth()+1, this.state.activeDate.getFullYear())}>
    <View>
    <Text style={[(ind===0?(k===0?styles.sun:styles.sunDates) : (k===0?styles.dayRowText:styles.otherRowText)), this.state.dots[d] && styles.dottedDate]}>
     {d}
      </Text>
      {false && <View style={{paddingLeft:10, paddingTop:0}}><Entypo name="dot-single" size={24} color="black" /></View>}
      </View>
      </TouchableOpacity>
      </Col>
      )
  })}
      </Row>
      )
    }
    );
  return m;
}
//
setDots(){
  var a=this.state.entryArray;
  console.log(a);
  var b= a.filter(entry => entry.date.split(" ")[1]===this.months[this.state.activeDate.getMonth()]); //get entries in selected month
  a = b.filter(entry => entry.date.split(" ")[2]===(""+this.state.activeDate.getFullYear())); //get entries in the selected year
  b = a.map(entry => entry.date.split(" ")[0]); //get just the dates
  console.log("dots");
  console.log(b);
  console.log("dots");
  var ind=0;
  var temp=[];
  for(var i=0;i<=31;i++){
    temp.push(false);
  }
  for(var i=0;i<b.length;i++){
    console.log(b[i]);
    ind = (b[i].length===3)?(b[i].substring(0,1)):(b[i].substring(0,2));
    console.log(ind);
    temp[ind]=true;
  }
  return temp;
}

viewEntry(d,m,y){
  var mydate="";
  if(m<10 && d<10){
  mydate=(y+'-0'+m+'-0'+d); 
  } 
  else if(m<10){
  mydate=(y+'-0'+m+'-'+d);
  }
  else if(d<10){
  mydate=(y+'-'+m+'-0'+d);
  }
  else{
  mydate=(y+'-'+m+'-'+d);
  }
  if(this.state.dots[d]){
    var itt = this.state.entryArray.filter(entry => (entry.date.split(" ")[1]===this.months[m-1]));
    var it = itt.filter(entry => entry.date.split(" ")[2]===(""+y));
    itt = it.filter(entry => ((entry.date.substring(0,2)===(""+d)) || ((entry.date.substring(0,1)===(""+d) && d<10))));
    this.props.navigation.navigate('NewEntry', {edit:false, key:itt[0].key, date:itt[0].date, title:itt[0].title, text:itt[0].text, name:this.props.route.params.name});
  }
  else{
    mydate=moment(mydate).format('Do MMMM YYYY')
    this.props.navigation.navigate('NewEntry', {edit:true, key:Date.now(), date:mydate, name:this.props.route.params.name});
  }
  //get data from backend
  //this.props.navigation.navigate('NewEntry', {edit:false, key:key, date:itt[0].date, title:itt[0].title, text:itt[0].text, name:this.props.route.params.name});
}

render() {

  var matrix = this.generateMatrix();
  var today = this.state.activeDate.getDate();
  console.log(this.state.activeDate+"as");
  var hi = this.dispMatrix(matrix);
 //   console.log(this.props.entryArray);
 // console.log("hi");
  
  return (
  <RN.View
    style={{
      flex: 1,
      padding: 0,
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

      <TouchableOpacity style={{
        position:'absolute',
        left:150
      }}
      onPress={() => this.changeMonth(-1)}>
      <AntDesign name="caretleft" size={20} color="white" />
      </TouchableOpacity>
      <RN.Text style={{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
      }}>
      {this.months[this.state.activeDate.getMonth()]} &nbsp;
      {this.state.activeDate.getFullYear()} &nbsp;
      </RN.Text>
      <TouchableOpacity style={{
        position:'absolute',
        right:150
      }}
      onPress={() => this.changeMonth(+1)}>
      <AntDesign name="caretright" size={20} color="white" />
      </TouchableOpacity>
      </RN.View>
    <View style={{ 
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: 'rgba(168, 218, 220,0.4)',
      height: 300,
      width: 400,}}>
    <Grid style={{ justifyContent: 'flex-start', alignItems: 'center', padding: 10, left: 10, }}>
      
      {hi}
      </Grid>
      </View>

      </RN.View>
     
      );
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

  sun: {
    color: 'red',
    fontSize: 18,
    fontWeight: "bold",
  },

  sunDates: {
    color: 'red',
    fontSize: 18,
    paddingLeft: 10,
  },

  three: {
    fontSize: 18,
  },

  dayRowText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  otherRowText: {
    fontSize: 18,
    paddingLeft: 10,
    paddingBottom: 0,
  },
  dayRow: {
    height: 85,
    paddingRight: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  otherRows: {
    height:90, 
    paddingRight: 15, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
  },

  dottedDate: {
    textShadowColor: 'green',
    fontWeight: 'bold',
    textShadowRadius: 10,
    fontSize: 18,
    paddingBottom:10,
  }

});