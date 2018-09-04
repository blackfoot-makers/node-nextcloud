var config = require('./config');
var request = require('request');
const parseString = require('xml2js').parseString;

var users = module.exports = {};
const baseUrl = config.baseUrl + "/users";

// Helper function which takes a user callback awaiting an error message, no body
function handleResponseNoBody(error, response, body, callback) {
    if (error) {
        callback(error);
        return;
    }
    if (response.statusCode != 200) { //  HTTP response code isn't 200 OK, server might be down
        callback({code: response.statusCode, message: response.statusMessage});
        return;
    }
    parseString(body, (err, body) => {
        if (err) {
            callback(err);
            return;
        }
        if (body && body.ocs && body.ocs.meta) { // Response is well-formed
            let statuscode = parseInt(body.ocs.meta[0].statuscode[0], 10);
            if (statuscode != 100) { // Status code returned by server isn't 100 (OK)
                callback({code: statuscode, message: body.ocs.meta[0].message[0]});
                return;
            }
            callback(null);
        }
        else // Server said everything's fine but response is malformed
            callback({code: 0, message: "The server said everything was fine but returned a malformed body. This should never happen."})
    });
};

// Search for users
users.list = (options, callback) => {
    let url = baseUrl;
    if (options) {
        let queries = [];
        if (options.hasOwnProperty("search")) {
            queries.push(`search=${options.search}`);
        }
        if (options.hasOwnProperty("limit")) {
            queries.push(`limit=${options.limit}`);
        }
        if (options.hasOwnProperty("offset")) {
            queries.push(`offset=${options.limit}`);
        }
        for (let i=0 ; i<queries.length ; i++) {
            url = url.concat(i == 0 ? "?" : "&").concat(queries[i]);
        }
    }
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
users.disable = (id, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + id + "/disable";
    request.put({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        handleResponseNoBody(error, response, body, callback);
    });
};

// Get an user from their ID
users.enable = (id, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + id + "/enable";
    request.put({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        handleResponseNoBody(error, response, body, callback);
    });
};

// Get an user from their ID
users.delete = (id, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + id;
    request.delete({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        handleResponseNoBody(error, response, body, callback);
    });
};

users.add = (username, password, callback=config.defaultCallback) => {
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

users.edit = (username, key, value, callback=config.defaultCallback) => {
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


// This method is used as a shorthand for some methods, allows chaining
users.user = (username) => {
    var ed = {};
    ed.get = (callback) => {
        users.get(username, callback);
        return ed;
    };
    ed.delete = (callback=config.defaultCallback) => {
        users.delete(username, callback);
        return ed;
    };
    ed.disable = (callback=config.defaultCallback) => {
        users.disable(username, callback);
        return ed;
    };
    ed.enable = (callback=config.defaultCallback) => {
        users.enable(username, callback);
        return ed;
    };
    ed.email = (email, callback=config.defaultCallback) => {
        users.edit(username, "email", email, callback);
        return ed;
    };
    ed.quota = (quota, callback=config.defaultCallback) => {
        users.edit(username, "quota", quota, callback);
        return ed;
    };
    ed.displayname = (displayname, callback=config.defaultCallback) => {
        users.edit(username, "displayname", displayname, callback);
        return ed;
    };
    ed.phone = (phone, callback=config.defaultCallback) => {
        users.edit(username, "phone", phone, callback);
        return ed;
    };
    ed.address = (address, callback=config.defaultCallback) => {
        users.edit(username, "address", address, callback);
        return ed;
    };
    ed.website = (website, callback=config.defaultCallback) => {
        users.edit(username, "website", website, callback);
        return ed;
    };
    ed.twitter = (twitter, callback=config.defaultCallback) => {
        users.edit(username, "twitter", twitter, callback);
        return ed;
    };
    ed.password = (password, callback=config.defaultCallback) => {
        users.edit(username, "password", password, callback);
        return ed;
    };
    return ed;
};