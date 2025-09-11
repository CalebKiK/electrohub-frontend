/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import '../styles/OfferSection.css';
import HotNewOffers from "./Hot&NewOffers";
import DailyDeals from "./DailyDeals";
import BestSellers from "./BestSellers";
import SeasonOffers from "./SeasonOffers";

function OfferSection({ addToCart }) {
    const [selectedOffer, setSelectedOffer] = useState("dailyDeals");
    const [previousOffer, setPreviousOffer] = useState("dailyDeals");
    const [direction, setDirection] = useState(null);

    const handleOfferClick = (offer) => {
    if (offer !== selectedOffer) {
        const isBelow = 
            (offer === "bestSellers" && selectedOffer === "dailyDeals") || 
            (offer === "hotNew" && selectedOffer === "bestSellers") ||
            (offer === "seasonOffers" && selectedOffer === "hotNew");

        setDirection(isBelow ? "down" : "up");
        setPreviousOffer(selectedOffer);
        setSelectedOffer(offer);
    }
};

    return (
        <div className="items-on-offer-container">
            <div className="offer-items">
                <div className="offers-links">
                    <ul>
                        <li className={selectedOffer === "dailyDeals" ? "active" : ""}>
                            <a href="#" onClick={(e) => { 
                                e.preventDefault();
                                handleOfferClick("dailyDeals");
                            }}>
                                Daily Deals
                            </a>
                        </li>
                        <li className={selectedOffer === "bestSellers" ? "active" : ""}>
                            <a href="#" onClick={(e) => { 
                                e.preventDefault();
                                handleOfferClick("bestSellers");
                            }}>
                                Best Sellers
                            </a>
                        </li>
                        <li className={selectedOffer === "hotNew" ? "active" : ""}>
                            <a href="#" onClick={(e) => { 
                                e.preventDefault();
                                handleOfferClick("hotNew");
                            }}>
                                Hot & New
                            </a>
                        </li>
                        <li className={selectedOffer === "seasonOffers" ? "active" : ""}>
                            <a href="#" onClick={(e) => { 
                                e.preventDefault();
                                handleOfferClick("seasonOffers");
                            }}>
                                Season Offers
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="offers-display">
                    <div className={`offer-item ${direction} ${selectedOffer === "dailyDeals" ? "show" : ""}`}>
                        <DailyDeals addToCart={addToCart} />
                    </div>
                    <div className={`offer-item ${direction} ${selectedOffer === "bestSellers" ? "show" : ""}`}>
                        <BestSellers addToCart={addToCart} />
                    </div>
                    <div className={`offer-item ${direction} ${selectedOffer === "hotNew" ? "show" : ""}`}>
                        <HotNewOffers addToCart={addToCart} />
                    </div>
                    <div className={`offer-item ${direction} ${selectedOffer === "seasonOffers" ? "show" : ""}`}>
                        <SeasonOffers addToCart={addToCart} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferSection;