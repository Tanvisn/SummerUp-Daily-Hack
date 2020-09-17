import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, TextInput, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import { url } from './../components/url';
export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible:false,
      name:"",
      fname:"",
      lname:"",
      email:"",
      age:0,
      edit:false,
      opass:"",
      npass:"",

    }
    this.removeFromAsync = this.removeFromAsync.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.changePass = this.changePass.bind(this);
    this.save = this.save.bind(this);
  }

  openModal = () =>{
    this.setState({
      isModalVisible:true
    })
  }

  toggleModal = () =>{
    this.setState({
      isModalVisible:!this.state.isModalVisible
    })
  }

  toggleEdit = () =>{
    this.setState({
      edit:!this.state.edit
    })
  }

  closeModal = () =>{
    this.setState({
      isModalVisible:false
    })
  }

  changePass(){
    fetch(url+'/resetPassword',{
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName:this.state.name,
        prevPass:this.state.opass,
        newPass:this.state.npass,
      })
    })

    //recieve login confirmation and age from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      console.log(res);
      //Alert.alert(res.message);
      //if login successful
      if(res.success === true){
        this.state.age=3;

        if(Platform.OS === 'ios' || Platform.OS === 'android'){
          this.removeFromAsync();
        }
        else{
          localStorage.clear();
        }
        alert("Please login using your new password");  
        this.props.navigation.reset({
          routes: [{ name: 'Login'}]      
        });
      }
      else {
        alert("Something went wrong. Please try again");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
  }

  save(){
    fetch(url+'/saveProfile',{
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName:this.state.name,
        fName:this.state.fname,
        lName:this.state.lname,
        email:this.state.email,
        age:this.state.ages
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
        this.toggleEdit();
    //    this.props.route.params.beforeGoBack();
        
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

  removeFromAsync = async() =>{
    await AsyncStorage.clear();
  }

  handleSignout(){
    if(Platform.OS === 'ios' || Platform.OS === 'android'){
      this.removeFromAsync();
      this.props.navigation.reset({
        routes: [{ name: 'Login'}]      
      });
    }
    else{
      localStorage.clear();
      this.props.navigation.reset();
    }
  }

  getAuthToken = async () => {
    const authData = await AsyncStorage.getItem('auth_data');

    if(authData !== null){
    //  console.log("hi");
      const authDataJson = JSON.parse(authData);
      age=authDataJson.age;
      name=authDataJson.name;
      console.log(name);
      console.log(authDataJson);
      this.setState({ 
        name: name,
        fname: authDataJson.fname,
        lname: authDataJson.lname,
        age: authDataJson.age,
        email: authDataJson.email,
      });
    }
  }
  componentDidMount(){
    this.getAuthToken();
    
    
  }

  render() {
    return (
      
      <ScrollView>
      <View style={styles.container}>

      <View style={{ alignItems: 'center', }}>
      <Text style={styles.title}>My Profile </Text>
      </View>

      <View style={{marginTop:50}}>
      <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, }}>
    
      <Text style={styles.text}>Username</Text>
      <Text style={ styles.input }>{this.state.name}</Text>
      
      </View>
      
      <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, }}>
      <Text style={styles.text}>First Name</Text>
      <TextInput underlineColorAndroid={'transparent'} style={ styles.input } editable={this.state.edit} value={this.state.fname} onChange={(e)=>this.setState({fname:e.nativeEvent.text})}/>
      </View>

      
    <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, }}>
    <Text style={styles.text}>Last Name</Text>
    <TextInput underlineColorAndroid={'transparent'} style={ styles.input } editable={this.state.edit} value={this.state.lname} onChange={(e)=>this.setState({lname:e.nativeEvent.text})}/>
    </View>

    
    <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, }}>
    <Text style={styles.text}>Email id</Text>
    <TextInput underlineColorAndroid={'transparent'} style={ styles.input } editable={this.state.edit} value={this.state.email} onChange={(e)=>this.setState({email:e.nativeEvent.text})}/>
    </View>

    
    <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, }}>
      <Text style={styles.text}>Age</Text>
      <Text style={ styles.input }>{this.state.age===1?"Below 13":(this.state.age===2?"13-20":(this.state.age===3?"21-60":"Above 60"))}</Text>
      </View>

      <View style={{ right: 10, top: 20, alignItems: 'center', }}>
        <TouchableOpacity style={styles.EditnavButton} onPress={this.state.edit?this.save:this.toggleEdit}>
          <Text style={styles.navButtonTextSpecial}>{this.state.edit?"Save Changes":"Edit Profile"}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ right: 10, top: 20, alignItems: 'center', }}>
      <TouchableOpacity style={styles.EditnavButton} onPress={this.changePass}><Text style={styles.navButtonTextSpecial}>Change Password</Text></TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, }}>

      <TextInput style={ styles.input } 
        underlineColorAndroid="transparent"
        placeholder="Old Password" 
        placeholderTextColor="black"
        autoCapitalize="none"
        secureTextEntry={true} 
        onChange={(e)=>this.setState({opass:e.nativeEvent.text})}/>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, paddingBottom: 90}}>
      
      <TextInput style={ styles.input } 
        underlineColorAndroid="transparent"
        placeholderTextColor="black"
        autoCapitalize="none"
        secureTextEntry={true} 
        placeholder="New Password" 
        onChange={(e)=>this.setState({npass:e.nativeEvent.text})}/>
      </View>

      <Modal animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeModal()} onSwipeComplete={()=>this.closeModal()} swipeDirection="right" isVisible={this.state.isModalVisible} style={{backgroundColor:'white',maxHeight:200, top: 250,}}>
      <View style={{ flex: 1,justifyContent:'flex-start', top: 50,}}>
      <Text style={{textAlign:'center', justifyContent: 'center', fontSize: 20,}}>Are You Sure?</Text>
      </View>
      <View style={{ flex: 1,justifyContent:'center',position:'absolute',bottom:0}}>
      <View style={{flexDirection:'row',}}>
      
      <TouchableOpacity style={{backgroundColor:'rgb(29, 53, 87)',width:'50%', borderColor: 'white', borderWidth: 1,}} onPress={()=>this.closeModal()}>
      <Text style={{color:'white',textAlign:'center',padding:10}}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'rgb(29, 53, 87)',width:'50%', borderColor: 'white', borderWidth: 1,}}
        onPress={this.handleSignout}
      >
      <Text style={{color:'white',textAlign:'center',padding:10}}>Sign Out</Text>
      </TouchableOpacity>
      </View>
      </View>
      </Modal>
      </View>
      
      <View style={styles.footer}>
      <TouchableOpacity style={styles.navButton} onPress={()=>this.openModal()}><Text style={styles.navButtonTextSpecial}>Sign Out</Text></TouchableOpacity>
      </View>
      </View>
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
      padding: 30,
      backgroundColor: 'white',
    },

    text: {
      alignSelf: 'flex-start',
    },
    paragraph: {

      borderColor: 'black',
      borderRadius: 10,
      width: 100,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },

    header: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderBottomWidth: 0,
      borderBottomColor: '#ddd',
    },

    headerText: {
      color: 'white',
      fontSize: 18,
      padding: 24,
    },

    navButton: {
      margin: 10,
      marginTop: 20,
      backgroundColor: 'rgb(29, 53, 87)', 
      padding: 10,
      borderRadius: 5,
      width: 350,
      alignItems: 'center',
    },

    EditnavButton: {
      margin: 10,
      marginTop: 20,
      backgroundColor: 'rgb(29, 53, 87)', 
      padding: 10,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },

    navButtonTextSpecial: {
      fontSize: 18,

      color: 'white',
    },

    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: 'row',
      justifyContent: 'center',

    },

    input: {
      color: 'black',
      alignSelf: 'stretch',
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 20,
      borderBottomColor: 'black',
      borderBottomWidth: 2, 
      textAlignVertical: "top",
      fontWeight: "700",
      fontSize: 20,

    },

    scrollView: {
   width: 300,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(43,161,137,0)',
    paddingTop: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    //color: '#2BA189',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,

  },

    editBtn: {
      position: 'absolute',
      top: 15,
      left: 300,
    },

    saveButton: {
      position: 'absolute',
      zIndex: 11,
      right: 5,
      top: 120,
      bottom: 20,
      width: 90,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
});