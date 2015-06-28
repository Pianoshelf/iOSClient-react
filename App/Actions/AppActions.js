var dispatcher    = require('../../AppDispatcher');
var AppConstants  = require('../Constants/AppConstants');
var API           = require('../Api/api');

module.exports = {
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
