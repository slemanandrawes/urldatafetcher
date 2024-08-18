import React, { useState } from 'react';

const UrlForm = ({ onSubmit }) => {
  const [urls, setUrls] = useState(['', '', '']); // Initial state with three empty URLs

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleAddUrl = () => {
    setUrls([...urls, '']); // Add a new empty URL field
  };

  const handleRemoveUrl = (index) => {
    const newUrls = urls.filter((_, i) => i !== index); // Remove the URL at the specified index
    setUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(urls.filter(url => url.trim() !== '')); // Filter out empty URLs
  };

  return (
    <form onSubmit={handleSubmit}>
      {urls.map((url, index) => (
        <div key={index} className="url-input-container">
          <input
            type="url"
            value={url}
            onChange={(e) => handleUrlChange(index, e.target.value)}
            placeholder="Enter URL"
            required
          />
          <button type="button" onClick={() => handleRemoveUrl(index)}>Remove URL</button>
        </div>
      ))}
      <button type="button" onClick={handleAddUrl}>Add Another URL</button>
      <button type="submit">Fetch Metadata</button>
    </form>
  );
};

export default UrlForm;