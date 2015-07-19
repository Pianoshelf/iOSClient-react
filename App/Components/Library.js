var API                     = require('../Util/Api');
var AppActions              = require('../Actions/AppActions');
var Browse                  = require('./Browse');
var React                   = require('react-native');
var SheetmusicDetail        = require('./SheetmusicDetail');

var SheetmusicLibraryStore  = require('../Stores/SheetmusicLibraryStore');
var UserStore = require('../Stores/UserStore');
var SheetmusicViewer        = require('./SheetmusicViewer');

var {
  ActivityIndicatorIOS,
  Text,
  View,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Navigator,
  NavigatorIOS
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
    UserStore.addChangeListener(this._updateDataSourceFromStore);

    AppActions.initializeSheetmusicLibrary();
    this._updateDataSourceFromStore();
  },

  componentWillUnmount() {
    // Remove change listers from stores
    SheetmusicLibraryStore.removeChangeListener(this._updateDataSourceFromStore);
    UserStore.removeChangeListener(this._updateDataSourceFromStore);
  },

  _showSheetmusicDetails(sheetmusic) {
    this.props.navigator.push({
      component: SheetmusicDetail,
      title: sheetmusic.title,
      passProps: {
        sheetmusicId: sheetmusic.id
      }
    })
  },

  _renderSheetmusicThumbnail(sheetmusic) {
    var prepareTitle = (sheetmusic) => {
      return `${sheetmusic.title} by ${sheetmusic.composer_name}`;
    }

    return (
        <TouchableHighlight onPress={() => this._showSheetmusicDetails(sheetmusic) } style={styles.thumbnail}>
          <View>
            <Image style={styles.image} source={{uri: 'http:'+sheetmusic.thumbnail_url }} />
            <Text style={styles.sheetmusicText}>{ prepareTitle(sheetmusic) }</Text>
          </View>
        </TouchableHighlight>
    )
  },

  _renderLoginButton() {

    if (UserStore.isAnonymousUser()) {
      return (
        <View style={{alignSelf: 'flex-end', flexDirection: 'row', paddingBottom: 20, paddingRight: 25}}>
          <Text style={{color: 'white', fontSize: 20, padding: 10}}>Have an account?</Text> 
          <TouchableHighlight style={{backgroundColor: 'rgb(100,100,100)', padding: 10}} onPress={this.props.openLoginScreen}>
            <Text style={{color: 'white', fontSize: 20}}>Log In</Text>
          </TouchableHighlight>
        </View>
      );
    }
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
        <View style={styles.container}>
          <TextInput
          style={{height: 40, margin: 10, backgroundColor: 'rgb(40,40,40)', borderWidth: 1}}
          onChangeText={(text) => this.setState({input: text})}>
          </TextInput>

          <ScrollView contentContainerStyle={styles.list}>
            {this.state.sheetmusicLibrary.map((sheetmusic) => { return this._renderSheetmusicThumbnail(sheetmusic) })}
          </ScrollView>

          { this._renderLoginButton() }
        </View>
      )
    }
  }
});

var LibraryWrapper = React.createClass({
  render() {
    return (
      <NavigatorIOS
        style={styles.navigatorIos}
        navigationBarHidden={true}
        translucent={true}
        initialRoute={{
          title: 'Library',
          component: Library,
          passProps: { openLoginScreen: this.props.openLoginScreen },
        }} />
    );
  }
});

var styles = StyleSheet.create({
    navigatorIos: {
      flexDirection: 'row', 
      flex: 1,
      backgroundColor: 'rgb(40,40,40)',
    },
    container: {
      height: 1000,
      backgroundColor: 'rgb(50,50,50)'
    },
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
    sheetmusicText: {
        fontSize: 18,
        marginTop: 5,
        color: 'white'
    },
    thumbnail: {
        margin: 5,
        padding: 5,
        width: 210
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

module.exports = LibraryWrapper;
