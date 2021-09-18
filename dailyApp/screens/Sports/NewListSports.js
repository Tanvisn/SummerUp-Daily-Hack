import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';
import Item from './NewListItem';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { url } from './../../components/url';
export default class NewListSports extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isModalVisible:false,
      itemArray: [],
      itemText: '',
      inputText: '',
      edit:true,
      isDatePickerVisible: false,
      key:0,
      date: "",
      called:false
    }
    this.saveList=this.saveList.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.toggleCheckItem=this.toggleCheckItem.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.add = this.add.bind(this);
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

  closeModal = () =>{
    this.setState({
      isModalVisible:false
    })
  }
  hideDatePicker(){
    this.setState({ isDatePickerVisible: false});
  };

  handleConfirm(date) {
    this.hideDatePicker();
    this.setState({ date:moment(date).format('Do MMMM YYYY'), called:false});
  };

  handleTitleChange(e){
    console.log(e.nativeEvent.text);
    this.setState({ title: e.nativeEvent.text, called:false});
  }

  add(){
    fetch(url+'/updateFitnessList',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            edit:3,
            key:this.props.route.params.key,
            date:this.state.date,
            name:this.props.route.params.name,
            items:this.state.itemArray
          })
        })

        //recieve entry added confirmation from backend
        .then((response) => (response.json()))
        
        .then((res) => {
          //if entry added
          if(res.success === true){
            alert(res.message);
            this.setState({called:true});
          this.props.navigation.navigate('AllListSports');
          }
          else {
            alert(res.message);
           
          }
        })
        
        .catch(err => {
          console.log(err);
        });

  }
  saveList(){
      //go to backend with itemArray
      console.log(this.state.itemArray);
      if(this.props.route.params.allDates && this.props.route.params.allDates.filter(d => d===this.state.date).length){
        this.openModal();
      }
      else{
          fetch(url+'/updateFitnessList',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            edit:(!(this.props.route.params.edit))+1,
            key:this.props.route.params.key,
            date:this.state.date,
            name:this.props.route.params.name,
            items:this.state.itemArray
          })
        })

        //recieve entry added confirmation from backend
        .then((response) => (response.json()))
        
        .then((res) => {
          //if entry added
          if(res.success === true){
            alert(res.message);
            this.setState({called:true});
            this.props.navigation.navigate('AllListSports');
          }
          else {
            alert(res.message);
          }
        })
        
        .catch(err => {
          console.log(err);
        });
      }
    }

    saveListOnBack(){
      //go to backend with itemArray
      console.log(this.state.itemArray);
      if(this.state.called){}
        else{
      if(this.props.route.params.allDates && this.props.route.params.allDates.filter(d => d===this.state.date).length){
        this.add();
      }
      else{
          fetch(url+'/updateFitnessList',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            edit:(!(this.props.route.params.edit))+1,
            key:this.props.route.params.key,
            date:this.state.date,
            name:this.props.route.params.name,
            items:this.state.itemArray
          })
        })

        //recieve entry added confirmation from backend
        .then((response) => (response.json()))
        
        .then((res) => {
          //if entry added
          if(res.success === true){
            alert(res.message);
            this.setState({called:true});
            this.props.navigation.navigate('AllListSports');
          }
          else {
            alert(res.message);
          }
        })
        
        .catch(err => {
          console.log(err);
        });
      }
    }
    }

    toggleEdit(){
      this.setState({edit:!(this.state.edit)})
    }

    createItems(){
      console.log(this.state.itemArray);
      return(this.state.itemArray.map((val,key) => {
        return <Item key={key} keyval={key} val={val}
        deleteMethod={ ()=> this.deleteItem(key) } toggleCheck={()=>this.toggleCheckItem(val.key)}/>
      }))
    }

    componentDidMount(){
      this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
        if(this.state.title!=="" || this.state.itemArray.length!==0){
          this.saveListOnBack();
        }
      });
      if(this.props.route.params.edit){
        this.setState({date:moment(Date.now()).format('Do MMMM YYYY')});
      }
      else{
        this.setState({
          edit: false,
          key: this.props.route.params.key,
          date: this.props.route.params.date,
          itemArray:this.props.route.params.items,
          called:true
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
        <TouchableOpacity onPress={() => this.setState({ isDatePickerVisible: true})}>
        <TextInput style={styles.headerText} placeholder="Today's Date" 
        placeholderTextColor='white'
        underlineColorAndroid={'transparent'} 
        editable={false}
        value={this.state.date}
        onTouchStart={() => this.setState({ isDatePickerVisible: true})}
        />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={() => this.setState({ isDatePickerVisible: false})}
        />
         <TouchableOpacity 
         style={styles.saveButton}
         onPress={this.saveList}>
          <Text style={styles.saveButtonText}>Save </Text>
        </TouchableOpacity>
        </View>
        <Modal animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeModal()} onSwipeComplete={()=>this.closeModal()} swipeDirection="right" isVisible={this.state.isModalVisible} style={{backgroundColor:'white',maxHeight:200, top: 250,}}>
      <View style={{ flex: 1,justifyContent:'flex-start', top: 50,}}>
      <Text style={{textAlign:'center', justifyContent: 'center', fontSize: 20,}}>A list already exists for this date. Would you like to add this list to the saved list?</Text>
      </View>
      <View style={{ flex: 1,justifyContent:'center',position:'absolute',bottom:0}}>
      <View style={{flexDirection:'row',}}>
      
      <TouchableOpacity style={{backgroundColor:'rgb(29, 53, 87)',width:'50%', borderColor: 'white', borderWidth: 1,}} onPress={()=>this.closeModal()}>
      <Text style={{color:'white',textAlign:'center',padding:10}}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'rgb(29, 53, 87)',width:'50%', borderColor: 'white', borderWidth: 1,}}
        onPress={this.add}
      >
      <Text style={{color:'white',textAlign:'center',padding:10}}>Add </Text>
      </TouchableOpacity>
      </View>
      </View>
      </Modal>
        


        <ScrollView style={styles.scrollContainer}>

        {this.createItems()}

        </ScrollView>

        <View style={styles.footerInput}>
        <TextInput style={styles.textInput}
        onChangeText={(itemText) => this.setState({itemText, called:false})}
        value={this.state.itemText}
        placeholder='> Type here to add an Activity'
        placeholderTextColor='rgb(29, 53, 87)'
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
          });

          this.setState({ itemArray: this.state.itemArray })
          this.setState({ itemText: '' });
        }
      }

      deleteItem(key) {
        this.state.itemArray.splice(key,1);
        this.setState({ itemArray: this.state.itemArray })
      }

       toggleCheckItem(key) {
        var itt=this.state.itemArray.filter(it => it.key===key);
        itt[0].checked = !itt[0].checked;
        var item=this.state.itemArray.map(it => it.key===key?itt[0]:it);
        this.setState({ itemArray: item });
    }

    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "white",
      },

      header: {
        backgroundColor: 'rgb(29, 53, 87)',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 20,
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

      footerInput: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 5,
        zIndex: 10,
        width: 330,
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: 'rgb(29, 53, 87)',

      },

      textInput: {
        alignSelf: 'stretch',
        color: 'rgb(29, 53, 87)',

        padding: 15,
        
      },

      addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 10,
        bottom: 5,
        backgroundColor: 'rgb(29, 53, 87)',
        width: 60,
        height: 60,
        borderRadius: 60,
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
        backgroundColor: '#fff',
        width: 90,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
      },

      saveButtonText: {
        color: 'rgb(29, 53, 87)',
        fontSize: 15,
        fontWeight: '700',
      },

      navButton: {
      margin: 10,
      marginBottom: 15,
    },

    navButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: 'rgba(29, 53, 87,0.4)',
    },
    navButtonTextSpecial: {
      fontSize: 18,
      fontWeight: "bold",
      color: 'rgb(29, 53, 87)',
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
  item: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },

  itemText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: 'rgb(29, 53, 87)',
  },

  listCheckbox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#2980b9',
    padding: 10,
    top: 15,
    bottom: 10,
    right: 50,
  },

  itemDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    top: 15,
    bottom: 10,
    right: 10,
    borderRadius: 5,
  },

  itemDeleteText: {
    color: 'white',
    fontWeight: '100',
  },
  
    })
