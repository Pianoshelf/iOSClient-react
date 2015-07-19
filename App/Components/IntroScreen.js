'use strict';

var React = require('react-native');
var UserStore = require('../Stores/UserStore');
var AppActions = require('../Actions/AppActions');

var {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} = React;

var IntroScreen = React.createClass({

  skipLogin() {
    AppActions.skipLogin();
  },

  openLoginModal() {
    
  },

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          Pianoshelf Logo Here
        </Text>

        <TouchableHighlight onPress={() => this.openLoginModal()} underlayColor="rgba(0,0,0,.1)">
          <Text style={styles.text}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.skipLogin()} underlayColor="rgba(0,0,0,.1)">
          <Text style={styles.text}>Skip</Text>
        </TouchableHighlight>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  wrapper: {
    padding: 50,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    margin: 5,
    fontSize: 22
  }
});

module.exports = IntroScreen;
