var React = require('react-native');
var UserStore = require('../Stores/UserStore');
var AppActions = require('../Actions/AppActions');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var Account = React.createClass({
  getInitialState() {
    return {
      user: UserStore.getState()
    };
  },

  _updateDataSourceFromStore(){
    console.log("OK");
    this.setState({
      user: UserStore.getState(),
    })
  },

  componentWillMount() {
    UserStore.addChangeListener(this._updateDataSourceFromStore);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._updateDataSourceFromStore);
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text>{ this.state.user.username }</Text>
          <Text>{ this.state.user.email }</Text>
        </View>

        <TouchableHighlight onPress={() => AppActions.logout()} style={[styles.card, styles.spaceTop]}>
            <Text style={styles.textTitle}>Log Out</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(240,240,240)'
  },
  card: {
    backgroundColor: 'white',
    padding: 10
  },
  spaceTop: {
    marginTop: 10
  },
  textTitle: {
    fontSize: 18
  }
});

module.exports = Account;