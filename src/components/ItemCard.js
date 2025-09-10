import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/ItemCard.css';

function ItemCard({ item, addToCart }) {
    const navigate = useNavigate();

    const handleLearnMoreClick = () => {
        navigate(`/item-details/${item.id}`);
    };

    const handleAddToCartClick = () => {
        addToCart(item);
    };

    return (
        <div className="display-item-card">
            <div className="item-card-info">
                <img src={item.item_image_url} alt={item.item_name} />
                <h4>{item.item_name}</h4>
                
                <div className="item-features">
                    <p>{item.item_features.feature1}</p>
                    <p>{item.item_features.feature2}</p>
                    <p>{item.item_features.feature3}</p>
                </div>

                <div className="item-price">
                    <p className="current-price">Ksh {item.item_price}</p>
                    <p className="prev-price">
                        <span>Ksh {item.item_prev_price}</span>
                    </p>
                </div>

                <div className="item-card-buttons">
                    <button className="learn-more-btn" onClick={handleLearnMoreClick}>
                        Learn More
                    </button>
                    <button className="add-to-cart-btn" onClick={handleAddToCartClick}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;