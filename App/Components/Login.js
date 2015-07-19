var React = require('react-native');
var AppActions = require('../Actions/AppActions');
var UserStore = require('../Stores/UserStore');

var {
  Navigator,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
};

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}>
        <View style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            {previousRoute.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => route.topNavigator.pop()}>
        <View style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Cancel
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

var LoginModal = React.createClass({
  
  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  _updateDataSourceFromStore() {
    // UI Action for successful login
    var user = UserStore.getState();

    if (!UserStore.isAnonymousUser()) {
      this.props.navigator.pop();
    }
  },

  componentWillMount() {
    UserStore.addChangeListener(this._updateDataSourceFromStore);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._updateDataSourceFromStore);
  },

  _login() {
    AppActions.login(this.state.username, this.state.password);
  },

  _renderAccount(route, navigator) {
    return (
      <ScrollView style={styles.scene}>
        <View style={{marginTop: 40, alignItems: 'center'}}>
          <Text>Pianoshelf Logo</Text>

          <NavButton
            onPress={() => {
              navigator.push({ id: 'login', title: 'Log In', topNavigator: this.props.navigator });
            }}
            text="Log In"/>

          <NavButton
            onPress={() => {
              navigator.push({ id: 'signup', title: 'Sign Up', topNavigator: this.props.navigator });
            }}
            text="Sign Up"/>

          <TouchableHighlight><Text>Facebook</Text></TouchableHighlight>
          <TouchableHighlight><Text>Twitter</Text></TouchableHighlight>

        </View>
      </ScrollView>
      );
  },

  _renderLogin(route, navigator) {
    return (
        <ScrollView style={styles.scene}>
          <Text style={styles.messageText}>{route.content}</Text>

          <Text>Username</Text>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
          onChangeText={(text) => this.setState({username: text})}>
          </TextInput>

          <Text>Password</Text>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
          onChangeText={(text) => this.setState({password: text})}>
          </TextInput>

          <TouchableHighlight style={styles.loginButton} onPress={() => this._login()}>
            <Text>Log In</Text>
          </TouchableHighlight>

        </ScrollView>
    );
  },

  _renderRegister(route, navigator) {
    return (
      <ScrollView style={styles.scene}>
        <Text style={styles.messageText}>Sign In</Text>

        <Text>Username</Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
        onChangeText={(text) => this.setState({username: text})}>
        </TextInput>

        <Text>Password</Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
        onChangeText={(text) => this.setState({password: text})}>
        </TextInput>

        <NavButton
          onPress={() => {
            navigator.push({ id: 'signup', title: 'Sign Up' });
          }}
          text="Sign Up"/>

        <NavButton
          onPress={() => {
            this.props.navigator.pop();
          }}
          text="Exit"/>
      </ScrollView>
    );
  },

  renderScene: function(route, navigator) {

    switch (route.id) {
      case 'login':
        return this._renderLogin(route, navigator);

      case 'signup':
        return this._renderRegister(route, navigator);

      default:
        return this._renderAccount(route, navigator);
    }
  },

  render: function() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{id: 'account', title: 'Account', topNavigator: this.props.navigator}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}/>
        }/>
    );
  },
});


var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
    padding: 50,
  },
  loginButton: {
    backgroundColor: 'rgb(100,200,100)',
    height: 40,
    flex: 2
  }
});

module.exports = LoginModal;
