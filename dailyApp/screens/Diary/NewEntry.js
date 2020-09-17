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
  Platform } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import { url } from './../../components/url';

export default class NewEntry extends React.Component{
  constructor(props){
    super(props);
    this.state={
      editMode: true,
      isDatePickerVisible: false,
      key:0,
      date: "",
      title: "",
      text:"",
      called:false,
    };
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    
  }

  hideDatePicker(){
    this.setState({ isDatePickerVisible: false});
  };

  handleConfirm(date) {
    this.hideDatePicker();
  //  console.log(moment('2020-06-22').format('Do MMM YYYY'));
    this.setState({ date:moment(date).format('Do MMMM YYYY'), called:false});
  };

  handleTitleChange(e){
    console.log(e.nativeEvent.text);
    this.setState({ title: e.nativeEvent.text, called:false});
  }

  handleTextChange(e){
    console.log(e.nativeEvent.text);
    this.setState({ text: e.nativeEvent.text, called:false});
  }

  edit(){
    //console.log(this.editMode);
    this.setState({editMode : !(this.state.editMode)});
  }

  save(){
    console.log(this.props.route);
    console.log(this.state.title);

/*    if(Platform.OS === 'ios' || Platform.OS === 'android'){
      this.edit();
      this.props.route.params.beforeGoBack();
      if(this.props.route.params.edit){
        this.props.navigation.goBack();
      }
    }
    else{
*/    //send to backend
    if(this.state.called){}
        else{
    fetch(url+'/saveEntry',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        edit:(!(this.props.route.params.edit))+1,
        key:this.state.key,
        name:this.props.route.params.name,
        date:this.state.date,
        title:this.state.title,
        text:this.state.text
      })
    })

    //recieve entry added confirmation from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      console.log(res);
      //Alert.alert(res.message);
      //if entry added
      if(res.success === true){
        alert(res.message);
        this.edit();
    //    this.props.route.params.beforeGoBack();
    this.setState({called:true});
        if(this.props.route.params.edit){
          this.props.navigation.navigate('Diary');
        }
      }
      else {
        alert(res.message);
        console.log("error");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
    }
    //this.props.navigation.navigate('Diary',{key: this.state.key, date:this.state.date,title:this.state.title});
    
  }

  componentDidMount(){
    this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
        console.log('blur entry page');
        if(this.state.date!=="" && (this.state.title!=="" || this.state.text!=="")){
          this.save();
        }
    });
    if(!this.props.route.params.edit){
      console.log(this.props.route.params);
    this.setState({
      editMode:this.props.route.params.edit,
      key: this.props.route.params.key,
      date:this.props.route.params.date,
      title:this.props.route.params.title,
      text:this.props.route.params.text,
      called:true,
    });
    }
    else{
      this.setState({key: this.props.route.params.key, date:this.props.route.params.date});
    }

  }

  componentWillUnmount(){
    this._unsubscribeSiBlur();
  }

  render(){
    console.log("start");
  
  return (
    <ImageBackground
        source={require('../../assets/diaryBackground.png')  
          
        }
        style={styles.back}
        >
        <View style={styles.container}>

        <Text style={styles.title}>Daily Diary</Text>

        <TouchableOpacity onPress={() => this.state.editMode?(this.setState({ isDatePickerVisible: true})):null}>
        <TextInput style={styles.textinput} placeholder="Today's Date" 
        placeholderTextColor="rgba(5,4,4,0.6)"
        underlineColorAndroid={'transparent'} 
        editable={false}
        value={this.state.date}
        onTouchStart={() => this.state.editMode?(this.setState({ isDatePickerVisible: true})):null}
        />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={() => this.setState({ isDatePickerVisible: false})}
        />
        <TextInput style={styles.textinput} placeholder={this.state.editMode?("Title"):null} 
        placeholderTextColor="rgba(5,4,4,0.6)"
        underlineColorAndroid={'transparent'} 
        value={this.state.title}
        editable={this.state.editMode}
        onChange = {this.handleTitleChange}
        />
        <TextInput style={styles.textinputDiary} placeholder="Share your thoughts" 
        placeholderTextColor="rgba(5,4,4,0.6)" multiline={true}
        underlineColorAndroid={'transparent'} 
        editable={this.state.editMode}
        value={this.state.text}
        onChange = {this.handleTextChange}
        />
        {this.state.editMode?(
        <TouchableOpacity style={styles.button} onPress={this.save}>
          <Text style={styles.btntext}>Save</Text>
        </TouchableOpacity>):
        (<TouchableOpacity style={styles.button} onPress={this.edit}>
          <Text style={styles.btntext}>Edit</Text>
        </TouchableOpacity>)}
        </View>
        </ImageBackground>

  );
}
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.4)',
      justifyContent: 'center',
      paddingLeft: 60,
      paddingRight: 60,
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
      alignSelf: 'stretch',
      height: 40,
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
      backgroundColor: 'rgba(255,255,255,0.6)',
      alignSelf: 'stretch',
      height: 300,
      marginBottom: 30,
      borderColor: 'black',
      borderWidth: 1,
    
      borderRadius: 5,
      textAlignVertical: "top",
      padding: 10,
    },
    back: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#2BA189',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
    }
  });