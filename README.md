# URL Metadata Fetcher

## Overview

URL Metadata Fetcher is a full-stack application that allows users to input multiple URLs and retrieve metadata (title, description, and image) for each URL. The application displays the fetched metadata in a user-friendly interface.

## Features

- Input multiple URLs (minimum 3)
- Fetch metadata (title, description, image) for each URL
- Display fetched metadata in a visually appealing way
- Dynamic addition and removal of URL input fields
- Error handling for invalid URLs or failed metadata retrieval
- Rate limiting to prevent API abuse
- Security measures against common web vulnerabilities

## Technologies Used

- Frontend: React
- Backend: Node.js with Express
- Metadata Extraction: Cheerio
- HTTP Requests: Axios
- Security: Helmet
- Rate Limiting: express-rate-limit
- Testing: Jest, Supertest

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)

### Steps

1. Clone the repository:
   git clone https://github.com/slemanandrawes/urldatafetcher.git
   cd urldatafetcher

2. Install server dependencies:
   cd server
   npm install

3. Install client dependencies:
   cd ../client
   npm install

## Running the Application

1. Start the server:
   cd server
   npm start

The server will run on `http://localhost:5000`

2. In a new terminal, start the client:
   cd client
   npm start

The client will run on `http://localhost:3000`

3. Open your browser and navigate to `http://localhost:3000`

## Using the Application

1. Enter at least 3 URLs in the input fields provided.
2. Click "Add Another URL" to add more input fields if needed.
3. Click "Remove URL" next to any input field to remove it.
4. Click "Fetch Metadata" to retrieve and display the metadata for all entered URLs.

## Running Tests

To run server tests:
  cd server
  npm install --save-dev jest-environment-node
  npm test



## Design Choices and Trade-offs

1. **React for Frontend**: 
   - Choice: Used React for building the user interface.
   - Reason: React's component-based architecture allows for modular and reusable code, making it easier to maintain and scale the application.
   - Trade-off: Increased initial load time compared to vanilla JavaScript, but better performance for complex UIs.

2. **Node.js with Express for Backend**:
   - Choice: Used Node.js with Express for the server.
   - Reason: Allows for a JavaScript-based full-stack application, simplifying development and allowing code sharing between frontend and backend.
   - Trade-off: May not be as performant as some compiled languages for CPU-intensive tasks.

3. **Cheerio for Metadata Extraction**:
   - Choice: Used Cheerio for parsing HTML and extracting metadata.
   - Reason: Lightweight and efficient for parsing HTML on the server-side.
   - Trade-off: May not handle dynamic content as well as a full browser environment.

4. **Rate Limiting**:
   - Choice: Implemented rate limiting on the server.
   - Reason: Prevents API abuse and ensures fair usage.
   - Trade-off: May inconvenience legitimate high-volume users.

5. **Security Measures**:
   - Choice: Used Helmet for setting secure HTTP headers.
   - Reason: Provides an easy way to protect against common web vulnerabilities.
   - Trade-off: Slight increase in response time due to additional processing.

6. **Client-Side Rendering**:
   - Choice: Implemented rendering on the client-side.
   - Reason: Simplifies development and allows for a more interactive user experience.
   - Trade-off: Potential SEO limitations and longer initial load times compared to server-side rendering.

