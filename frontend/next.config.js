const withCss = require("@zeit/next-css");

module.exports = withCss({
  publicRuntimeConfig: {
    APP_NAME: "Marketing Solutions App",
    API_DEVELOPMENT: "http://localhost:8000/api",
    PRODUCTION: false,
  },
});

//https://stackoverflow.com/questions/55309300/configuring-next-config-file
//https://nextjs.org/docs/api-reference/next.config.js/static-optimization-indicator
