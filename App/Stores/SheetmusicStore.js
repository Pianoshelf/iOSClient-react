'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');

var _searchTerm = "";
var _sheetmusicList = [];
var _tagList = [];
var _artistList = [];
var _difficultyList = [];
var _isLoaded = true;

var store = createStore({

  getState() {
    return {
      searchTerm: _searchTerm,
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

  constructQueryString() {
    var queryString = undefined;
    var firstQuery = true;

    var tagList = _tagList.filter(function(tag) { return tag.selected })
                          .map(function(tag) { return tag.tagName });
    var artistList = _artistList.filter(function(tag) { return tag.selected })
                                 .map(function(tag) { return tag.tagName });
    var difficultyList = _difficultyList.filter(function(tag) { return tag.selected })
                                        .map(function(tag) { return tag.tagName });

    if (_searchTerm !== "") {
      if (firstQuery) { queryString = '?' } else { queryString = queryString + '&' };
      queryString = queryString + "search=" + _searchTerm;
      firstQuery = false;
    }
    if (tagList.length > 0) {
      if (firstQuery) { queryString = '?' } else { queryString = queryString + '&' };
      queryString = queryString + "categories=" + tagList.join(',');
      firstQuery = false;
    }
    if (artistList.length > 0) {
      if (firstQuery) { queryString = '?' } else { queryString = queryString + '&' };
      queryString = queryString + "artists=" + artistList.join(',');
      firstQuery = false;
    }
    if (difficultyList.length > 0) {
      if (firstQuery) { queryString = '?' } else { queryString = queryString + '&' };
      queryString = queryString + "difficulties=" + difficultyList.join(',');
    }

    return queryString;
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
      case AppConstants.RECEIVE_SEARCH_TERM:
        _searchTerm = action.data;
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
