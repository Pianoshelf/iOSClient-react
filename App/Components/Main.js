'use strict';

var React           = require('react-native');

var Browse          = require('./Browse');
var IntroScreen     = require('./IntroScreen');
var LeftNavigation  = require('./LeftNavigation');
var Library         = require('./Library');
var UserStore       = require('../Stores/UserStore');
var AppActions      = require('../Actions/AppActions');
var Login           = require('./Login');

var {
  ActivityIndicatorIOS,
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
      isLoading: true,
      curView: 'library',
      isModalOpen: false,
      user: null
    };
  },

  _updateDataSourceFromStore(){
    this.setState({
      isLoading: false,
      user: UserStore.getState(),
    })
  },

  componentWillMount() {
    UserStore.addChangeListener(this._updateDataSourceFromStore);
    AppActions.loadUser();
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._updateDataSourceFromStore);
  },

  openLoginScreen() {
    this.props.navigator.push({ id: 'loginmodal', title: 'login', component: Login});
  },

  viewLibrary() {
    this.setState({curView: 'library'})
  },

  browseSheetmusic() {
    this.setState({curView: 'browse'})
  },

  render() {
    if (this.state.isLoading) {
      return (
        <View style={ styles.loading }>
          <Text>Loading..</Text>
          <ActivityIndicatorIOS />
        </View>
      )
    } else {
      if (this.state.user === null) {
        return (
          <View style={styles.containerWhite}>
            <IntroScreen/>
          </View>
        );
      } else {
        if (this.state.curView === 'library') {
          return (
            <View style={styles.containerDark}>
              <LeftNavigation browseSheetmusic={this.browseSheetmusic} viewLibrary={this.viewLibrary} />
              <Library style={styles.browse} openLoginScreen={this.openLoginScreen} />
            </View>
          );
        }
        else { // if (this.state.curView === 'browse') {
          return (
            <View style={styles.containerLight}>
              <LeftNavigation browseSheetmusic={this.browseSheetmusic} viewLibrary={this.viewLibrary} />
              <Browse />
            </View>
          );
        }
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Main;