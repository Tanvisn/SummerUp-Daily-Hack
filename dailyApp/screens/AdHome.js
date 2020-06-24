import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet,Text, View, Button, Image } from "react-native";
import { Card, CardItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
//import AllLists from './Shopping/AllLists.js';
//import newList from './Shopping/newList.js';

export default class AdHome extends React.Component{

  constructor(props){
    super(props);
    this.state={
      name: "",
    }
    this.getFromAsync=this.getFromAsync.bind(this);
  }
  getFromAsync = async()=>{
    const authData = await AsyncStorage.getItem('auth_data');
    if(authData !== null){
      console.log("hi");
      const authDataJson = JSON.parse(authData);
      this.setState({name: authDataJson.name});
    }
  }
  componentDidMount(){
    this.getFromAsync();
  }
  render(){
  return (
    <View style={styles.container}>
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
     <Card>
     <View style={{ alignItems: 'center' }}>
     <Image
     source={require('./../assets/diary.png')}

     style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Diary" onPress={() => this.props.navigation.navigate('Diary',{name: this.state.name})}/>
    </Card>

    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/shop.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Shopping List" onPress={() => this.props.navigation.navigate('Shopping',{name: this.state.name})}/>
    </Card>
    </View>

    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/med.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Medicines" />
    </Card>

    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/sports.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Sports" onPress={() => this.props.navigation.navigate('Sports',{name: this.state.name})}/>
    </Card>

    </View>

    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/events.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Events" />
    </Card>

    <Card>
    <View style={{ alignItems: 'center' }}>
    <Image
    source={require('../assets/expenses.png')}
    style={{
      width: 150,
      height: 150,

    }}
    />
    </View>
    <Button title="Expenses" />
    </Card>

    </View>


    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(43,161,137,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});