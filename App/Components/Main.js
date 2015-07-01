'use strict';

var React           = require('react-native');

var Browse          = require('./Browse');
var IntroScreen     = require('./IntroScreen');
var LeftNavigation  = require('./LeftNavigation');
var Library         = require('./Library');
var LoginModal      = require('./LoginModal');
var UserStore       = require('../Stores/UserStore');
var LoginModalStore = require('../Stores/LoginModalStore');
var AppActions      = require('../Actions/AppActions');

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
      isModalOpen: false,
      user: null
    };
  },

  _updateDataSourceFromStore(){
    this.setState({
      user: UserStore.getState(),
      isModalOpen: LoginModalStore.getState().loginModalOpen
    })
  },

  componentWillMount() {
    UserStore.addChangeListener(this._updateDataSourceFromStore);
    LoginModalStore.addChangeListener(this._updateDataSourceFromStore);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._updateDataSourceFromStore);
    LoginModalStore.removeChangeListener(this._updateDataSourceFromStore);
  },

  openLoginModal() {
    AppActions.toggleLoginModal(true);
  },
 
  closeLoginModal() {
    AppActions.toggleLoginModal(false);
  },

  viewLibrary() {
    this.setState({curView: 'library'})
  },

  browseSheetmusic() {
    this.setState({curView: 'browse'})
  },

  render() {
    if (this.state.user === null) {
      return (
        <View style={styles.containerWhite}>
          <IntroScreen/>
          <LoginModal isModalOpen={this.state.isModalOpen} closeLoginModal={this.closeLoginModal}/>
        </View>
      );
    } else {
      if (this.state.curView === 'library') {
        return (
          <View style={styles.containerDark}>
            <LeftNavigation browseSheetmusic={this.browseSheetmusic} viewLibrary={this.viewLibrary} />
            <Library style={styles.browse} openLoginModal={this.openLoginModal} />
            <LoginModal isModalOpen={this.state.isModalOpen} closeLoginModal={this.closeLoginModal}/>
          </View>
        );
      }
      else { // if (this.state.curView === 'browse') {
        return (
          <View style={styles.containerLight}>
            <LeftNavigation browseSheetmusic={this.browseSheetmusic} viewLibrary={this.viewLibrary} />
            <Browse />
            <LoginModal isModalOpen={this.state.isModalOpen} closeLoginModal={this.closeLoginModal} openLoginModal={this.openLoginModal}/>
          </View>
        );
      }
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
  containerWhite: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'white'
  },
  browse: {
    flex: 0.5,
  },
});

module.exports = Main;