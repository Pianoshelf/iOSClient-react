'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} = React;

var images = [
        "http://sheetmusic.pianoshelf.com/sheetmusicimg/Chopin-Prelude-op-28-no-8-page1-51c90bd3a19ca.jpg",
        "http://sheetmusic.pianoshelf.com/sheetmusicimg/Chopin-Prelude-op-28-no-8-page2-51c90bd4aefbb.jpg",
        "http://sheetmusic.pianoshelf.com/sheetmusicimg/Chopin-Prelude-op-28-no-8-page3-51c90bd5af0fc.jpg",
        "http://sheetmusic.pianoshelf.com/sheetmusicimg/Chopin-Prelude-op-28-no-8-page4-51c90bd6b2e20.jpg"
];

var SheetmusicViewer = React.createClass({
  _sheetmusicImage(uri) {
    return (
      <ScrollView
        maximumZoomScale={2.0}
        minimumZoomScale={1.0}
        style={styles.imgWrap}>
        <View><Image style={styles.img} 
        resizeMode={Image.resizeMode.stretch} source={{uri : uri}} /></View>
      </ScrollView>
    );
  },

  render(){
    return (
      <ScrollView
        horizontal={true}
        centerContent={false}
        contentInset={{}}
        alwaysBounceHorizontal={true}
        automaticallyAdjustContentInsets={true}
        pagingEnabled={true}
        style={[styles.scrollView, styles.horizontalScrollView]}>
        {images.map( (uri, i) => this._sheetmusicImage(uri) )}
      </ScrollView>
     )
  }
});

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#6A85B1',
  },
  horizontalScrollView: {
  },
  imgWrap: {
    borderColor: 'rgb(240,240,240)',
    borderWidth: 0,
    padding: 32,
    height: 1020
  },
  img: {
    flex: 1,
    width: 700,
    height: 930,
  }
});

module.exports = SheetmusicViewer;