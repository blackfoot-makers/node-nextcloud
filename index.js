const NextCloud = require('./lib/nextcloud');
var config = require('./config.json');

var nc = NextCloud(config.domain, config.username, config.password);

nc.users.search("", (err, body) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(body.ocs.data[0].users);
});

module.exports = require('./lib/nextcloud');