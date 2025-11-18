import globalSettings from "./global.json";
export default {
    // document title
    Title: "User Center",

    API: {},

    // Token
    tokenKey: "RX_Token",
    tokenExpires: 2592000000, // 30 days

    // CDN
    __cdn: globalSettings.__cdn,
};
