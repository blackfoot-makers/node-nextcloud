var config = require('./config');
var request = require('request');
var helper = require('./helper');

var groups = module.exports = {};
const baseUrl = config.baseUrl + "/groups";

groups.list = (options, callback) => {
    let url = baseUrl + helper.parseOptions(options);
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

groups.add = (groupid, callback) => {
    let url = baseUrl;
    request.post({
        url: url,
        headers : config.headers,
        form : {
            "groupid":groupid,
        }
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

groups.members = (groupid, callback) => {
    let url = baseUrl + "/" + groupid;
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

groups.subadmins = (groupid, callback) => {
    let url = baseUrl + "/" + groupid + "/subadmins";
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

groups.delete = (groupid, callback) => {
    let url = baseUrl + "/" + groupid;
    request.delete({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}