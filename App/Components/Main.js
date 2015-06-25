'use strict';

var React = require('react-native');
var Library = require('./Library');
var LeftNavigation = require('./LeftNavigation');
var Browse = require('./Browse');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  containerDark: {
    flexDirection: 'row', 
    flex: 1,
    marginTop: 30,
    backgroundColor: 'rgb(50,50,50)'
  },
  containerLight: {
    flexDirection: 'row', 
    flex: 1,
    marginTop: 30,
    backgroundColor: 'rgb(240,240,240)'
  },
  browse: {
    flex: 0.5,
  },
});

var Main = React.createClass({

  getInitialState() {
    return {
      curView: 'library'
    };
  },

  viewLibrary() {
    this.setState({curView: 'library' })
  },

  browseSheetmusic() {
    this.setState({curView: 'browse'})
  },

  render() {

    if (this.state.curView === 'library') {
      return (
        <View style={styles.containerDark}>
          <LeftNavigation browseSheetmusic={this.browseSheetmusic.bind(this)} viewLibrary={this.viewLibrary.bind(this)} />
          <Library style={styles.browse} />
        </View>
      );
    } 
    else if (this.state.curView === 'browse') {
      return (
        <View style={styles.containerLight}>
          <LeftNavigation browseSheetmusic={this.browseSheetmusic.bind(this)} viewLibrary={this.viewLibrary.bind(this)} />
          <Browse />
        </View>
      );
    } 
    else {
      return (
        <View></View>
        )
    }
  }
});

module.exports = Main;

