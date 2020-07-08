const React = require('react-native');
const { StyleSheet } = React;

export default {

  container: {
    flex:1,
    backgroundColor: 'white',
  },

  txtDefault: {
    color: '#000',
    fontSize: 25,
    fontWeight: "600",
  },

  contRow: {
    flex: 1,
    flexDirection: 'row'
  },

  contButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: '#ecf0f1',
    margin: 2,
  }
};