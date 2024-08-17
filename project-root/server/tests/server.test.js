const request = require('supertest');
const app = require('../src/server');
const { fetchMetadata } = require('../src/metadataFetcher');

jest.mock('../src/metadataFetcher');

describe('Server API', () => {
  beforeEach(() => {
    fetchMetadata.mockClear();
  });

  test('POST /api/fetch-metadata should return metadata for valid URLs', async () => {
    const mockMetadata = { title: 'Test Title', description: 'Test Description', image: 'test.jpg' };
    fetchMetadata.mockResolvedValue(mockMetadata);

    const response = await request(app)
      .post('/api/fetch-metadata')
      .send({ urls: ['https://example.com', 'https://test.com'] });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toEqual(mockMetadata);
    expect(fetchMetadata).toHaveBeenCalledTimes(2);
  });

  test('POST /api/fetch-metadata should handle invalid URLs', async () => {
    fetchMetadata.mockRejectedValue(new Error('Invalid URL'));

    const response = await request(app)
      .post('/api/fetch-metadata')
      .send({ urls: ['https://invalid-url.com'] });

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('error');
    expect(response.body[0].error).toBe('Invalid URL');
  });

  test('POST /api/fetch-metadata should return 400 for invalid input', async () => {
    const response = await request(app)
      .post('/api/fetch-metadata')
      .send({ urls: 'not an array' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('POST /api/fetch-metadata should handle empty array of URLs', async () => {
    const response = await request(app)
      .post('/api/fetch-metadata')
      .send({ urls: [] });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('Server should handle errors during metadata fetching', async () => {
    fetchMetadata.mockRejectedValue(new Error('Fetch error'));

    const response = await request(app)
      .post('/api/fetch-metadata')
      .send({ urls: ['https://example.com'] });

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('error');
    expect(response.body[0].error).toBe('Fetch error');
  });

  test('Rate limiter should restrict requests', async () => {
    const url = '/api/fetch-metadata';
    const validUrls = ['https://example.com'];
  
    // Send 5 requests in quick succession
    for (let i = 0; i < 5; i++) {
      await request(app)
        .post(url)
        .send({ urls: validUrls });
    }
  
    // The 6th request should be rate-limited
    const response = await request(app)
      .post(url)
      .send({ urls: validUrls });
  
    // Log the response for debugging
    console.log('Rate limiter response:', response.body);
  
    expect(response.status).toBe(429); // Too Many Requests
    expect(response.body).toHaveProperty('error'); // Check for the error property
    expect(response.body.error).toBe('Too many requests, please try again later.'); // Check the error message
  });
});