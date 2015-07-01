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

var Pianoshelf = React.createClass ({
    renderScene(route, nav) {
      var props = route.passProps;

      if (route.component) {
        return React.createElement(route.component, props);
      }
    },

    render() {
      return (
        <Navigator
          initialRoute={{name: 'Main', component: Main}}
          renderScene={this.renderScene}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromBottom;
          }}/>
      );
    }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flex: 1
  },
});

AppRegistry.registerComponent('pianoshelf', () => Pianoshelf);
