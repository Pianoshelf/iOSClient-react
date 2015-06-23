'use strict';

var React = require('react-native');
var Browse = require('./Browse');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flex: 1,
    marginTop: 30,
    backgroundColor: 'rgb(70,70,70)'
  },
  leftNav: {
    flexDirection: 'row', 
    backgroundColor: 'blue',
    flex: 0.1,
  },
  browse: {
    flex: 0.5,
  },
  navcontainer: {
    backgroundColor: '#cfcfcf',
  },
  button: {
    backgroundColor: 'grey',
    height: 100,
    width: 100
  }
});

class LeftNavigation extends React.Component{
  render() {
    return (
      <View style={styles.navcontainer}>
        <TouchableHighlight style={styles.button} onPress={this.props.viewLibrary}>
          <Text>Library</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.props.browseSheetmusic}>
          <Text>Browse</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

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
        <View style={styles.container}>
          <LeftNavigation browseSheetmusic={this.browseSheetmusic.bind(this)} viewLibrary={this.viewLibrary.bind(this)} />
          <Browse style={styles.browse} />
        </View>
      );
    } 
    else if (this.state.curView === 'browse') {
      return (
        <View style={styles.container}>
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

