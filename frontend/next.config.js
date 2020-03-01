const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withSourceMaps({
  webpack(config) {
    return config;
  },
  env: {
    API_URL: process.env.API_URL
  }
});
