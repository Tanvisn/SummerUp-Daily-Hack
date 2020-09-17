import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker, TextInput, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryZoomContainer } from 'victory-native';
import { url } from './../../components/url';
import Pie from './purPie';
import moment from "moment";import { VictoryPie } from 'victory-native';
import Svg, { Circle, Rect } from 'react-native-svg';

export default class Reports extends React.Component {
  constructor(props){
    super(props);
    this.state={
      monthlyTrans:[],
      month:(moment(new Date()).format("YYYY-MM-DD")).substring(5,7),
      year:""+(new Date()).getFullYear(),
      fullData:[],
      pieData:[{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 10 }, { y: 100 }],
    }
    this.generateGraph = this.generateGraph.bind(this);
    this.fetchEntries = this.fetchEntries.bind(this);
    this.createPie = this.createPie.bind(this);
    this.changeData = this.changeData.bind(this);
  }

  changeData(){
    var dd = this.state.fullData.filter(ex => ex._id.month===(this.state.month+"-"+this.state.year))
        dd = dd.filter(ex => ex._id.type==="expenses")
        const exp = dd.reduce((t,i)=> t + i.expenses, 0);
        console.log(exp);
        var data = dd.map((d)=>{
          return({x:d._id.purpose, y:d.expenses})
        })
        //console.warn(data);
        data.sort((a,b)=>(a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0)); 
        this.setState({
          exp,
          pieData:data,
        })
        
  }

  fetchEntries(){
    fetch(url+'/getPieChart',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:this.props.route.params.name,
        month:(this.state.month+"-"+this.state.year),
      })
    })

    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      //Alert.alert(res.message);
      if(res.success === true){
        var dd = res.content.filter(ex => ex._id.month===this.state.month+"-"+this.state.year)
        dd = dd.filter(ex => ex._id.type==="expenses")
        const exp = dd.reduce((t,i)=> t + i.expenses, 0);
        console.log(exp);
        var data = dd.map((d)=>{
          return({x:d._id.purpose, y:d.expenses})
        })
        //console.warn(data);
        data.sort((a,b)=>(a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0)); 
        this.setState({
          fullData:res.content,
          exp,
          pieData:data,
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

  componentDidMount(){
    this.fetchEntries();
    this.setState({
      monthlyTrans:this.props.route.params.monthlyTrans,
    });
  }

months = ["Jan", "Feb", "Mar", "Apr", 
  "May", "Jun", "Jul", "Aug", "Sep", "Oct", 
  "Nov", "Dec"];
 graphicColor = ['#ef476f', '#ee964b', '#ffd166',  '#06d6a0', '#118ab2', '#073b4c'];
  generateGraph(){
    var allYears = this.state.monthlyTrans.map((i) => {
      var year = i._id.month.split("-")[1];
      return(year?year:null)});
    //allYears = ["2020","2020"];
    var years = [...new Set(allYears)];
    years.sort(function(a, b){return (b-a)});
    var graphs = years.map((year) =>{
      var graphData = this.months.map( (m, ind) =>{
        var ex=this.state.monthlyTrans.filter(i => 
            (i._id.month.split("-")[1]===(year) && parseInt(i._id.month.split("-")[0])===(ind+1) && i._id.type==="expenses")
          )[0];
        console.log(ex);
        return({
          x:m, 
          y:(ex?ex.amt:0)
        
        })
      });
        console.log(graphData);
        
      return(
        <VictoryChart
        domainPadding={5}
          theme={VictoryTheme.material}  
          padding={50} 
          containerComponent={
            <VictoryZoomContainer />
          }
        >
        <VictoryLabel text={year} x={200} y={20} textAnchor="middle" />

          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #fff"}
            }}
            data={graphData}
            /*animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}*/
            labels={({ datum }) => datum.y}
            labelComponent={<VictoryLabel />}
          />
        </VictoryChart>

        )
    })
    return graphs;
    
  }

  createPie() {
    console.log(this.props.exp);
    console.log("pie");
    return (
    
     <View>
      <View style={{ top:70, left:30, position: 'absolute', }}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={this.state.pieData}
        width={350}
        height={350}
        colorScale={this.graphicColor}
        innerRadius={70}
        labels={({ datum }) => datum.y}
      />

      <View style={{ bottom: 140, left: 130, position: 'absolute', }}>
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
      <Text style={{ fontWeight:"bold" }}>Fuel</Text>
      </View>
      </View>
      <View style={{ flexDirection:"row", }}>
      
        <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#ee964b" />
    </Svg>
      <View style={{ right: 140, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Medical</Text>
      </View>
      </View>
      <View style={{ flexDirection:"row", }}>
      
        <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#ffd166" />
    </Svg>
      <View style={{ right: 140, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Other</Text>
      </View>
      </View>
      </View>



       <View style={{ position: 'absolute', top:450, left:220, }}>
       <View style={{ flexDirection:"row", }}>
      
       <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#06d6a0" />
    </Svg>
      <View style={{ right: 150, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Restaurant</Text>
      </View>
      </View>

      <View style={{ flexDirection:"row", }}>
      
        <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#118ab2" />
    </Svg>
      <View style={{ right: 150, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Shopping</Text>
      </View>
      </View>

      <View style={{ flexDirection:"row", }}>
      
        <Svg height="50%" width="50%" viewBox="0 0 100 100" 
       >
       <Rect x="120" y="-100" width="200" height="800" strokeWidth="2" fill="#073b4c" />
    </Svg>
      <View style={{ right: 150, bottom:5, }}>
      <Text style={{ fontWeight:"bold" }}>Travel</Text>
      </View>
      </View>
      </View>  
      </View>
      );
    }

  render() {
    console.log(this.props.route.params.monthlyTrans);
    return (
      <View style={styles.container}>
    <ScrollView>
      <View style={{ height:1000}}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', top: 50, }}>
      <View style={styles.dropdown}>
      <Picker mode='dropdown' 
      style={styles.picker} 
      selectedValue={this.state.month}
      onValueChange={(itemValue, itemIndex) => this.setState({ month: itemValue })}>
      <Picker.Item label="Select a Month" value=""/>
      <Picker.Item label=" January" value="01" />
      <Picker.Item label="February" value="02" />
      <Picker.Item label="March" value="03" />
      <Picker.Item label="April" value="04" />
      <Picker.Item label="May" value="05" />
      <Picker.Item label="June" value="06" />
      <Picker.Item label="July" value="07" />
      <Picker.Item label="August" value="08" />
      <Picker.Item label="September" value="09" />
      <Picker.Item label="October" value="10" />
      <Picker.Item label="November" value="11" />
      <Picker.Item label="December" value="12" />
      </Picker>
      </View>

      <TextInput style={styles.textinput} placeholder="Enter a Year" 
      placeholderTextColor="black"
      underlineColorAndroid={'transparent'} keyboardType={'numeric'}
      onChange = {(e)=>this.setState({ year: e.nativeEvent.text})}
      value={""+this.state.year}/>
      </View>

      <TouchableOpacity style={styles.button} onPress={this.changeData}>
      <Text style={styles.btntext}>Get Records  </Text>
      </TouchableOpacity>
      {this.createPie()}
      </View>

      <Text>Expenditure Reports  </Text>
      {this.generateGraph()}
     
      </ScrollView>
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
    backgroundColor: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  picker: {
    height: 50, 
        // width: 220,
        alignSelf: 'stretch',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        //borderRadius: 5,
        //backgroundColor: 'rgba(255,255,255,0.6)',
      },

      dropdown: {
       color: 'black',
       width: 220,
       height: 50,
       paddingTop: 0,
       paddingBottom: 10,
       paddingLeft:0,
       marginTop: 10,
       marginBottom: 20,
       borderColor: 'black',
       borderWidth: 1,
       borderRadius: 5,
       textAlignVertical: "top",
       fontSize: 18,
       left: 20,
       backgroundColor: 'rgba(30, 85, 92,0.1)',
     },

     textinput: {
      color: 'black',
      fontSize: 18,
      width: 130,
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 20,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      textAlignVertical: "top",
      top: 10,
      left: 30,
      backgroundColor: 'rgba(30, 85, 92,0.1)',
    },

    button: {
      width: 250,
      height:60,
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#1e555c',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      top: 60,
      left: 80,
    },

    btntext: {
      color: '#fff',
      fontSize: 20,
      fontWeight: "bold",
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