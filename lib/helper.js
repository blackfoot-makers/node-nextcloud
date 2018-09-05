var helper = module.exports = {};

helper.handleResponse = (error, response, body, callback) => {
    if (error) {
        callback(error, null);
        return;
    }
    if (response.statusCode != 200) {
        callback({code: response.statusCode, message: response.statusMessage}, null);
        return;
    }
    body = JSON.parse(body);
    if (body && body.ocs && body.ocs.meta) { // Response is well-formed
        callback(null, body.ocs);
    }
    else { // Server said everything's fine but response is malformed
        callback({code: 500, message: "The server said everything was fine but returned a malformed body. This should never happen."})
    }
}

// Takes a bunch of options and formats them to be URL parameters
helper.parseOptions = (options) => {
    let urlparams = "";
    for (let i=0 ; i<options.getOwnPropertyNames().length ; i++)
    {
        let key = options.getOwnPropertyNames()[i];
        urlparams = urlparams.concat(i == 0 ? "?" : "&").concat(`${key}=${options[key]}`);
    }
    return urlparams;
}