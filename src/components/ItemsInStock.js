
import React, { useState, useEffect } from 'react';

const ItemsInStock = ({ itemId }) => {
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemsInStock = async () => {
      try {
        // Ensure the URL dynamically uses itemId
        const response = await fetch(`https://electrohub-backend-ezes.onrender.com/api/item/${itemId}/items_in_stock`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.error('Error fetching item data:', error);
        setError(error.message);
      }
    };

    if (itemId) {
      fetchItemsInStock();
    }
  }, [itemId]); // Effect depends on itemId, so it re-fetches when it changes

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {itemData ? (
        <div>
          <h3>Item Name: {itemData.item_name}</h3>
          <p>Items in Stock: {itemData.items_in_stock}</p>
        </div>
      ) : (
        <p>Loading item data...</p>
      )}
    </div>
  );
};

export default ItemsInStock;
