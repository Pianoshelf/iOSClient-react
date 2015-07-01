'use strict';

var React = require('react-native');
var Library = require('./Library');
var LeftNavigation = require('./LeftNavigation');
var Browse = require('./Browse');
var LoginModal = require('./LoginModal');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var Main = React.createClass({

  getInitialState() {
    return {
      curView: 'library',
      isModalOpen: false
    };
  },

  openLoginModal() {
    console.log("OPEN MODAL");
    this.setState({isModalOpen: true});
  },
 
  closeLoginModal() {
    this.setState({isModalOpen: false});
  },

  viewLibrary() {
    this.setState({curView: 'library'})
  },

  browseSheetmusic() {
    this.setState({curView: 'browse'})
  },

  render() {
    if (this.state.curView === 'library') {
      return (
        <View style={styles.containerDark}>
          <LeftNavigation browseSheetmusic={this.browseSheetmusic} viewLibrary={this.viewLibrary} />
          <Library style={styles.browse} openLoginModal={this.openLoginModal} />
          <LoginModal isModalOpen={this.state.isModalOpen} closeLoginModal={this.closeLoginModal}/>
        </View>
      );
    } 
    else if (this.state.curView === 'browse') {
      return (
        <View style={styles.containerLight}>
          <LeftNavigation browseSheetmusic={this.browseSheetmusic} viewLibrary={this.viewLibrary} />
          <Browse />
          <LoginModal isModalOpen={this.state.isModalOpen} closeLoginModal={this.closeLoginModal} openLoginModal={this.openLoginModal}/>
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

var styles = StyleSheet.create({
  containerDark: {
    flexDirection: 'row', 
    flex: 1,
    marginTop: 30,
    backgroundColor: 'rgb(50,50,50)',
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

module.exports = Main;