var config = module.exports = {};

// The configuration file. All options are set by default here and changed in nextcloud.js, then read by other modules
config.baseUrl = null;
config.headers = {
    "Content-Type" : "application/x-www-form-urlencoded",
    "OCS-APIRequest" : true,
    "Accept": "application/json",
};
config.defaultCallback = (err, ocs)=>{
    if (err) { 
        console.error(err);
    }
    else if (ocs.meta.statuscode != 100) {
        console.error(`Nextcloud error ${ocs.meta.statuscode}: ${ocs.meta.message}`);
    }
}