const React = require('react-native');
const { StyleSheet } = React;

export default {

  container: {
    flex:1,
    flexDirection: 'column'
  },

  contHistory:{
    flex: 0.35,
    borderBottomWidth: 1,
    borderColor: '#000',
  },

  contOutput:{
    flex: 0.25,
  },

  contButtons:{
    flex: 0.4,
    backgroundColor: '#bdc3c7'
  },

  placeHolderOutput: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingLeft: 15
  },

  txtDefault: {
    color: '#000',
    fontSize: 30
  }

};