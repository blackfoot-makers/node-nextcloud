# nextcloud
`nextcloud` is a node wrapper for the [nextcloud API](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/user_provisioning_api.html). It's designed to be as hassle-free as possible.

```js
const NextCloud = require('nextcloud');
var nc = NextCloud("mydomain.net", "username", "password");

// Create user "toto"
nc.users.add("toto", "awesomePassword!", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    // Edit toto's info with chained methods. These execute concurrently, not sequentially. Each of them is a call to the API.
    // You don't have to provide a callback to methods that don't return any data other than an error
    nc.users.user("toto").email("toto@mail.com").phone("+33712345678");
    // ...but you can if you want to!
    nc.users.user("tata").email("8 Placeholder Rd.", console.error);
```

# Methods

- When a callback has a `body` parameter, it is already a JS object, you don't need to parse anything. It is the JS equivalent of the XML in the documentation, including the top-level "ocs" field.
- Some callbacks are optional, these are callbacks which take one parameter, the error. The library signifies here that the server's answer can only be either "OK" or an error message, there's no data. If you don't provide the library with a callback, it'll use the default callback, printing any occuring error:
```js
defaultCallback = (err)=>{if (err) console.error(err);}
```
The default callback can't be changed (yet).

## The nc Object
- `NextCloud(<domain name>, <userid>, <password>, [https=true])`
This method returns the object hereafter referred to as `nc`, which we use to interact with the nextcloud API.
```js
const NextCloud = require('nextcloud');
var nc = NextCloud("mydomain.net", "username", "password");
```

## Users
All these methods are accessed through `nc.users.X` (for method `X`). These methods all match the API calls [here](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/instruction_set_for_users.html).

- `add(<userid>, <password>, [callback(err)])`: Create a new user with the given userid and password. If you intend to test this, remember this call can fail if the password is too common! If err is null, everything went fine.

```js
nc.users.add("toto", "awesomePassword!", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    else
        console.log("User added!");
}
```

- `list(<options>, <callback(err, body)>)`: This method, without any options, returns a list of all users. Options is an object which can have three keys set:
- **search** : The search string. This will narrow down the list, turning this function into a search function. Not set by default.
- **limit** : The *integer* limit of users to return. Not set by default.
- **offset** : The *integer* offset to apply to the list of returned users. Not set by default.

```js
// Get all users
nc.users.list(null, (err, body)=>{
    if (err) {
        console.error(err);
        return;
    }
    // Prints the user list
    console.log(body.ocs.data.users);
});

// Get the three top users matching "tom"
nc.users.list({"search":"tom", "limit": 3}, (err, body)=> {
    if (err) {
        console.error(err);
        return;
    }
    // body contains the server's response if err == null    
    console.log(body.ocs.data.users);
});
```

- `get(<userid>, <callback(err, body)>)`: Gets an user's information from their userid.

- `disable(<userid>, [callback(err)])`: Disables an user. If err is null, the call was successful.

- `disable(<userid>, [callback(err)])`: Enables an user. If err is null, the call was successful.

- `delete(<userid>, [callback(err)])`: Deletes an user. If err is null, the call was successful.

-  `edit(<userid>, <key>, <value>, [callback(err)])`: Edits a user's information. Key and value follow the possible values in the documentation. Note that all values are strings, even the quota (It shoudld be the string "5G", not the number 5).
```js
nc.users.edit("toto", "email", "totonewemail@domain.net", (err)=>{
    if (err)
        console.error(err);
    else
        console.log("Email edited");
});
```

- `user(<userid>)`: Returns an object which can be used for shorthand methods. Most methods in this namespace can either be used with a long or a short method. The short methods allow for chaining and shorten multiple calls to the API greatly. This function does not cause an API call.

```js
// Get the "username" user object
var user = nc.users.user("username");
// Call the shorthand email editing function
user.email("user@mail.com");

// All shorthand functions can be chained
user.address("8 Placeholder Rd.").phone("0742424242").quota("5GB");

// Call shorthand "get" function
user.get((err, body)=>{
    // Body contains the user's information if the call was successful
});
// Call shorthand delete function
user.delete(); // We don't have to provide a callback if we don't care to wait for the call to be done, nor care about the result being positive.
````

# Copyright
This module was developed by [Blackfoot](https://blackfoot.io/) and is licensed under the MIT License.