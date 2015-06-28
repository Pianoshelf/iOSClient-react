var React = require('react-native');
var Separator = require('./Helpers/Separator');
var SheetmusicDetail = require('./SheetmusicDetail');

var AppActions = require('../Actions/AppActions');
var SheetmusicStore = require('../Stores/SheetmusicStore');

var {
  ActivityIndicatorIOS,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  SwitchIOS,
  ListView,
  ScrollView,
  TouchableHighlight,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 45,
  },
  categorization: {
    backgroundColor: 'rgb(240, 240, 240)',
    flex: 0.5,
    paddingLeft: 5
  },
  sheetmusicList: {
    flex: 1,
  },
  categoryHeadingFont: {
    fontSize: 16
  },
  category: {
    flexDirection: 'row',
    marginTop: 5
  },
  categoryTag: {
    marginTop: 5,
    marginLeft: 3,
    fontSize: 15
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    padding: 5
  },
  sortBackground: {
    backgroundColor: 'rgb(120,120,120)',
    padding: 5,
    borderRadius: 3,
    alignItems: 'center',
  },
  sortText: {
    alignSelf: 'center',
    color: 'white'
  },
  scrollView: {
    flex: 1
  },
});

var listItemStyles = StyleSheet.create({
    item: {
        marginTop: 3,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 5,
        paddingLeft: 5,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    composerText: {
        color: 'rgb(80,80,80)',
        paddingBottom: 5,
        flex: 5
    },
    difficultyText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 2
    }
});

var Browse = React.createClass({

  getInitialState() {
    return {
      sheetmusicDataSource: [],
      isLoaded: false
    };
  },

  componentWillMount() {
    // Add change listeners to stores
    SheetmusicStore.addChangeListener(this._updateDataSourceFromStore.bind(this));
    AppActions.receiveInitialSheetmusicData();

    this._updateDataSourceFromStore();
  },

  componentWillUnmount() {
    // Remove change listers from stores
    SheetmusicStore.removeChangeListener(this._updateDataSourceFromStore.bind(this));
  },

  _updateDataSourceFromStore(){
    this.setState({
      sheetmusicDataSource: SheetmusicStore.getState(),
      isLoaded: true
    })
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

  _renderSheetmusicItem(sheetmusic) {
      return (
          <TouchableHighlight onPress={() => this._showSheetmusicDetails(sheetmusic)} underlayColor="rgba(0,0,0,.1)">
          <View style={listItemStyles.item}>
              <Text style={listItemStyles.titleText}>{ sheetmusic.title }</Text>
              <View style={{marginTop: 5, flexDirection: 'row', display: 'flex'}}>
                  <Text style={listItemStyles.composerText}>
                      { sheetmusic.composer_name } &bull; { sheetmusic.view_count } views
                  </Text>
                  <View style={{backgroundColor: 'rgb(200,50,50)'}}>
                      <Text style={listItemStyles.difficultyText}>Advanced</Text>
                  </View>
              </View>
          <Separator/>
          </View>
          </TouchableHighlight>
      );
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.categorization}>
          <Text style={styles.categoryHeadingFont}>Categories</Text>
          <Separator/>

          <View style={styles.category}>
            <SwitchIOS/><Text style={styles.categoryTag}>Sonata</Text>
          </View>
          <View style={styles.category}>
            <SwitchIOS/><Text style={styles.categoryTag}>Anime</Text>
          </View>
          <View style={styles.category}>
            <SwitchIOS/><Text style={styles.categoryTag}>Classical</Text>
          </View>
        </View>

        <View style={styles.sheetmusicList}>
          <View style={styles.flowRight}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight style={styles.sortBackground}>
                <Text style={styles.sortText}>Popular</Text>
              </TouchableHighlight>
            </View>
          </View>

          <ScrollView 
          keyboardDismissMode="onDrag"
          style={styles.scrollView}
          automaticallyAdjustContentInsets={false}>
            {this.state.sheetmusicDataSource.map((sheetmusic) => { return this._renderSheetmusicItem(sheetmusic) })}
          </ScrollView>

        </View>
      </View>
      )
  }
});

var BrowseWrapper = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={{
          flexDirection: 'row', 
          flex: 1,
        }}
        initialRoute={{
          title: 'Browse',
          component: Browse 
        }} />
    );
  }
});

module.exports = BrowseWrapper;
