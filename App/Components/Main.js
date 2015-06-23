'use strict';

var React = require('react-native');
var Browse = require('./Browse');
var LeftNavigation = require('./LeftNavigation');

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
    backgroundColor: 'rgb(70,70,70)'
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
    console.log("LIBRARY")
    this.setState({curView: 'library' })
  },

  browseSheetmusic() {
    console.log("SHEETMUSIC")
    this.setState({curView: 'browse'})
  },

  render() {

    if (this.state.curView === 'library') {
      return (
        <View style={styles.containerDark}>
          <LeftNavigation browseSheetmusic={this.browseSheetmusic.bind(this)} viewLibrary={this.viewLibrary.bind(this)} />
          <Browse style={styles.browse} />
        </View>
      );
    } 
    else if (this.state.curView === 'browse') {
      return (
        <View style={styles.containerLight}>
          <LeftNavigation browseSheetmusic={this.browseSheetmusic.bind(this)} viewLibrary={this.viewLibrary.bind(this)} />
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

