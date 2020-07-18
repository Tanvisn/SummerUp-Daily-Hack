import 'react-native-gesture-handler';
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
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
  import TimePicker from 'react-native-simple-time-picker';
  import { url } from './../../components/url';

  export default class Income extends React.Component{
    constructor(props){
      super(props);
      this.state={
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        key:0,
        date: "",
        title: "",
        mode: "",
        time: "",
        desc: "",
        edit:true,
        pur: "",
        amt: "",

      };
      this.hideDatePicker = this.hideDatePicker.bind(this);
      this.hideTimePicker = this.hideTimePicker.bind(this);
      this.handleTimeConfirm = this.handleTimeConfirm.bind(this);
      this.handleDateConfirm = this.handleDateConfirm.bind(this);
      this.save = this.save.bind(this);
      this.edit = this.edit.bind(this);
    }

    hideDatePicker(){
      this.setState({ isDatePickerVisible: false});
    };

    hideTimePicker(){
      this.setState({ isTimePickerVisible: false});
    };

    handleDateConfirm(date) {
      this.hideDatePicker();
      this.setState({ date:moment(date).format('DD-MM-YYYY')});
    };


    handleTimeConfirm(time) {
      this.hideTimePicker();
      this.setState({ time:moment(time).format('HH : mm')});
    };

    save(){
      fetch(url+'/expensesUpdate',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        edit: 1,
        key:this.state.key,
        name:this.props.route.params.name,
        date:(this.state.date),
        time:this.state.time,
        pur:this.state.pur,
        desc:this.state.desc,
        cost:this.state.amt,
      })
    })

    //recieve entry added confirmation from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      console.warn(res);
      //Alert.alert(res.message);
      //if entry added
      if(res.success === true){
        alert(res.message);
        this.edit();  
        this.props.navigation.navigate('Manager');
        
      }
      else {
        alert(res.message);
        console.warn("error");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
    }

    edit(){
    //console.log(this.editMode);
      this.setState({edit : !(this.state.edit)});
    }

    componentDidMount(){
      if(!this.props.route.params.edit){
        console.log(this.props.route.params);
      this.setState({
        edit:this.props.route.params.edit,
        key: this.props.route.params.key,
        date:this.props.route.params.date,
        time:this.props.route.params.time,
        amt:this.props.route.params.amt,
        pur:this.props.route.params.pur,
        desc:this.props.route.params.desc,
      });
      }
      else{
        this.setState({key: this.props.route.params.key});
      }
    }

    render(){

      return (
        <View style={styles.container}>

        <View style={styles.header}>
        <Text style={styles.headerText}>- Add Income -</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.navigate('Manager')}>
        <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        </View>
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
        <TouchableOpacity onPress={() => this.setState({ isTimePickerVisible: true})}>
        <TextInput style={styles.textinput} placeholder="Time" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} 
        editable={false}
        value={this.state.time}
        onTouchStart={() => this.setState({ isTimePickerVisible: true})}
        />
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={this.state.isTimePickerVisible}
        mode="time"
        onConfirm={this.handleTimeConfirm}
        onCancel={() => this.setState({ isTimePickerVisible: false})}
        />
        
          <TextInput style={styles.textinput} placeholder="Amount" 
          placeholderTextColor="black"
          underlineColorAndroid={'transparent'} 
          onChange = {(e)=>this.setState({ amt: e.nativeEvent.text})}
          keyboardType={'numeric'}/>
          <TextInput style={styles.textinput} placeholder="Purpose (Shopping, Restaurant, Fuel, Medical, etc)" 
          placeholderTextColor="black"
          underlineColorAndroid={'transparent'} 
          onChange = {(e)=>this.setState({ pur: e.nativeEvent.text})}
          />
          <TextInput style={styles.textinputDiary} placeholder="Description (Optional)" 
          placeholderTextColor="black" multiline={true}
          underlineColorAndroid={'transparent'} 
          onChange = {(e)=>this.setState({ desc: e.nativeEvent.text})}/>
          <View style={styles.dropdown}>
          <Picker mode='dropdown' 
          style={styles.picker} 
          selectedValue={this.state.mode}
          onValueChange={(itemValue, itemIndex) => this.setState({ mode: itemValue })}>
          <Picker.Item label="Recieved via..." value=""/>
          <Picker.Item label="Net-Banking" value="Nb" />
          <Picker.Item label="G-Pay/PhonePe/Paytm" value="Mb" />
          <Picker.Item label="NEFT" value="Nt" />
          <Picker.Item label="RTGS" value="Rt" />
          <Picker.Item label="Cheque" value="Ch" />
          <Picker.Item label="Other" value="Ot" />
          </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.state.edit?this.save:this.edit}>
          <Text style={styles.btntext}>{this.state.edit?"Save":"Edit"}</Text>
          </TouchableOpacity>
          </View>
          </View>


          );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    input: {
      top: 100,
      paddingLeft: 40,
      paddingRight: 40,
    },

    header: {
      backgroundColor: '#457b9d',
      alignItems: 'center',
      justifyContent: 'center',
      top: 30,
    },

    headerText: {
      color: 'white',
      fontSize: 22,
      padding: 26,
    },

    title: {
      color: '#2BA189',
      fontWeight: 'bold',
      fontSize: 30,
      paddingBottom: 10,
      marginBottom: 40,
      borderBottomColor: 'black',
      borderBottomWidth: 1,

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
       alignSelf: 'stretch',
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
       backgroundColor: 'rgba(255,255,255,0.7)',
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

    textinputDiary: {
      color: 'black',
      fontSize: 18,
      backgroundColor: 'rgba(255,255,255,0.6)',
      alignSelf: 'stretch',
      height: 150,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 1,

      borderRadius: 5,
      textAlignVertical: "top",
      padding: 10,
    },

    button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
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

    backBtn: {
      position: 'absolute',
      zIndex: 11,
      left: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
  });