'use strict';

var React           = require('react-native');

var Account         = require('./Account');
var AppActions      = require('../Actions/AppActions');
var Browse          = require('./Browse');
var IntroScreen     = require('./IntroScreen');
var LeftNavigation  = require('./LeftNavigation');
var Library         = require('./Library');
var Login           = require('./Login');
var UserStore       = require('../Stores/UserStore');

var {
  ActivityIndicatorIOS,
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
      user: UserStore.getState()
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
    this.props.navigator.push({ id: 'loginmodal', title: 'login', component: Login });
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
            <IntroScreen navigator={this.props.navigator} />
          </View>
        );
      } else {

        if (this.state.curView === 'library') {
          return (
            <View style={styles.container}>
              <LeftNavigation curView={this.state.curView} 
              browseSheetmusic={ () => this.setState({curView: 'browse'}) } 
              viewLibrary={ () => this.setState({curView: 'library'}) } 
              viewAccount={ () => this.setState({curView: 'account'}) }/>

              <Library topNavigator={this.props.navigator} style={styles.browse} openLoginScreen={this.openLoginScreen} />
            </View>
          );
        }
        else if (this.state.curView === 'browse') {
          return (
            <View style={styles.container}>
              <LeftNavigation curView={this.state.curView} 
              browseSheetmusic={ () => this.setState({curView: 'browse'}) } 
              viewLibrary={ () => this.setState({curView: 'library'}) } 
              viewAccount={ () => this.setState({curView: 'account'}) }/>

              <Browse topNavigator={this.props.navigator} />
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <LeftNavigation curView={this.state.curView} 
              browseSheetmusic={ () => this.setState({curView: 'browse'}) } 
              viewLibrary={ () => this.setState({curView: 'library'}) } 
              viewAccount={ () => this.setState({curView: 'account'}) }/>

              <Account topNavigator={this.props.navigator} />
            </View>
          );
        }

      }
    }
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flex: 1,
    marginTop: 30
  },
  containerDark: {
    flexDirection: 'row', 
    flex: 1,
    marginTop: 30,
    backgroundColor: 'rgb(80,80,80)',
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