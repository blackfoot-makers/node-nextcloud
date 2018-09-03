# nextcloud
`nextcloud` is a node wrapper for the [nextcloud API](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/user_provisioning_api.html). It's designed to be as hassle-free as possible.

```js
const NextCloud = require('nextcloud');
var nc = NextCloud("mydomain.net", "username", "password");

// Search for users, the empty string just means we should return a list of all users
nc.users.search("", (err, body) => {
    if (err) {
        console.error(err);
        return;
    }
    // body is an object already, no need to parse
    // We display the list of users. The structure is the same as the XML in NextCloud's documentation
    console.log(body.ocs.data[0].users);
});

// Helper methods to edit user data
nc.users.editUser("toto").email("toto@mail.com").phone("+33712345678");

// Or use plain old methods that mirror the api
nc.users.edit("toto", "email", "toto@mail.com");
nc.users.edit("toto", "phone", "+33712345678");
```

# Copyright
This module was developed by [Blackfoot](https://blackfoot.io/) under the MIT License.