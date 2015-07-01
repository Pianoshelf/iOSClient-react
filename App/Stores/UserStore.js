'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');

var _user = null;

var store = createStore({

  setState(user) {
    _user = user;
  },

  getState() {
    return _user;
  },

  isAnonymous() {
    return _user != null && _user.username === 'Anonymous';
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.LOAD_USER:
        _user = action.data;
        store.emitChange(action);
        break;

      case AppConstants.SKIP_LOGIN:
        _user = action.data;
        store.emitChange(action);
        break;
    }

    return true;
  })
});

module.exports = store;
