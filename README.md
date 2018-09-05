# node-nextcloud
`node-nextcloud` is a node wrapper for the [nextcloud API](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/user_provisioning_api.html). It's designed to be a lightweight module and a hassle-free experience.
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
        console.log("User created!");   
    }
}
```

**WARNING**: This module was developped as part of a larger project, which ended up not being completed. It has therefore *never run in production*. I've tested the `users` namespace fairly exhaustively, but not `groups` and `apps`. Please test it before using in production and make issues with any problems you encounter 💖

# Methods
**Important notes**:
- When a callback has an `ocs` parameter, it is already a JS object, you don't need to parse anything. It is the JS equivalent of the XML in the documentation, starting at the top-level "ocs".
- Some API endpoints don't return any data, just an error code. In that case there's a default callback which simply displays any errors, either from the HTTP header or from the Nextcloud API.
- Please note that whenever you get a callback, `err` simply indicates **HTTP header errors**, if you want Nextcloud's errors you have to check the header Nextcloud provides you in `ocs.meta`.

## The nc Object
- `NextCloud(<domain name>, <userid>, <password>, [https=true])`
This method returns the object hereafter referred to as `nc`, which we use to interact with the nextcloud API.
```js
const NextCloud = require('nextcloud');
var nc = NextCloud("mydomain.net", "username", "password");
```

## Users
All these methods are accessed through the `nc.users` object. These methods all match the API calls [here](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/instruction_set_for_users.html).

### Add user
`add(<userid>, <password>, [callback(err, ocs)])`

Create a new user with the given userid and password. If you intend to test this, remember this call can fail if the password is too common! If err is null, everything went fine.
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

### List/search users
`list(<options>, <callback(err, ocs)>)`

This method, without any options, returns a list of all users. Options is an object which can have three keys set:
- **search** : The search string. This will narrow down the list, turning this function into a search function. Not set by default.
- **limit** : The *integer* limit of users to return. Not set by default.
- **offset** : The *integer* offset to apply to the list of returned users. Not set by default.
```js
// Get all users
nc.users.list(null, (err, ocs)=>{
    if (err) {
        console.error(err);
        return;
    }
    // Prints the user list
    console.log(ocs.data.users);
});

// Get the three top users matching "tom"
nc.users.list({"search":"tom", "limit": 3}, (err, ocs)=> {
    if (err) {
        console.error(err);
        return;
    }
    // ocs contains the server's response if err == null    
    console.log(ocs.data.users);
});
```

### Get user info
- `get(<userid>, <callback(err, ocs)>)`

### Disable user
`disable(<userid>, [callback(err, ocs)])`

### Enable user
`enable(<userid>, [callback(err, ocs)])`

### Delete user
`delete(<userid>, [callback(err, ocs)])`

### Edit user info
`edit(<userid>, <key>, <value>, [callback(err, ocs)])`

Key and value follow the possible values in the documentation. Note that all values are strings, even the quota (It shoudld be the string "5G", not the number 5).
```js
nc.users.edit("toto", "email", "new_mail@domain.net", (err)=>{
    if (err)
        console.error(err);
    else
        console.log("Email edited");
});
```

### Get user's groups
- `getGroups(<userid>, <callback(err, ocs)>)`
```js
nc.users.getGroups("admin", (err, ocs) =>{
    if (err) {
        console.error("Error:");
        console.error(err);
        return;
    }
    console.log(ocs.data.groups);
});
```

### Add user to group
`addToGroup(<userid>, <groupid>, [callback(err, ocs)])`

### Remove user from group
`rmFromGroup(<userid>, <groupid>, [callback(err, ocs)])`

### Promote to subadmin of group
`subadminPromote(<userid>, <groupid>, [callback(err, ocs)])`

### Demote from subadmin
`subadminDemote(<userid>, <groupid>, [callback(err, ocs)])`

### List subadmin positions
`subadminGetGroups(<userid>, <callback(err, ocs)>)`

### Send welcome email
- `welcome(<userid>, [callback(err, ocs)])`

### Shorthand methods
`user(<userid>)` returns an object which can be used for shorthand methods. Most methods in this namespace can either be used with a long or a short method. The short methods allow for chaining and shorten multiple calls to the API greatly. This function does not cause an API call.
```js
// Get the "username" user object
var user = nc.users.user("username");
// Call the shorthand email editing function
user.email("user@mail.com");

// All shorthand functions can be chained, and most of them have no data to show, making the calls very clean
user.address("8 Placeholder Rd.").phone("0742424242").quota("5GB");

// Call shorthand "get" function
user.get((err, ocs)=>{
    // ocs.data contains the user's information if the call was successful
});
// Call shorthand delete function
user.delete(); // We don't have to provide a callback if we don't care to wait for the call to be done, nor care about the result being positive.
```

## Groups
All these methods are accessed through the `nc.groups` object. These methods all match the API calls [here](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/instruction_set_for_groups.html).

### List/Search Groups
`list(<options>, <callback(err, ocs)>)`

This method, without any options, returns a list of all groups. Options is an object which can have three keys set:
- **search** : The search string. This will narrow down the list, turning this function into a search function. Not set by default.
- **limit** : The *integer* limit of users to return. Not set by default.
- **offset** : The *integer* offset to apply to the list of returned users. Not set by default.

### Create Group
`add(<groupid>, <callback(err, ocs)>)`

### List Group Members
`members(<groupid>, <callback(err, ocs)>)`

### List Group Subadmins
`subadmins(<groupid>, <callback(err, ocs)>)`

### Delete group
`delete(<groupid>, <callback(err, ocs)>)`

## Apps
All these methods are accessed through the `nc.groups` object. These methods all match the API calls [here](https://docs.nextcloud.com/server/13/admin_manual/configuration_user/instruction_set_for_apps.html).

### List Apps
`list(<options>, <callback(err, ocs)>)`

This method, without any options, returns a list of all apps. Options is an object which can only have one key:
- **filter**: Two possible values: "enabled" and "disabled"

### Get App Info
`info(<appid>, <callback(err, ocs)>)`

### Enable App
`enable(<appid>, [callback(err, ocs)])`

### Disable App
`disable(<appid>, [callback(err, ocs)])`

# License
This module was developed by [Blackfoot](https://blackfoot.io/) and is licensed under the MIT License.