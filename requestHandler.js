// requestHandler.js

const axios = require('axios');

const fetchHtml = async (pageUrl) => {
  try {
    const { data: html } = await axios.get(pageUrl);
    return html;
  } catch (error) {
    console.error(`Failed to fetch ${pageUrl}:`, error.message);
    return null;
  }
};

module.exports = { fetchHtml };
