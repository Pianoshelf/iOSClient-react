'use strict';

var createStore    = require('flux-util').createStore;
var dispatcher     = require('../../AppDispatcher');
var AppConstants   = require('../Constants/AppConstants');
var StorageWrapper = require('../Util/StorageWrapper');

var _sheetmusicLibrary = [];

var store = createStore({

  setState(sheetmusicList) {
    _sheetmusicLibrary = sheetmusicList;
  },

  getState() {
    return _sheetmusicLibrary;
  },

  hasSheetmusicWithId(id) {
    var sheetmusic = _sheetmusicLibrary.filter((el) => {
      return el.id === id;
    });
    return sheetmusic.length > 0;
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.LOAD_SHEETMUSIC_LIBRARY:
        _sheetmusicLibrary = action.data;
        store.emitChange(action);
        break;

      case AppConstants.ADD_SHEETMUSIC_TO_LIBRARY:
        var sheetmusic = action.data;
        _sheetmusicLibrary.push(sheetmusic);

        StorageWrapper.setSheetmusic(_sheetmusicLibrary)
        .then(() => { store.emitChange(action) });
        break;

      case AppConstants.REMOVE_SHEETMUSIC_FROM_LIBRARY:
        var removeSheetmusicId = action.data;
        _sheetmusicLibrary = _sheetmusicLibrary.filter((el) => {
          return el.id !== removeSheetmusicId;
        })

        StorageWrapper.setSheetmusic(_sheetmusicLibrary)
        .then(() => { store.emitChange(action) });
        break;
    }

    return true;
  })
});

module.exports = store;
