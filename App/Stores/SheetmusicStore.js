'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');

var _sheetmusicList = [];

var store = createStore({

  setState(sheetmusicList) {
    _sheetmusicList = sheetmusicList;
  },

  getState() {
    return _sheetmusicList;
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.RECEIVE_SHEETMUSIC_DATA:
        _sheetmusicList = action.data;
        store.emitChange(action);
        break;
    }

    return true;
  })
});

module.exports = store;
