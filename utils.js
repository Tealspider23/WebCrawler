// utils.js

const url = require('url');

const resolveUrl = (baseUrl, link) => {
  return url.resolve(baseUrl, link);
};

module.exports = { resolveUrl };
