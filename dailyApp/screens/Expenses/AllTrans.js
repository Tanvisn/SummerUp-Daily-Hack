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
  ActivityIndicator,
  Picker } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import Transac from './ExpList.js';
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
    }

    hideDatePicker(){
      this.setState({ isDatePickerVisible: false});
    };

    handleDateConfirm(date) {
      this.hideDatePicker();
      this.setState({ date:moment(date).format('Do MMMM YYYY')});
    };

    createTrans(){
     return (this.state.transArray.map((val) => {
      console.log("key"+val.key);
      return <Transac key={val.key} val={val}
      view={()=> this.viewEntry(val.key)}/>
    })
     )
   }


   render(){

    return (
      <View style={styles.container}>

      <View style={styles.input}>
      <TouchableOpacity onPress={() => this.setState({ isDatePickerVisible: true})}>
      <TextInput style={styles.textinput} placeholder="Date" 
      placeholderTextColor="black"
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
      <TouchableOpacity style={styles.button}>
      <Text style={styles.btntext}>Get Transactions</Text>
      </TouchableOpacity>
      </View>
      {this.createTrans()}
      </View>
      </View>


      );
    }

    viewEntry(key){
      console.log("view");
      console.log(key);
      var itt=this.state.entryArray.filter(it => it.key===key);
      //get text value from backend
      console.log(this.state.entryArray);
      console.log(itt);
    //var itt = JSON.parse(ittt);
    console.log(itt[0]);
    this.props.navigation.navigate('NewEntry', {edit:false, key:key, date:itt[0].date, title:itt[0].title, text:itt[0].text, name:this.props.route.params.name})
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