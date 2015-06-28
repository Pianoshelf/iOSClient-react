var React = require('react-native');
var SheetmusicThumbnail = require('./SheetmusicThumbnail');
var API = require('../Api/api');

var {
  ActivityIndicatorIOS,
  Text,
  View,
  Image,
  StyleSheet,
  ListView,
  TextInput,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 672
    },
    loading: {
      flex: 1,
      backgroundColor: 'rgb(50,50,50)',
      justifyContent: 'center',
      alignItems: 'center'
    },

    item: {
        margin: 10,
    },
    image: {
        width: 200,
        height: 300
    },
    sheetmusicText: {
        fontSize: 18,
        marginTop: 5,
        color: 'white'
    }
});


var Library = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      isLoaded: false
    };
  },

  updateDataSource(data){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      isLoaded: true
    })
  },

  componentWillMount() {
    API.getSheetmusicList('popular', 1, 5)
    .then((res) => {
      this.updateDataSource(res.results);
    })
  },

  render() {

    if (!this.state.isLoaded) {

      return (
        <View style={ styles.loading }>
          <Text>Loading</Text>
          <ActivityIndicatorIOS />
        </View>
      )
    } else {

      return (
        <View>
          <TextInput
          style={{height: 40, margin: 10, backgroundColor: 'rgb(40,40,40)', borderWidth: 1}}
          onChangeText={(text) => this.setState({input: text})}>
          </TextInput>

          <ListView contentContainerStyle={styles.list}
            dataSource={ this.state.dataSource } 
            renderRow={(rowData) => <SheetmusicThumbnail sheetmusic={rowData}></SheetmusicThumbnail>}>
          </ListView>

          <View style={{alignSelf: 'flex-end', flexDirection: 'row', paddingBottom: 20, paddingRight: 25}}>
            <Text style={{color: 'white', fontSize: 20, padding: 10}}>Have an account?</Text> 
            <TouchableHighlight style={{backgroundColor: 'rgb(100,100,100)', padding: 10}} onPress={this.props.openLoginModal}>
              <Text style={{color: 'white', fontSize: 20}}>Log In</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    }
  }

});

module.exports = Library;
