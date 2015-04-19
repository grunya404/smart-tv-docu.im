Docuim = {
    baseUrl: 'http://docu.im/api/0.1/',
    filters: {
        page: 1,
        type: null,
        genres: null,
        genresLogic: null,
        years: null,
        title: null,
        limit: 50
    },
    itemsListSuccessHandler: null,
    infoSuccessHandler: null
};

Docuim.getItemsList = function(){
    var url = Docuim.baseUrl + Docuim.generateMovieListUrl();
    Docuim.ajax(url, Docuim.itemsListSuccessHandler)
};

Docuim.loginAndGetItemsList = function(username, password)
{
    var params = {
        username: username,
        password: password
    };
    Docuim.ajax(Docuim.baseUrl + 'auth', Docuim.loginSuccess, params);
};

Docuim.getInfo = function(id) {
    var url = Docuim.baseUrl + 'movie/show/' + id;
    Docuim.ajax(url, Docuim.infoSuccessHandler);
};

Docuim.ajax = function(url, successHandler, params)
{
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.successHandler = successHandler;
    xhr.errorHandler = Main.errorHandler;
    xhr.onreadystatechange = Docuim.ajaxDone;
    params = params || {};

    if (params.username && params.password) {
        xhr.open('post', url, true);
        var formData = new FormData();
        formData.append('username', params.username);
        formData.append('password', params.password);
        xhr.send(formData);
    } else {
        xhr.open('get', url);
        xhr.send();
    }
};

Docuim.ajaxDone = function(event)
{
    var xhr = event.srcElement;
    if (xhr.readyState != 4) { return; }

    try {
        var parsedResponse = JSON.parse(xhr.responseText);
        if (parsedResponse.status == 'error') {
            xhr.errorHandler(parsedResponse.msg);
        } else {
            xhr.successHandler(parsedResponse);
        }
    } catch (e) {
        xhr.errorHandler(e.message);
    }
};

Docuim.loginSuccess = function(response)
{
    if (response.status != 'success' && response.status != 'already') {
        Main.errorHandler(response.status);
    } else {
        // TODO Docuim.loadGenres();
        Docuim.getItemsList();
    }
};

Docuim.generateMovieListUrl = function()
{
    // TODO make it correctly parse genres and years
    var url = 'movie/list';
    Docuim.filtersMap(function(f,filter){
        url += '/' + f + '/' + filter;
    });
    url = (url == '') ? '/' : url;

    return url;
};

Docuim.filtersMap = function(callback)
{
    var filter;
    for (var f in this.filters) {
        filter = this.filters[f];
        if (!this.filters.hasOwnProperty(f)) {
            continue;
        }

        if (filter == null) {
            continue;
        }
        callback(f, filter);
    }
};