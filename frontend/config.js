import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.API_PRODUCTION
  : publicRuntimeConfig.API_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
// console.log("publicRuntimeConfig", publicRuntimeConfig);
// console.log("publicRuntimeConfig", publicRuntimeConfig.PRODUCTION);
export default publicRuntimeConfig;

// DOMAIN_DEVELOPMENT: "http://localhost:8000",
// DOMAIN_PRODUCTION: "http://marketingsolutions.com",
// FB_APP_ID
//https://stackoverflow.com/questions/55113156/publicruntimeconfig-in-next-config-js-is-always-undefined-in-prod-staging
//https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

//Here we use env variables
// getConfig comes with nextjs this lets you access the env variables
