var API_URL = "https://www.pianoshelf.com/api";
var API_AUPH_URL = "https://www.pianoshelf.com/api-auth";

var queryString = require('query-string');

var api = {
    getSheetmusicList(orderBy, page, pageSize) {
        var url = `${API_URL}/sheetmusic?order_by=${orderBy}&page_size=${pageSize}&page=${page}`;
        return fetch(url).then((res) => res.json());
    },
    getSheetmusicDetails(id) {
        var url = `${API_URL}/sheetmusic/${id}`;
        return fetch(url).then((res) => res.json());
    },

    login(username, password) {
        var url = `${API_AUPH_URL}/login/`;

        return fetch(url, {
            method: 'POST',
            body: queryString.stringify({
                username: username,
                password: password
            })
        });
    },

    register(username, password) {
        var url = `${API_AUPH_URL}/register/`;
        return fetch(url);
    }
}

module.exports = api;
