import React, { useState, useEffect } from "react";
import ItemCard from "../styles/ItemCard";

function SeasonOffers({ addToCart }) {
    const [seasonOffers, setSeasonOffers] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
    fetch("https://electrohub-backend.fly.dev/api/items/season_offers")
    .then(response => response.json())
    .then(data => setSeasonOffers(data));
    }, []);

    const handleSwipeLeft = () => {
        setOffset((prevOffset) => prevOffset + 500);
    };

    const handleSwipeRight = () => {
        setOffset((prevOffset) => Math.max(prevOffset - 500, 0));
    };

    return (
        <div className="items-offers-deals">
            <h2>Season Offers</h2>
            <div className="swipe-buttons">
                <button onClick={handleSwipeRight}>{"<"}</button>
                <button onClick={handleSwipeLeft}>{">"}</button>
            </div>
            <div className="offer-items-cards"
                style={{
                    transform: `translateX(-${offset}px)`,
                    transition: 'transform 0.5s ease',
                }}>
                {seasonOffers.map((item) => (
                    <ItemCard key={item.id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default SeasonOffers;