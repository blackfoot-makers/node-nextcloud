# nextcloud
`nextcloud` is a node wrapper for the [nextcloud API](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/user_provisioning_api.html).

```js
const NextCloud = require('nextcloud');
var nc = NextCloud("mydomain.net", "username", "password");

// Search for users, the empty string just means we should return a list of all users
nc.users.search("", (err, body) => {
    if (err) {
        console.error(err);
        return;
    }
    // Response is an object already, no need to parse
    console.log(body.ocs.data[0].users);
});
```

# Copyright notice
This module was developed by the team over at [Blackfoot](https://blackfoot.io/).