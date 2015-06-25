var React = require('react-native');
var API = require('../Utils/api');
var Separator = require('./Helpers/Separator');
var SheetmusicListItem = require('./SheetmusicListItem');

var {
  ActivityIndicatorIOS,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  SwitchIOS,
  ListView,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  categorization: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'rgb(240, 240, 240)',
    flex: 0.5,
  },
  sheetmusicList: {
    flex: 1,
    backgroundColor: 'rgb(50, 50, 50)'
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
    height: 30
  },
  sortText: {
    alignSelf: 'center',
    color: 'white'
  }
});

var Browse = React.createClass({

  getInitialState() {
    return {
      sheetmusicDataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      })
    };
  },

  updateDataSource(data){
    this.setState({
      sheetmusicDataSource: this.state.sheetmusicDataSource.cloneWithRows(data),
      isLoaded: true
    })
  },

  componentWillMount() {
    API.getSheetmusicList()
    .then((res) => {
      this.updateDataSource(res.results);
    })
  },

  _sheetmusicSelected() {
    console.log("OK");
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

          <ListView
            dataSource={ this.state.sheetmusicDataSource } 
            renderRow={(rowData) => 
              <SheetmusicListItem  
                sheetmusic={rowData}>
              </SheetmusicListItem>}>
          </ListView>
        </View>
      </View>
      )
  }

});

module.exports = Browse;
