var keyMirror = require('keyMirror');

// Define action constants
module.exports = keyMirror({
  LOAD_SHEETMUSIC_LIBRARY: true,        // Loads initial sheetmusic library.
  ADD_SHEETMUSIC_TO_LIBRARY: true,      // Adds a sheetmusic to the existing library.
  REMOVE_SHEETMUSIC_FROM_LIBRARY: true, // Adds a sheetmusic to the existing library.
  RECEIVE_CATEGORIES: true,
  RECEIVE_ARTISTS: true,
  RECEIVE_DIFFICULTIES: true,
  RECEIVE_SEARCH_TERM: true,
  SELECT_TAG: true,

  RECEIVE_SHEETMUSIC_DATA: true,        // Loads initial sheetmusic list.
  DOWNLOAD_SHEETMUSIC: true,            // Downloads sheetmusic onto local storage. 

  LOAD_USER: true,
  SKIP_LOGIN: true,

  TOGGLE_LOGIN_MODAL: true,
});
