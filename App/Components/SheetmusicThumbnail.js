'use strict';

var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
  Image
} = React;

class Thumbnail extends React.Component {
    prepareTitle(sheetmusic) {
        return `${sheetmusic.title} by ${sheetmusic.composer_name}`;
    }
    render() {
        return (
            <View style={styles.item}>
                <Image style={styles.image} source={{uri: 'http:'+this.props.sheetmusic.thumbnail_url }} />
                <Text style={styles.sheetmusicText}>{ this.prepareTitle(this.props.sheetmusic) }</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    item: {
        margin: 10,
        padding: 5,
        width: 200
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

module.exports = Thumbnail;