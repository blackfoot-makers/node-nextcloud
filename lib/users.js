var config = require('./config');
var request = require('request');
const parseString = require('xml2js').parseString;

var users = module.exports = {};
const baseUrl = config.baseUrl + "/users";

// Helper function which takes a user callback awaiting an error message, no body
function handleResponseNoBody(error, response, body, callback) {
    if (error) {
        if (callback) callback(error);
        return;
    }
    if (response.statusCode != 100) {
        if (callback) callback({code: response.statusCode, message: response.statusMessage});
        return;
    }
    parseString(body, (err) => {
        callback(err);
    });
};

// Search for users
users.search = (name, callback) => {
    let url = name ? baseUrl + "?search=" + name : baseUrl;
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        if (error) {
            callback(error, body);
            return;
        }
        parseString(body, (err, result) => {
            callback(err, result);
            return;
        });
    });
};

// Get an user from their ID
users.get = (id, callback) => {
    let url = baseUrl + "/" + id;
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        if (error) {
            callback(error, body);
            return;
        }
        parseString(body, (err, result) => {
            callback(err, result);
            return;
        });
    });
};

// Get an user from their ID
users.disable = (id, callback=null) => {
    let url = baseUrl + "/" + id + "/disable";
    request.put({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        handleResponseNoBody(error, response, body, callback);
    });
};

// Get an user from their ID
users.enable = (id, callback=null) => {
    let url = baseUrl + "/" + id + "/enable";
    request.put({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        handleResponseNoBody(error, response, body, callback);
    });
};

// Get an user from their ID
users.delete = (id, callback=null) => {
    let url = baseUrl + "/" + id;
    request.delete({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        handleResponseNoBody(error, response, body, callback);
    });
};

users.add = (username, password, callback=null) => {
    let url = baseUrl;
    request.post({
        url: url,
        headers : config.headers,
        form : {
            "userid":username,
            "password":password
        }
    }, (error, response, body) => {
        handleResponseNoBody(error, response, body, callback);
    });
};

users.edit = (username, key, value, callback=null) => {
    let url = baseUrl + "/" + username;
    request.put({
        url : url,
        headers : config.headers,
        form : {
            "key":key,
            "value": value 
        }
    }, (error, response, body) => {
        handleResponseNoBody(error, response, body, callback);
    });
}


// This method is used as a shorthand for some methods, allows chaining and optional parameters
users.user = (username) => {
    var ed = {};
    ed.email = (email, callback=null) => {
        users.edit(username, "email", email, callback);
        return ed;
    };
    ed.quota = (quota, callback=null) => {
        users.edit(username, "quota", quota, callback);
        return ed;
    };
    ed.displayname = (displayname, callback=null) => {
        users.edit(username, "displayname", displayname, callback);
        return ed;
    };
    ed.phone = (phone, callback=null) => {
        users.edit(username, "phone", phone, callback);
        return ed;
    };
    ed.address = (address, callback=null) => {
        users.edit(username, "address", address, callback);
        return ed;
    };
    ed.website = (website, callback=null) => {
        users.edit(username, "website", website, callback);
        return ed;
    };
    ed.twitter = (twitter, callback=null) => {
        users.edit(username, "twitter", twitter, callback);
        return ed;
    };
    ed.password = (password, callback=null) => {
        users.edit(username, "password", password, callback);
        return ed;
    };
    return ed;
};