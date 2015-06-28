var React = require('react-native');
var { AsyncStorage } = React;  

var SHEETMUSIC_KEY = 'SHEETMUSIC';

// Library performs actions on the currently 
// stored sheetmusic on the device
var Library = {
  setSheetmusic(sheetmusicList) {
    return AsyncStorage.setItem(SHEETMUSIC_KEY, JSON.stringify(sheetmusicList));
  },
  getAllSheetmusic() {
    return AsyncStorage.getItem(SHEETMUSIC_KEY);
  }
}

module.exports = Library;
