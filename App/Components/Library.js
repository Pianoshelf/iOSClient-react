var React = require('react-native');
var SheetmusicThumbnail = require('./SheetmusicThumbnail');
var API = require('../Util/Api');

var AppActions = require('../Actions/AppActions');
var SheetmusicLibraryStore = require('../Stores/SheetmusicLibraryStore');

var {
  ActivityIndicatorIOS,
  Text,
  View,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  TextInput,
  TouchableHighlight
} = React;

var Library = React.createClass({
  getInitialState() {
    return {
      sheetmusicLibrary: [],
      isLoaded: false
    };
  },

  _updateDataSourceFromStore(){
    this.setState({
      sheetmusicLibrary: SheetmusicLibraryStore.getState(),
      isLoaded: true
    })
  },

  componentWillMount() {
    // Add change listeners to stores
    SheetmusicLibraryStore.addChangeListener(this._updateDataSourceFromStore);

    AppActions.initializeSheetmusicLibrary();

    this._updateDataSourceFromStore();
  },

  componentWillUnmount() {
    // Remove change listers from stores
    SheetmusicLibraryStore.removeChangeListener(this._updateDataSourceFromStore);
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

          <ScrollView contentContainerStyle={styles.list}>
            {this.state.sheetmusicLibrary.map((sheetmusic) => { return <SheetmusicThumbnail sheetmusic={sheetmusic}></SheetmusicThumbnail> })}
          </ScrollView>

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

var styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 672
    },
    loading: {
      flex: 1,
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

module.exports = Library;
