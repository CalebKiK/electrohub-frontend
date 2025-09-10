import React from 'react';
import ItemCard from './ItemCard'; // Import the ItemCard component
import '../styles/CategoryItems.css';

const CategoryItems = ({ items, onClose, addToCart }) => {
    return (
        <div className="category-items">
            {/* Close button at the top */}
            <div className="close-button-container">
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
            <div className="items-grid">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default CategoryItems;
