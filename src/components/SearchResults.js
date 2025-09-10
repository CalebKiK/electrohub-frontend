import React from 'react';
import ItemCard from './ItemCard';
import '../styles/SearchResults.css';

const SearchResults = ({ results, onClose, addToCart }) => { // Accept addToCart as a prop
  return (
    <div className="search-results">
      <button className="close-button" onClick={onClose}>Close</button>
      {results.length > 0 ? (
        <div className="results-list">
          {results.map((item) => (
            <ItemCard
              key={item.id}
              item={item} // Pass each item to ItemCard as a prop
              addToCart={addToCart} // Pass addToCart to ItemCard
            />
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;