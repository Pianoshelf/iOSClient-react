'use strict';

var React = require('react-native');
var Browse = require('./App/Components/Browse');
var Main = require('./App/Components/Main');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flex: 1,
    marginTop: 30,
  },
  leftNav: {
    flexDirection: 'row', 
    backgroundColor: 'blue',
    flex: 0.1,
  },
  browse: {
    flex: 0.5,
  },
});

var pianoshelf = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        navigationBarHidden = 'true'
        initialRoute={{
          title: 'Pianoshelf',
          component: Main 
        }} />
    );
  }
});


AppRegistry.registerComponent('pianoshelf', () => pianoshelf);
