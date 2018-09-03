const NextCloud = require('./lib/nextcloud');
var config = require('./config.json');

var nc = NextCloud(config.domain, config.username, config.password);

nc.users.user("test").email("toto@zob.net").phone("0783321567");

nc.users.get("test", (err, body) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(body.ocs.data);
});
