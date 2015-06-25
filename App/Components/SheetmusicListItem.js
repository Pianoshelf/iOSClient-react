'use strict';

var React = require('react-native');
var {
  Text,
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
    item: {
        marginTop: 3,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 5,
        paddingLeft: 5,
        backgroundColor: 'white',
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
        padding: 2,
    }
});

class ListItem extends React.Component {
    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.titleText}>{ this.props.sheetmusic.title }</Text>
                <View style={{flexDirection: 'row', display: 'flex'}}>
                    <Text style={styles.composerText}>{ this.props.sheetmusic.composer_name }</Text>
                    <View style={{backgroundColor: 'rgb(200,50,50)'}}>
                        <Text style={styles.difficultyText}>Advanced</Text>
                    </View>
                </View>
            </View>
        )
    }
}

module.exports = ListItem;