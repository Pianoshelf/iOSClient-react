var React = require('react-native');
var { AsyncStorage } = React;  

var SHEETMUSIC_KEY = 'SHEETMUSIC';
var USER_KEY = 'USER';
var ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

// Library performs actions on the currently 
// stored sheetmusic on the device
var Library = {
  setSheetmusic(sheetmusicList) {
    return AsyncStorage.setItem(SHEETMUSIC_KEY, JSON.stringify(sheetmusicList));
  },
  getAllSheetmusic() {
    return AsyncStorage.getItem(SHEETMUSIC_KEY);
  },
  setUser(user) {
    return AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser() {
    return AsyncStorage.getItem(USER_KEY);
  },
  setAccessToken(accessToken) {
    return AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  },
  getAccessToken() {
    return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  }
}

module.exports = Library;
