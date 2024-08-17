import React from 'react';

const MetadataDisplay = ({ metadata }) => {
  return (
    <div className="metadata-container">
      {metadata.map((item, index) => (
        <div key={index} className="metadata-item">
          <h2>{item.title || 'No Title'}</h2>
          <p>{item.description || 'No Description'}</p>
          {item.image && <img src={item.image} alt={item.title} />}
        </div>
      ))}
    </div>
  );
};

export default MetadataDisplay;