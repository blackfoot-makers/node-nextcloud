# nextcloud
`nextcloud` is a node wrapper for the [nextcloud API](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/user_provisioning_api.html). It's designed to be as hassle-free as possible.

```js
const NextCloud = require('nextcloud');
var nc = NextCloud("mydomain.net", "username", "password");

// Create user "toto"
nc.users.add("toto", "password", (err) => {
    if (err) return;
    // Edit toto's info with chained methods
    nc.users.user("toto").email("toto@mail.com").phone("+33712345678");
});
```

# Copyright
This module was developed by [Blackfoot](https://blackfoot.io/) and is licensed under the MIT License.