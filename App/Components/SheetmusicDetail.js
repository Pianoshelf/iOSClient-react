'use strict';

var React = require('react-native');
var API = require('../Api/api');

var {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicatorIOS,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 45
  },
  item: {
    margin: 10,
    padding: 5,
    width: 300
  },
  loading: {
    flex: 1,
    backgroundColor: 'rgb(50,50,50)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    paddingTop: 5,
    paddingLeft: 5,
    fontWeight: 'bold',
    fontSize: 28
  },
  textSubheading: {
    paddingLeft: 5,
    paddingTop: 2,
    fontSize: 22,
    color: 'rgb(50,50,50)'
  },
  sheetmusicImage: {
    width: 350,
    height: 450
  },
  box: {
    borderColor: 'rgb(220,220,220)',
    borderWidth: 1,
    padding: 5,
    margin: 15,
    shadowColor: 'rgb(200,200,200)',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 5,
    shadowRadius: 5
  },
  downloadButton: {
    backgroundColor: 'rgb(80,180,80)', 
    padding: 5, 
    width: 120
  }
});

var SheetmusicDetail = React.createClass({

  getInitialState() {
    return {
      sheetmusic: null,
      isLoaded: false
    };
  },
  componentWillMount() {
    console.log(this.props.sheetmusicId);

    API.getSheetmusicDetails(this.props.sheetmusicId)
    .then((sheetmusic) => {

      this.setState({
        sheetmusic: sheetmusic,
        isLoaded: true
      })
    });
  },
  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={ styles.loading }>
          <Text style={ styles.loadingText }>Loading</Text>
          <ActivityIndicatorIOS />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.textTitle}>{ this.state.sheetmusic.title }</Text>
            <Text style={styles.textSubheading}>{ this.state.sheetmusic.composer_name }</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View>
                <Image style={styles.sheetmusicImage} source={{uri: 'http:'+this.state.sheetmusic.thumbnail_url }} />
              </View>
              <View>
                <Text style={{fontSize: 18}}>{ this.state.sheetmusic.submitted_by }</Text>
                <Text style={{fontSize: 18}}>{ this.state.sheetmusic.view_count }</Text>
                <Text style={{fontSize: 18}}>{ this.state.sheetmusic.key }</Text>
                <Text style={{fontSize: 18, flex: 1, flexWrap: 'wrap', width: 200}}>{ this.state.sheetmusic.license }</Text>
                <TouchableHighlight underlayColor="rgba(80,180,80,.5)" style={styles.downloadButton}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Download</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }
});

module.exports = SheetmusicDetail;