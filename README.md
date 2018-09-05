# nextcloud
`nextcloud` is a node wrapper for the [nextcloud API](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/user_provisioning_api.html). It's designed to be as hassle-free as possible, and encompasses the entire user provisioning API as described [here](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/user_provisioning_api.html).

```js
const NextCloud = require('nextcloud');
var nc = NextCloud("mydomain.net", "username", "password");

// Create user "toto"
nc.users.add("toto", "awesomePassword!", (err, ocs) => {
    // Check for server error
    if (err) {
        console.error(err);
    }
    // Check API status code
    else if (ocs.meta.statuscode != 100) {
        console.error(`Nextcloud error ${ocs.meta.statuscode}: ${ocs.meta.message}`);
    }
    else {
        // User was created successfully. Edit a bunch of their info

    }
```

**WARNING**: This module was developped as part of a larger project, which ended up not being completed. It has therefore *never run in production*. I've tested the `users` namespace fairly exhaustively, but not `groups` and `apps`. Please test it before using in production and make issues with any problems you encounter 💖

# Methods & Documentation
You can find the full documentation [here](https://github.com/atomheartother/node-nextcloud/blob/master/README.md.html).

# License
This module was developed by [Blackfoot](https://blackfoot.io/) and is licensed under the MIT License.