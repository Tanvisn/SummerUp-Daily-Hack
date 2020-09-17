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
  Picker,
  ScrollView } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { url } from './../../components/url';
  import TimePicker from 'react-native-simple-time-picker';
  export default class EveNotes extends React.Component{
    constructor(props){
      super(props);
      this.state={
        isStDatePickerVisible: false,
        isEnDatePickerVisible: false,
        isTimePickerVisible: false,
        key:0,
        Stdate: moment(new Date()).format('Do MMMM YYYY'),
        title: "",
        mode: moment(new Date()).format('HH : mm'),
        time: "",
        desc:"",
        edit: true,
        called:false,
      };
      this.hideStDatePicker = this.hideStDatePicker.bind(this);
      this.hideTimePicker = this.hideTimePicker.bind(this);
      this.handleTimeConfirm = this.handleTimeConfirm.bind(this);
      this.handleStDateConfirm = this.handleStDateConfirm.bind(this);
      this.save = this.save.bind(this);
      this.edit = this.edit.bind(this);
      this.delete = this.delete.bind(this);
    }

    hideStDatePicker(){
      this.setState({ isStDatePickerVisible: false});
    };

    hideTimePicker(){
      this.setState({ isTimePickerVisible: false});
    };

    handleStDateConfirm(Stdate) {
      this.hideStDatePicker();
      this.setState({ Stdate:moment(Stdate).format('Do MMMM YYYY'), called:false});
    };

    edit(){
      //console.log(this.editMode);
      this.setState({edit : !(this.state.edit)});
    }

    handleTimeConfirm(time) {
      this.hideTimePicker();
      this.setState({ time:moment(time).format('HH : mm'), called:false});
    };

    save(){
      if(this.state.called){}
        else{
      fetch(url+'/notes',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          edit:(!(this.props.route.params.edit))+1,
          key:this.state.key,
          userName:this.props.route.params.name,
          date:this.state.Stdate,
          time:this.state.time,
          title:this.state.title,
          yourNotes:this.state.desc
        })
      })

      //recieve entry added confirmation from backend
      .then((response) => (response.json()))
      
      .then((res) => {
        console.log("response");
        //console.warn(res);
        //Alert.alert(res.message);
        //if entry added
        if(res.success === true){
          alert(res.message);
          this.edit();
      //    this.props.route.params.beforeGoBack();
      this.setState({called:true});
            this.props.navigation.navigate('EventHome');
        }
        else {
          alert(res.message);
          //console.warn("error");
        }
      })
      
      .catch(err => {
        console.log(err);
      });
    }
    }
    delete(){
      fetch(url+'/notes',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        edit: 3,
        key:this.state.key,
        userName:this.props.route.params.name,
        date:(this.state.date),

      })
    })

    //recieve entry added confirmation from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      //Alert.alert(res.message);
      //if entry added
      if(res.success === true){
        alert(res.message);
        this.props.navigation.navigate('EventHome');
        
      }
      else {
        alert(res.message);
        //console.warn("error");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
    }

    componentDidMount(){
      this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
        console.log('blur Event notes page');
        if(this.state.Stdate!=="" && (this.state.title!=="" || this.state.desc!=="")){
          this.save();
        }
      });
      if(!this.props.route.params.edit){
        console.log(this.props.route.params);
      this.setState({
        edit:this.props.route.params.edit,
        key: this.props.route.params.data.key,
        Stdate:this.props.route.params.data.date,
        title:this.props.route.params.data.title,
        time:this.props.route.params.data.time,
        desc:this.props.route.params.data.yourNotes,
        called:true,
      });
      }
      else{
        this.setState({key: this.props.route.params.key});
      }
    }

    componentWillUnmount(){
      this._unsubscribeSiBlur();
    }

    render(){

      return (

         <ImageBackground
        source={require('../../assets/eveBackground.png')}
        style={styles.back}
        >
        <View style={styles.container}>
        <ScrollView>
        {!(this.props.route.params.edit) && <TouchableOpacity style={styles.delBtn} onPress={this.delete}>
        <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>}
        <View style={styles.input}>

        <TextInput style={styles.textinput} placeholder="Note Title" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'}  
        onChange = {(e)=>this.setState({ title: e.nativeEvent.text, called:false})}
        value={this.state.title}
        editable={this.state.edit}/>

        <TouchableOpacity onPress={() => this.state.edit?(this.setState({ isStDatePickerVisible: true})):null}>
        <TextInput style={styles.textinput} placeholder="Date" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} 
        editable={false}
        value={this.state.Stdate}
        />
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={this.state.isStDatePickerVisible}
        mode="date"
        onConfirm={this.handleStDateConfirm}
        onCancel={() => this.setState({ isStDatePickerVisible: false})}
        />


        <TouchableOpacity onPress={() => this.state.edit?(this.setState({ isTimePickerVisible: true})):null}>
        <TextInput style={styles.textinput} placeholder="Time" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} 
        editable={false}
        value={this.state.time}
        />
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={this.state.isTimePickerVisible}
        mode="time"
        onConfirm={this.handleTimeConfirm}
        onCancel={() => this.setState({ isTimePickerVisible: false})}
        />
        
        <TextInput style={styles.textinputDiary} placeholder="Your Notes" 
        placeholderTextColor="black" multiline={true}
        underlineColorAndroid={'transparent'} 
        value={this.state.desc}
        onChange={(e)=>this.setState({desc:e.nativeEvent.text, called:false})}
        editable={this.state.edit}/>
        {this.state.edit?(
        <TouchableOpacity style={styles.button} onPress={this.save}>
          <Text style={styles.btntext}>Save  </Text>
        </TouchableOpacity>):
        (<TouchableOpacity style={styles.button} onPress={this.edit}>
          <Text style={styles.btntext}>Edit  </Text>
        </TouchableOpacity>)}
        </View>
        </ScrollView>
        </View>
         </ImageBackground>
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.3)',
    },

    input: {
      top: 100,
      paddingLeft: 40,
      paddingRight: 40,
      height: 600,
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
      backgroundColor: '#ededfd',
    },

    textinputDiary: {
      color: 'black',
      fontSize: 18,
      backgroundColor: '#ededfd',
      alignSelf: 'stretch',
      height: 150,
      marginBottom: 20,
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
      backgroundColor: '#3D348B',
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

     back: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });