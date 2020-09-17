import 'react-native-gesture-handler';
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
   ScrollView,
  ActivityIndicator,
  Picker } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import Transac from './ExpList.js';
  import { url } from './../../components/url';

  export default class NewEntry extends React.Component{
    constructor(props){
      super(props);
      this.state={
        isDatePickerVisible: false,
        key:0,
        date: "",
        transArray:[],
      };
      this.hideDatePicker = this.hideDatePicker.bind(this);
      this.handleDateConfirm = this.handleDateConfirm.bind(this);
      this.createTrans = this.createTrans.bind(this);
      this.getAllTrans = this.getAllTrans.bind(this);
      this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
        //console.warn('focus all trans');
        if(this.state.date!==""){ 
          this.getAllTrans();
        }
    });
    }

    hideDatePicker(){
      this.setState({ isDatePickerVisible: false});
    };

    handleDateConfirm(date) {
      this.hideDatePicker();
      this.setState({ date:moment(date).format('DD-MM-YYYY')});
    };

    createTrans(){
      console.log(this.state.transArray);
     return (this.state.transArray.map((val) => {
      console.log("key"+val.key);
      return <Transac key={val.key} val={val}
      view={()=> this.viewEntry(val.key)}/>
    })
     )
   }
   getAllTrans(){
    fetch(url+'/getAllExpenseEntries',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.props.route.params.name,
        date: this.state.date
    })
    })

    //recieve login confirmation and age from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      if(res.success){
      this.setState({transArray:res.content[0].expense[0].contents});
      }
      else{
        alert("Couldn't fetch data. Please try again.");
      }
      //Alert.alert(res.message);
      
    })
    
    .catch(err => {
      console.log(err);
    });
   }

   componentDidMount(){
//  if(Platform.OS === 'ios' || Platform.OS === 'android'){}
//  else{
    this.focusListener = this.props.navigation.addListener('focus', ()=>{
      if(this.state.date!==""){ 
          this.getAllTrans();
        }
    });
  }
  componentWillUnmount(){
    this.props.navigation.removeListener('focus', this.getAllTrans);
  }

   render(){
    return (
      <View style={styles.container}>

      <ScrollView>

      <View style={styles.input}>
      <TouchableOpacity onPress={() => this.setState({ isDatePickerVisible: true})}>
      <TextInput style={styles.textinput} placeholder="Date" 
      placeholderTextColor="grey"
      underlineColorAndroid={'transparent'} 
      editable={false}
      value={this.state.date}
      onTouchStart={() => this.setState({ isDatePickerVisible: true})}
      />
      </TouchableOpacity>

      <DateTimePickerModal
      isVisible={this.state.isDatePickerVisible}
      mode="date"
      onConfirm={this.handleDateConfirm}
      onCancel={() => this.setState({ isDatePickerVisible: false})}
      />

      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
      <TouchableOpacity style={styles.button} onPress={this.getAllTrans}>
      <Text style={styles.btntext}>Get Transactions  </Text>
      </TouchableOpacity>
      </View>
      {this.createTrans()}
      </View>

      </ScrollView>

      </View>


      );
    }

    viewEntry(key){
      console.log("view");
      console.log(key);
      var itt=this.state.transArray.filter(it => it.key===key);
      console.log(this.state.transArray);
      console.log(itt);
    console.log(itt[0].cost);
    if(itt[0].type==="income"){
      this.props.navigation.navigate('Income', {edit:false, trans:itt[0], date:this.state.date, name:this.props.route.params.name});
    }
    else{
      this.props.navigation.navigate('Expenditure', {edit:false, trans:itt[0], date:this.state.date, name:this.props.route.params.name});
    }
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  input: {
    top: 40,
    paddingLeft: 20,
    paddingRight: 20,
    height:1000,
  },

  textinput: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'stretch',
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:10,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: "top",
    backgroundColor: 'rgba(255,255,255,0.6)',
  },

  button: {
    width: 300,
    height: 50,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#457b9d',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },

  btntext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
  },

});