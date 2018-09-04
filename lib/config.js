var config = module.exports = {};

// The configuration file. All options are set by default here and changed in nextcloud.js, then read by other modules
config.baseUrl = null;
config.headers = {
    "Content-Type" : "application/x-www-form-urlencoded",
    "OCS-APIRequest" : true,
};
config.defaultCallback = (err)=>{if (err) console.error(err);};