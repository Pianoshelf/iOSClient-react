'use strict';

var React = require('react-native');
var Browse = require('./App/Components/Browse');
var Main = require('./App/Components/Main');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} = React;

var pianoshelf = React.createClass({
  render: function() {
    return (
      <Main/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flex: 1
  },
});

AppRegistry.registerComponent('pianoshelf', () => pianoshelf);
