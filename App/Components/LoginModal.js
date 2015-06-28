var Modal = require('react-native-modal');
var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
    loginButton: {
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        width: 400,
        borderColor: 'rgb(240,240,240)',
        borderWidth: 1,
        shadowColor: 'rgb(240,240,240)',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 3,
        shadowRadius: 1,
        alignItems: 'center',
        marginTop: 10
    },
});

var LoginModal = React.createClass({
  render() {
    return(
      <Modal style={{backgroundColor: 'red'}} forceToFront={true} isVisible={this.props.isModalOpen} onClose={() => this.props.closeLoginModal()}>
        <View style={{padding: 20, marginTop: 300, width: 500, backgroundColor: 'white', alignSelf: 'center', alignItems: 'center'}} >
          <Text>pianoshelf (insert logo here)</Text>
          <TouchableHighlight underlayColor="rgba(180,180,180,.5)" style={styles.loginButton}>
            <Text>Sign Up</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(180,180,180,.5)" style={styles.loginButton}>
            <Text>Log In</Text>
          </TouchableHighlight>

          <Text> Or </Text>

          <TouchableHighlight>
            <Text>Sign in with Facebook</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text>Sign in with Twitter</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.loginButton} onPress={ this.props.closeLoginModal }>
            <Text>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    )}
});

module.exports = LoginModal;