import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import MetadataDisplay from './components/MetadataDisplay';
import './App.css';

function App() {
  const [metadata, setMetadata] = useState([]);
  const [error, setError] = useState(null);

  const fetchMetadata = async (urls) => {
    try {
      const response = await fetch('/api/fetch-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }

      const data = await response.json();
      setMetadata(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>URL Metadata Fetcher</h1>
      <UrlForm onSubmit={fetchMetadata} />
      {error && <p className="error">{error}</p>}
      <MetadataDisplay metadata={metadata} />
    </div>
  );
}

export default App;