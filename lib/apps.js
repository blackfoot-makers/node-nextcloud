var config = require('./config');
var request = require('request');
var helper = require('./helper');

var apps = module.exports = {};
const baseUrl = config.baseUrl + "/apps";

apps.list = (options, callback) => {
    let url = baseUrl.concat(helper.parseOptions(options));
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

apps.info = (appid, callback) => {
    let url = baseUrl.concat("/" + appid);
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

apps.enable = (appid, callback) => {
    let url = baseUrl.concat("/" + appid);
    request.post({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

apps.disable = (appid, callback) => {
    let url = baseUrl.concat("/" + appid);
    request.delete({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}