var API_URL = "https://www.pianoshelf.com/api";

var api = {
    getSheetmusicList(orderBy, page, pageSize) {
        var url = `${API_URL}/sheetmusic?order_by=${orderBy}&page_size=${pageSize}&page=${page}`;
        return fetch(url).then((res) => res.json());
    },
    getSheetmusicDetails(id) {
    	var url = `${API_URL}/sheetmusic/${id}`;
    	return fetch(url).then((res) => res.json());
    }
}

module.exports = api;
