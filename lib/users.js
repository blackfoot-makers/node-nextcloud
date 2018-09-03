var config = require('./config');
var request = require('request');
var parseString = require('xml2js').parseString;

var users = module.exports = {};
const baseUrl = config.baseUrl + "/users";

users.search = (name, userCallback) => {
    let url = name ? baseUrl + "?search=" + name : baseUrl;
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        if (!!error) {
            userCallback(error, body);
            return;
        }
        parseString(body, (err, result) => {
            userCallback(err, result);
            return;
        });
    });
}