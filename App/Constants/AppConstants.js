var keyMirror = require('keyMirror');

// Define action constants
module.exports = keyMirror({
  RECEIVE_SHEETMUSIC_DATA: true,  // Loads initial sheetmusic list
  DOWNLOAD_SHEETMUSIC: true,      // Downloads sheetmusic onto local storage 
});
