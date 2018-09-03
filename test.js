const NextCloud = require('./lib/nextcloud');
var config = require('./config.json');

var nc = NextCloud(config.domain, config.username, config.password);

// Create user "toto"
nc.users.add("toto", "awesomePassword!", (err) => {
    if (err) {
        console.error("Error " + err.code + ": " + err.message);
        return;
    }
    // Edit toto's info with chained methods. These happen concurrently.
    // You don't have to provide a callback to methods that don't return any data other than an error
    nc.users.user("toto").email("toto@mail.com").phone("+33712345678");
    // ...but you can if you want to!
    nc.users.user("tata").address("8 Placeholder Rd.", console.error);
});
