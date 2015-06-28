var dispatcher    = require('../../AppDispatcher');
var AppConstants  = require('../Constants/AppConstants');
var API           = require('../Util/Api');
var Library       = require('../Util/Library');

module.exports = {

  // Sheetmusic Library

  initializeSheetmusicLibrary() {
    Library.getAllSheetmusic()
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

};
