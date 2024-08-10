// linkExtractor.js

const cheerio = require('cheerio');
const { resolveUrl } = require('./utils');

const extractLinks = (html, baseUrl) => {
  const $ = cheerio.load(html);
  const links = $('a').map((index, element) => {
    const link = $(element).attr('href');
    return resolveUrl(baseUrl, link);
  }).get();

  return links;
};

module.exports = { extractLinks };
