'use strict';

var AppActions = require('../Actions/AppActions');
var React = require('react-native');
var Separator = require('./Helpers/Separator');
var SheetmusicDetail = require('./SheetmusicDetail');
var SheetmusicStore = require('../Stores/SheetmusicStore');

var {
  ActivityIndicatorIOS,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  SwitchIOS,
  ScrollView,
  TouchableHighlight,
  NavigatorIOS
} = React;

var Browse = React.createClass({

  getInitialState() {
    return {
      sheetmusicList: [],
      difficultyTags: [],
      artists: [],
      styles: [],
      isLoaded: false,
      isLoadingMore: false,
    };
  },

  componentWillMount() {
    // Add change listeners to stores
    SheetmusicStore.addChangeListener(this._updateDataSourceFromStore);

    // Initial options
    var options = {
      orderBy: 'popular', // popular, new 
      page: 1,
      pageSize: 20
    }

    // Load initial data.
    AppActions.receiveInitialSheetmusicData(options);
    AppActions.receiveInitialCategoryList(options);
    AppActions.receiveInitialArtistList(options);
    AppActions.receiveInitialDifficultyList(options);

    this._updateDataSourceFromStore();
  },

  componentWillUnmount() {
    // Remove change listers from stores
    SheetmusicStore.removeChangeListener(this._updateDataSourceFromStore);
  },

  _updateDataSourceFromStore(){
    this.setState(SheetmusicStore.getState());
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
              <View style={{marginTop: 5, flexDirection: 'row'}}>
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

  _renderCategoryTag(tagType, tag) {
    var tagName = tag.tagName;

    var buttonColor = {};
    if (tag.selected) {
      buttonColor = { backgroundColor: 'rgb(50,50,50)' };
    } else {
      buttonColor = { backgroundColor: 'rgb(150,150,150)' };
    }

    return (
      <TouchableHighlight onPress={() => AppActions.selectTag(tagType, tagName) } style={[buttonColor, styles.category]}>
        <Text style={styles.categoryTag}>{{ tagName }}</Text>
      </TouchableHighlight>
    );
  },

  _renderCategoryFilter() {
    return (
      <ScrollView style={[styles.categorizationScroll, styles.greyBackground]}>
        <View style={styles.categorization}>

          <Text style={styles.categoryHeadingFont}>Categories</Text><Separator/>
          <ScrollView automaticallyAdjustContentInsets={false} scrollEnabled={false} contentContainerStyle={styles.categoryList}>
           {this.state.styles.map( (tag) => {return this._renderCategoryTag('categories', tag)})}
          </ScrollView>
          
          <Text style={[styles.categoryHeadingFont, {marginTop: 20}]}>Difficulty</Text><Separator/>
          <ScrollView automaticallyAdjustContentInsets={false} scrollEnabled={false} contentContainerStyle={styles.categoryList}>
            {this.state.difficultyTags.map( (tag) => {return this._renderCategoryTag('difficulty', tag)})}
          </ScrollView>

          <ScrollView automaticallyAdjustContentInsets={false} scrollEnabled={false} contentContainerStyle={styles.categoryList}>
          <Text style={[styles.categoryHeadingFont, {marginTop: 20}]}>Artists / Composers</Text><Separator/>
            {this.state.artists.map( (tag) => {return this._renderCategoryTag('artists', tag)})}
          </ScrollView>

        </View>
      </ScrollView>
    );
  },

  onEndReached() {
    console.log("END REACHED")
  },

  _distanceFromEnd(event): number {
    let {
      contentSize,
      contentInset,
      contentOffset,
      layoutMeasurement,
    } = event.nativeEvent;

    if (this.props.horizontal) {
      var contentLength = contentSize.width;
      var trailingInset = contentInset.right;
      var scrollOffset = contentOffset.x;
      var viewportLength = layoutMeasurement.width;
    } else {
      contentLength = contentSize.height;
      trailingInset = contentInset.bottom;
      scrollOffset = contentOffset.y;
      viewportLength = layoutMeasurement.height;
    }

    return contentLength + trailingInset - scrollOffset - viewportLength;
  },

  _handleScroll(event) {

    console.log(this._distanceFromEnd(event));

    if (this._distanceFromEnd(event) < -8) {
      console.log("LOAD MORE");
      this.setState({
        isLoadingMore: true,
      })
      
      setTimeout(() => {
        this.setState({
          isLoadingMore: false,
        })
      }, 1000)

    }
  },

  renderLoadingFooter() {
    
    if (this.state.isLoadingMore) {
      return (
        <View style={{flex: 1, height: 100, alignItems: 'center'}}>
          <Text style={{margin: 5}}>Loading...</Text>
          <ActivityIndicatorIOS />
        </View>
      );
    }
  },

  render() {
    return (
      <View style={styles.container}>
        {this._renderCategoryFilter()}

        <View style={styles.sheetmusicList}>
          <View style={styles.flowRight}>
              <TextInput 
              style={styles.searchText}
              placeholder="Search..">
              </TextInput>

              <TouchableHighlight style={styles.sortBackground}>
                <Text style={styles.sortText}>Popular</Text>
              </TouchableHighlight>
          </View>

          <ScrollView 
          keyboardDismissMode="onDrag"
          style={styles.scrollView}
          automaticallyAdjustContentInsets={false}
          onScroll={this._handleScroll}
          onEndReached={this.onEndReached}>
            {this.state.sheetmusicList.map((sheetmusic) => { return this._renderSheetmusicItem(sheetmusic) })}
            {this.renderLoadingFooter()}
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

var styles = StyleSheet.create({
  greyBackground: {
    backgroundColor: 'rgb(240, 240, 240)',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 45,
    backgroundColor: 'white'
  },
  categorizationScroll: {
    flex: 0.5,
  },
  categorization: {
    paddingLeft: 5
  },
  sheetmusicList: {
    flex: 1,
  },
  categoryHeadingFont: {
    fontSize: 18,
    marginBottom: 5
  },
  category: {
    flexDirection: 'row',
    padding: 5,
    margin: 5
  },
  categoryTag: {
    fontSize: 15,
    color: 'white'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 5
  },
  searchText: {
    flex: 6, 
    borderColor: 'rgb(120,120,120)', 
    borderWidth: 1,
    padding: 2
  },
  sortBackground: {
    flex: 1,
    backgroundColor: 'rgb(120,120,120)',
    padding: 5,
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 5,
  },
  sortText: {
    alignSelf: 'center',
    color: 'white'
  },
  scrollView: {
    flex: 1
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  }
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

module.exports = BrowseWrapper;
