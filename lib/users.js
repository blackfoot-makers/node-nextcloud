var config = require('./config');
var request = require('request');
var helper = require('./helper');

var users = module.exports = {};
const baseUrl = config.baseUrl + "/users";

// Search for users
users.list = (options, callback) => {
    let url = baseUrl + helper.parseOptions(options);
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

// Get an user from their ID
users.get = (userid, callback) => {
    let url = baseUrl + "/" + userid;
    request.get({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

// Get an user from their ID
users.disable = (userid, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + userid + "/disable";
    request.put({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

// Get an user from their ID
users.enable = (userid, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + userid + "/enable";
    request.put({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
};

// Get an user from their ID
users.delete = (userid, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + userid;
    request.delete({
        url : url,
        headers : config.headers
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
};

users.add = (userid, password, callback=config.defaultCallback) => {
    let url = baseUrl;
    request.post({
        url: url,
        headers : config.headers,
        form : {
            "userid":userid,
            "password":password
        }
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

users.edit = (userid, key, value, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + userid;
    request.put({
        url : url,
        headers : config.headers,
        form : {
            "key":key,
            "value": value 
        }
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

users.getGroups = (userid, callback) => {
    let url = baseUrl + "/" + userid + "/groups";
    request.get({
        url : url,
        headers : config.headers,
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

users.addToGroup = (userid, groupid, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + userid + "/groups";
    request.post({
        url : url,
        headers : config.headers,
        form :{
            "groupid" : groupid
        }
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });

}

users.rmFromGroup = (userid, groupid, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + userid + "/groups";
    request.delete({
        url : url,
        headers : config.headers,
        form :{
            "groupid" : groupid
        }
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

users.subadminPromote = (userid, groupid, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + userid + "/subadmins";
    request.post({
        url : url,
        headers : config.headers,
        form : {
            "groupid" : groupid
        }
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

users.subadminDemote = (userid, groupid, callback=config.defaultCallback) => {
    let url = baseUrl + "/" + userid + "/subadmins";
    request.delete({
        url : url,
        headers : config.headers,
        form : {
            "groupid" : groupid
        }
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

users.subadminGetGroups = (userid, callback) => {
    let url = baseUrl + "/" + userid + "/subadmins";
    request.get({
        url : url,
        headers : config.headers,
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

users.welcome = (userid, callback) => {
    let url = baseUrl + "/" + userid + "/welcome";
    request.post({
        url : url,
        headers : config.headers,
    }, (error, response, body) => {
        helper.handleResponse(error, response, body, callback);
    });
}

// This method is used as a shorthand for some methods, allows chaining
users.user = (userid) => {
    var ed = {};
    ed.get = (callback) => {
        users.get(userid, callback);
        return ed;
    };
    ed.delete = (callback=config.defaultCallback) => {
        users.delete(userid, callback);
        return ed;
    };
    ed.disable = (callback=config.defaultCallback) => {
        users.disable(userid, callback);
        return ed;
    };
    ed.enable = (callback=config.defaultCallback) => {
        users.enable(userid, callback);
        return ed;
    };
    ed.email = (email, callback=config.defaultCallback) => {
        users.edit(userid, "email", email, callback);
        return ed;
    };
    ed.quota = (quota, callback=config.defaultCallback) => {
        users.edit(userid, "quota", quota, callback);
        return ed;
    };
    ed.displayname = (displayname, callback=config.defaultCallback) => {
        users.edit(userid, "displayname", displayname, callback);
        return ed;
    };
    ed.phone = (phone, callback=config.defaultCallback) => {
        users.edit(userid, "phone", phone, callback);
        return ed;
    };
    ed.address = (address, callback=config.defaultCallback) => {
        users.edit(userid, "address", address, callback);
        return ed;
    };
    ed.website = (website, callback=config.defaultCallback) => {
        users.edit(userid, "website", website, callback);
        return ed;
    };
    ed.twitter = (twitter, callback=config.defaultCallback) => {
        users.edit(userid, "twitter", twitter, callback);
        return ed;
    };
    ed.password = (password, callback=config.defaultCallback) => {
        users.edit(userid, "password", password, callback);
        return ed;
    };
    ed.groups = (callback) => {
        users.getGroups(userid, callback);
        return ed;
    };
    ed.promote = (callback=config.defaultCallback) => {
        users.subadminPromote(userid, callback);
        return ed;
    };
    ed.demote = (callback=config.defaultCallback) => {
        users.subadminDemote(userid, callback);
        return ed;
    };
    ed.welcome = (callback=config.defaultCallback) => {
        users.welcome(userid, callback);
        return ed;
    };
    return ed;
};