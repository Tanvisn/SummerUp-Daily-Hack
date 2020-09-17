import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
import Item from './NewListItem';
import { url } from './../../components/url';
export default class NewList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      itemArray: [],//key,item,checked
      itemText: '',
      inputText: '',
      edit:true,
      title:"",
      called:false,
      key:0,
    }
    this.saveList=this.saveList.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.toggleCheckItem=this.toggleCheckItem.bind(this);
  }

    saveList(){
      //go to backend with itemArray
      console.log(this.state.itemArray);
      if(this.state.called){}
        else{
      fetch(url+'/saveShopList',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        edit:(!(this.props.route.params.edit))+1,
        key:this.props.route.params.key,
        name:this.props.route.params.name,
        title:this.props.route.params.title,
        items:this.state.itemArray
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
        this.setState({called:true});
        this.props.navigation.navigate('Shopping');
    //    this.toggleEdit();
    //    this.props.route.params.beforeGoBack();
        
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

    toggleEdit(){
    //  console.log(this.state);
      this.setState({edit:!(this.state.edit)})
    }

    createItems(){
      console.log(this.state.itemArray);
      return(this.state.itemArray.map((val,key) => {
        console.log("items");
        console.log(val);
        console.log("items");
        return <Item key={key} keyval={key} val={val}
        deleteMethod={ ()=> this.deleteItem(key) } toggleCheck={()=>this.toggleCheckItem(val.key)}/>
      }))
    }

    componentDidMount(){
      this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
        console.log('blur New shopping list page');
        if(this.state.title!=="" || this.state.itemArray.length!==0){
          this.saveList();
        }
      });
      if(this.props.route.params.edit){
        this.setState({
          title:this.props.route.params.title,
          key:this.props.route.params.key,
        });
      }
      else{
        this.setState({
          edit: false,
          itemArray:this.props.route.params.items,
          title:this.props.route.params.title,
          called:true,
        });
     
      }
    }
    componentWillUnmount(){
      this._unsubscribeSiBlur();
    }
  
    render() {
      

      return (
        <View style={styles.container}>
        
        <View style={styles.header}>
        <TextInput style={styles.headerText} placeholder={this.state.title===""?"Title":null} 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} 
        onChange={(e) => this.setState({title:e.nativeEvent.text,called:false})}
        value={this.state.title}/>
        <TouchableOpacity 
         style={styles.saveButton}
         onPress={this.saveList}>
          <Text style={styles.saveButtonText}>Save </Text>
        </TouchableOpacity>
        </View>


        <ScrollView style={styles.scrollContainer}>

        {this.createItems()}

        </ScrollView>

        <View style={styles.footer}>
        <TextInput style={styles.textInput}
        onChangeText={(itemText) => this.setState({itemText, called:false})}
        value={this.state.itemText}
        placeholder='> Type here to add an Item'
        placeholderTextColor='white'
        underlineColorAndroid={'transparent'} />

        </View>

        <TouchableOpacity onPress={this.addItem.bind(this)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        </View>
        );
    }

    addItem() {
      if (this.state.itemText) {
        this.state.itemArray.push({
          item: this.state.itemText,
          checked: false,
          key: Date.now(),
          cost: 120,
          quantity: 2
        });
        console.log("adding");
        this.setState({ itemArray: this.state.itemArray,called:false });
        this.setState({ itemText: '' });
      }
    }

    deleteItem(key) {
      this.state.itemArray.splice(key,1);
      console.log("delete item");
      this.setState({ itemArray: this.state.itemArray,called:false });
    }

    toggleCheckItem(key) {
      console.log(itt+"iiihi");
   //   if(this.state.itemArray!==[]){
      var itt=this.state.itemArray.filter(it => it.key===key);
      itt[0].checked = !itt[0].checked;
      var item=this.state.itemArray.map(it => it.key===key?itt[0]:it);
      //console.warn(item);
      this.setState({ itemArray: item,called:false });
    
    }

}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },

    header: {
      backgroundColor: '#e91e63',
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

    scrollContainer: {
      flex: 1,
      marginBottom: 70,
    },

    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      marginTop: 0,
      zIndex: 10,
    },

    textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      backgroundColor: '#252525',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
    },

    addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 10,
      backgroundColor: '#e91e63',
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },

    addButtonText: {
      color: '#fff',
      fontSize: 24,
    },

    item:{
      width:"80%",
      backgroundColor:"#fff",
      borderRadius:20,
      padding:10,
      marginBottom:10,
      flexDirection:"row",
    },

    saveButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 15,
      backgroundColor: '#252525',
      width: 90,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },

    saveButtonText: {
      color: '#fff',
      fontSize: 15,
    },
  });

