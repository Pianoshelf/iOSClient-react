var React = require('react-native');

var {
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    marginRight: 15,
    marginTop: 2,
    backgroundColor: 'rgb(150,150,150)',
  },
});

class Separator extends React.Component{
  render(){
    return (
      <View style={styles.separator} />
    );
  }
};

module.exports = Separator;