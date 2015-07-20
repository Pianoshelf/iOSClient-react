'use strict';

var React = require('react-native');
var { Icon, } = require('react-native-icons');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var LeftNavigation = React.createClass({

  getButtonColor(view) {
    return this.props.curView == view ? 'rgb(100,160,200)' : 'rgb(180,180,180)';
  },

  render() {
    return (
      <View style={styles.navcontainer}>

        <TouchableHighlight style={styles.button} onPress={this.props.viewLibrary}>
          <View style={styles.menuItem}>
            <Icon
              name='fontawesome|archive'
              size={40}
              color={ this.getButtonColor('library') }
              style={styles.menuItem}/>
            <Text style={styles.menuItemText}>LIBRARY</Text>
          </View>            
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={this.props.browseSheetmusic}>
          <View style={styles.menuItem}>
            <Icon
              name='fontawesome|list'
              size={40}
              color={ this.getButtonColor('browse') }
              style={styles.menuItem}/>
            <Text style={styles.menuItemText}>BROWSE</Text>
          </View>            
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={this.props.viewAccount}>
          <View style={styles.menuItem}>
            <Icon
              name='fontawesome|user'
              size={40}
              color={ this.getButtonColor('account') }
              style={styles.menuItem}/>
            <Text style={styles.menuItemText}>ACCOUNT</Text>
          </View>            
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  navcontainer: {
    backgroundColor: 'rgb(40,40,40)',
  },
  button: {
    height: 100,
    width: 75
  },
  menuItem : {
    height: 70, 
    width: 75, 
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