// urlTracker.js

const visitedUrls = new Set();

const addUrl = (url) => {
  visitedUrls.add(url);
};

const hasVisited = (url) => {
  return visitedUrls.has(url);
};

module.exports = { addUrl, hasVisited };
