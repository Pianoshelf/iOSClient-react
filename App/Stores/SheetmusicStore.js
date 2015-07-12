'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');

var _sheetmusicList = [];
var _tagList = [];
var _artistList = [];
var _difficultyList = [];
var _isLoaded = true;

var store = createStore({

  getState() {
    return {
      sheetmusicList: _sheetmusicList,
      styles: _tagList,
      difficultyTags: _difficultyList,
      isLoaded: _isLoaded,
      artists: _artistList
    }
  },

  setState(sheetmusicList) {
    _sheetmusicList = sheetmusicList;
  },

  dispatcherIndex: dispatcher.register((payload) => {

    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.RECEIVE_SHEETMUSIC_DATA:
        _sheetmusicList = action.data;
        store.emitChange(action);
        break;
      case AppConstants.RECEIVE_CATEGORIES:
        _tagList = action.data;
        store.emitChange(action);
        break;
      case AppConstants.RECEIVE_ARTISTS:
        _artistList = action.data;
        store.emitChange(action);
        break;
      case AppConstants.RECEIVE_DIFFICULTIES:
        _difficultyList = action.data;
        store.emitChange(action);
        break;
      case AppConstants.SELECT_TAG:
        if (action.data.tagType === "categories") {
          for (var i = 0; i < _tagList.length; i++) {
            if (_tagList[i].tagName == action.data.tagName) {
              _tagList[i].selected = !_tagList[i].selected;
            }
          }
        }
        else if (action.data.tagType === "difficulty") {
          for (var i = 0; i < _difficultyList.length; i++) {
            if (_difficultyList[i].tagName == action.data.tagName) {
              _difficultyList[i].selected = ! _difficultyList[i].selected;
            }
          }
        }
        else if (action.data.tagType === "artists") {
          for (var i = 0; i < _artistList.length; i++) {
            if (_artistList[i].tagName == action.data.tagName) {
              _artistList[i].selected = !_artistList[i].selected;
            }
          }
        }
        store.emitChange(action);
        break;
    }

    return true;
  })
});

module.exports = store;
