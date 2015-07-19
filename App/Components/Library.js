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
  Navigator
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

  _showSheetmusicDetails(sheetmusic, navigator) {
    navigator.push({
      id: 'sheetmusicDetail',
      title: sheetmusic.title,
      sheetmusicId: sheetmusic.id
    })
  },

  _renderSheetmusicThumbnail(sheetmusic, navigator) {
    var prepareTitle = (sheetmusic) => {
      return `${sheetmusic.title} by ${sheetmusic.composer_name}`;
    }

    return (
        <TouchableHighlight onPress={() => this._showSheetmusicDetails(sheetmusic, navigator) } style={styles.thumbnail}>
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

  _renderLibrary(navigator) {

    if (!this.state.isLoaded) {

      return (
        <View style={ styles.loading }>
          <Text>Loading</Text>
          <ActivityIndicatorIOS />
        </View>
      )
    } else {

      return (
        <View style={styles.containerDark}>
          <TextInput
          style={{height: 40, margin: 10, backgroundColor: 'rgb(40,40,40)', borderWidth: 1}}
          onChangeText={(text) => this.setState({input: text})}>
          </TextInput>

          <ScrollView contentContainerStyle={styles.list}>
            {this.state.sheetmusicLibrary.map((sheetmusic) => { return this._renderSheetmusicThumbnail(sheetmusic, navigator) })}
          </ScrollView>

          { this._renderLoginButton() }
        </View>
      )
    }
  },

  renderScene: function(route, nav) {
    switch (route.id) {
      case 'sheetmusicDetail':
        return (
          <SheetmusicDetail topNavigator={this.props.topNavigator} title={route.title} sheetmusicId={route.sheetmusicId} />
        );
      default: // Library
        return this._renderLibrary(nav);
    }
  },

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ id: 'library' }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}/>
    )
  }

});

var styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerDark: {
      flex: 1,
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

module.exports = Library;
