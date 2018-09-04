const NextCloud = require('./lib/nextcloud');
var config = require('./config.json');

var nc = NextCloud(config.domain, config.username, config.password);

nc.users.list({"search":"tom", "limit": 3}, (err, body)=> {
    if (err) {
        console.error(err);
        return;
    }
    console.log(body.ocs.data[0].users[0].element);
});
