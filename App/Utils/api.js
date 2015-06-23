var API_URL = "https://www.pianoshelf.com/api";

var api = {
    getSheetmusicList() {
        var url = `${API_URL}/sheetmusic?page_size=10`;
        return fetch(url).then((res) => res.json());
    }
}

module.exports = api;
