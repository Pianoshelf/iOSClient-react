var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');

module.exports = {
  receiveSheetmusicData(sheetmusicList) {
    dispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_SHEETMUSIC_DATA,
      data: sheetmusicList,
    });
  },
};
