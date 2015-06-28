'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

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

var styles = StyleSheet.create({
  navcontainer: {
    backgroundColor: 'rgb(40,40,40)',
  },
  button: {
    backgroundColor: 'grey',
    height: 100,
    width: 100
  }
});

module.exports = LeftNavigation;