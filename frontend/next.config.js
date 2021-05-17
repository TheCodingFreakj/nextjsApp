const withCss = require("@zeit/next-css");

//This is the file for env variables available for server and client
module.exports = withCss({
  publicRuntimeConfig: {
    APP_NAME: "Marketing Solutions App",
    API_DEVELOPMENT: "http://localhost:8000",
    API_PRODUCTION: "http://marketingsolutions.com",
    API_TESTING: "http://localhost:8000",
    PRODUCTION: false,
    TESTING: false,
    DOMAIN_DEVELOPMENT: "http://localhost:8000",
    DOMAIN_PRODUCTION: "http://marketingsolutions.com",
    DOMAIN_TESTING: "http://localhost:8000",
    FB_APP_ID: "327386821642825",
  },
});
