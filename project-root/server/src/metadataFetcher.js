const axios = require('axios');
const cheerio = require('cheerio');

async function fetchMetadata(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('title').text() || $('meta[property="og:title"]').attr('content') || '';
    const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
    const image = $('meta[property="og:image"]').attr('content') || '';

    return { url, title, description, image };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error);
    return { url, error: 'Failed to fetch metadata' };
  }
}

module.exports = { fetchMetadata };