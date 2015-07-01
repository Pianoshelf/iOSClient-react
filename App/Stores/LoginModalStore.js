'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');

var _loginModalOpen = false;
var _loginModalMessage = null;

var store = createStore({

  setState(loginModalOpen) {
    _loginModalOpen = loginModalOpen;
  },

  getState() {
    return {
      loginModalOpen: _loginModalOpen,
      message: _loginModalMessage
    }
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.TOGGLE_LOGIN_MODAL:
        console.log(action.loginModalOpen);
        _loginModalOpen = action.loginModalOpen;
        store.emitChange(action);
        break;
    }

    return true;
  })
});

module.exports = store;
