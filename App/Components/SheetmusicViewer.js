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


var SheetmusicViewer = React.createClass({

  getInitialState() {
    return {
      images: []
    };
  },

  componentWillMount() {
    var images = this.props.sheetmusic.images.map( imgUrl => {
      return `http:${imgUrl}`;
    });
    this.setState({
      images: images
    });
  },

  _sheetmusicImage(uri) {
    return (
      <ScrollView
        maximumZoomScale={2.0}
        minimumZoomScale={1.0}
        style={styles.imgWrap}>
        <View>
          <Image style={styles.img} 
          resizeMode={Image.resizeMode.stretch} 
          source={{uri : uri}} />
        </View>
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
        {this.state.images.map( (uri, i) => this._sheetmusicImage(uri) )}
      </ScrollView>
     )
  }
});

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'rgb(50,50,50)',
  },
  horizontalScrollView: {
  },
  imgWrap: {
    borderColor: 'rgb(240,240,240)',
    borderWidth: 0,
    padding: 33,
    height: 1020
  },
  img: {
    flex: 1,
    width: 700,
    height: 930,
  }
});

module.exports = SheetmusicViewer;