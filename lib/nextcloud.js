var config = require('./config');

module.exports = (domain, username, password, https=true) => {
    var NC = {};
    const protocol = https ? "https" : "http";

    config.baseUrl = `${protocol}://${username}:${password}@${domain}/ocs/v1.php/cloud`
    NC.users = require('./users');
    return NC;
}

