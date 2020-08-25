const withCss = require("@zeit/next-css");

module.exports = withCss({
  publicRuntimeConfig: {
    APP_NAME: "Marketing Solutions App",
    API_DEVELOPMENT: "http://localhost:8000",
    API_PRODUCTION: "http://marketingsolutions.com",
    PRODUCTION: false,
    DOMAIN_DEVELOPMENT: "http://localhost:8000",
    DOMAIN_PRODUCTION: "http://marketingsolutions.com",
    FB_APP_ID: "327386821642825",
  },
});

//https://stackoverflow.com/questions/55309300/configuring-next-config-file
//https://nextjs.org/docs/api-reference/next.config.js/static-optimization-indicator
