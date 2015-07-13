var dispatcher     = require('../../AppDispatcher');
var AppConstants   = require('../Constants/AppConstants');
var API            = require('../Util/Api');
var StorageWrapper = require('../Util/StorageWrapper');

module.exports = {

  // Sheetmusic Library

  initializeSheetmusicLibrary() {
    StorageWrapper.getAllSheetmusic()
    .then((value) => {

      var sheetmusic = [];
      if (value !== null) {
        sheetmusic = JSON.parse(value);
      }

      dispatcher.handleViewAction({
        actionType: AppConstants.LOAD_SHEETMUSIC_LIBRARY,
        data: sheetmusic,
      })
    })
    .done();
  },

  addSheetmusicToLibrary(sheetmusic) {
    dispatcher.handleViewAction({
      actionType: AppConstants.ADD_SHEETMUSIC_TO_LIBRARY,
      data: sheetmusic,
    })
  },

  removeSheetmusicFromLibrary(id) {
    dispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_SHEETMUSIC_FROM_LIBRARY,
      data: id,
    })
  },

  // Sheetmusic Browse

  receiveInitialSheetmusicData(options) {
    API.getSheetmusicList(options.orderBy, options.page, options.pageSize)
    .then((res) => {
      dispatcher.handleViewAction({
        actionType: AppConstants.RECEIVE_SHEETMUSIC_DATA,
        data: res.results,
      })
    });
  },

  receiveInitialCategoryList(options) {

    // TODO: load from API
    var data = ["Sonata", "Anime", "Pop", "Classical"];
    data = data.map( (tag) => { return {tagName: tag, selected: false} } );

    console.log(data);

    dispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_CATEGORIES,
      data: data,
    });
  },

  receiveInitialArtistList(options) {

    // TODO: load from API
    var data = ["Beethoven", "Mozart", "Chopin"];
    data = data.map( (tag) => { return {tagName: tag, selected: false} } );

    dispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_ARTISTS,
      data: data,
    });
  },

  receiveInitialDifficultyList(options) {

    // TODO: load from API
    var data = ["Beginner","Intermediate","Difficult","Advanced","Expert"];
    data = data.map( (tag) => { return {tagName: tag, selected: false} } );

    dispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_DIFFICULTIES,
      data: data,
    });
  },

  receiveSearchTerm(searchTerm) {
    dispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_SEARCH_TERM,
      data: searchTerm,
    });
  },

  selectTag(tagType, tagName) {
    dispatcher.handleViewAction({
      actionType: AppConstants.SELECT_TAG,
      data: {tagType: tagType, tagName: tagName},
    });
  },

  // User

  loadUser() {
    StorageWrapper.getUser()
    .then((value) => {

      var user = null;
      if (value !== null) {
        user = JSON.parse(value);
      }

      dispatcher.handleViewAction({
        actionType: AppConstants.LOAD_USER,
        data: user,
      });
    })
  },

  skipLogin() {
    StorageWrapper.setUser('Anonymous', null)
    .then(() => {

      var user = {
        username: 'Anonymous',
        password: null
      }

      dispatcher.handleViewAction({
        actionType: AppConstants.SKIP_LOGIN,
        data: user
      });
    });
  },

  // Login Modal

  toggleLoginModal(loginModalOpen) {
    dispatcher.handleViewAction({
      actionType: AppConstants.TOGGLE_LOGIN_MODAL,
      loginModalOpen: loginModalOpen
    });
  }

};
