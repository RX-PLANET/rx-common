const globalSettings = require("./global.json");
module.exports = {
    // document title
    Title: "User Center",

    API: {},

    // Token
    tokenKey: "RX_Token",
    tokenExpires: 2592000000, // 30 days

    // CDN
    __cdn: globalSettings.__cdn,
};
