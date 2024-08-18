const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { fetchMetadata } = require('src/metadataFetcher');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Rate limiting middleware for API endpoints
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: 'Too many requests, please try again later.' } // Response message
});
app.use('/api/', apiLimiter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// URL validation function
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

// Routes
app.post('/api/fetch-metadata', async (req, res) => {
  try {
    const { urls } = req.body;
    if (!Array.isArray(urls) || urls.length < 1) {
      return res.status(400).json({ error: 'Invalid input. Please provide an array of URLs.' });
    }

    const metadata = await Promise.all(urls.map(async (url) => {
      if (!isValidUrl(url)) {
        return { url, error: 'Invalid URL format' };
      }
      try {
        return await fetchMetadata(url);
      } catch (error) {
        return { url, error: error.message || 'Failed to fetch metadata' };
      }
    }));

    res.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'An error occurred while fetching metadata.' });
  }
});
app.use(express.static(path.join(__dirname + "./client/build")))
// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
