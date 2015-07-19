'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');
var { AlertIOS } = require('react-native');

var _user = null;

var store = createStore({

  setState(user) {
    _user = user;
  },

  getState() {
    return _user;
  },

  isAnonymousUser() {
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

      case AppConstants.SUCCESSFUL_LOGIN:
        _user = action.data;
        store.emitChange(action);
        break;

      case AppConstants.FAILED_LOGIN:
        var errorMessage = action.data;
        AlertIOS.alert(
            'Login failed',
            errorMessage
        )
        break;
    }

    return true;
  })
});

module.exports = store;
