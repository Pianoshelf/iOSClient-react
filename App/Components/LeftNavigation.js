'use strict';

var React = require('react-native');
var { Icon, } = require('react-native-icons');

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
          <View style={styles.menuItem}>
          <Icon
            name='fontawesome|archive'
            size={40}
            color='rgb(180,180,180)'
            style={styles.menuItem}/>
          <Text style={styles.menuItemText}>LIBRARY</Text>
          </View>            
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.props.browseSheetmusic}>
          <View style={styles.menuItem}>
          <Icon
            name='fontawesome|list'
            size={40}
            color='rgb(180,180,180)'
            style={{height: 70, width: 70}}/>
          <Text style={styles.menuItemText}>BROWSE</Text>
          </View>            
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
    height: 100,
    width: 80
  },
  menuItem : {
    height: 70, 
    width: 70, 
    padding: 5,
    alignItems: 'center'
  },
  menuItemText: {
    marginTop: -10,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

module.exports = LeftNavigation;