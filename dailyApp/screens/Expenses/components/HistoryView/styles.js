const React = require('react-native');
const { StyleSheet } = React;

export default {

  container: {
    flex:1,
    padding: 30,
  },

  clearCont: {
    height: 40,
    alignItems: 'flex-end',
    paddingRight: 5,
    justifyContent: 'center'
  },

  txtClear: {
    color: '#2980b9',
    fontSize: 15,
    fontWeight: "bold",

  },

  txtExpression: {
    color: '#000',
    fontSize: 15
  },

  txtResult: {
    color: '#27ae60',
    fontSize: 20,
  },

  historyCont: {
      flex: 1,
      flexDirection: 'column'
  },

  placeHolderHistory: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    borderTopWidth: 0.7,
    borderColor: '#000'
  },

  expressionCont: {
    flex: 0.7,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },

  resultCont: {
    flex: 0.3,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },

  emptyHistoryCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  txtEmptyHistory: {
    color: '#7f8c8d',
    fontSize: 15
  }
};