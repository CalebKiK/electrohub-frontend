import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './ItemDetails.css';

function ItemDetails() {
    const [item, setItem] = useState({});
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [newReview, setNewReview] = useState({ rating: 0, review_message: '' });
    const [updatedReviewMessage, setUpdatedReviewMessage] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null); // State to track which review is being edited
    const [hoveredRating, setHoveredRating] = useState(0);
    const params = useParams();
    const itemId = params.id;

    // Fetch item details
    useEffect(() => {
        fetch(`https://electrohub-backend.fly.dev/api/item_details/item_id/${itemId}`)
            .then(response => response.json())
            .then(data => setItem(data))
            .catch(error => console.error("Error fetching item details:", error));
    }, [itemId]);

    // Fetch reviews and average rating
    useEffect(() => {
        fetch(`https://electrohub-backend.fly.dev/api/item_id/${itemId}/reviews`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error("Error fetching reviews:", error));

        fetch(`https://electrohub-backend.fly.dev/api/item/item_id/${itemId}/average_rating`)
            .then(response => response.json())
            .then(data => setAverageRating(data.average_rating))
            .catch(error => console.error("Error fetching average rating:", error));
    }, [itemId]);

    // Handle review submission
    const handleReviewSubmit = () => {
        fetch(`https://electrohub-backend.fly.dev/api/item_id/${itemId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview),
        })
            .then(response => response.json())
            .then(data => {
                setReviews([...reviews, data]);
                setNewReview({ rating: 0, review_message: '' }); // Reset the new review form
                fetchAverageRating();
            })
            .catch(error => console.error("Error submitting review: ", error));
    };

    // Handle review update
    const handleUpdateReview = (reviewId) => {
        if (!updatedReviewMessage.trim()) {
            alert("Review message cannot be empty!");
            return;
        }

        fetch(`https://electrohub-backend.fly.dev/api/items/reviews/${reviewId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ review_message: updatedReviewMessage }), // Use the updated message
        })
            .then(response => response.json())
            .then(data => {
                setReviews(reviews.map(review => review.id === reviewId ? data : review));
                setUpdatedReviewMessage('');  // Clear the updated message field
                setEditingReviewId(null); // Exit editing mode
                fetchAverageRating();
            })
            .catch(error => console.error("Error updating review:", error));
    };

    // Handle review deletion with confirmation
    const handleDeleteReview = (reviewId) => {
        const confirmation = window.confirm("Are you sure you want to delete this review?");
        if (!confirmation) return;

        fetch(`https://electrohub-backend.fly.dev/api/items/reviews/${reviewId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setReviews(reviews.filter(review => review.id !== reviewId));
                fetchAverageRating();
            })
            .catch(error => console.error("Error deleting review:", error));
    };

    // Fetch average rating after review operations
    const fetchAverageRating = () => {
        fetch(`https://electrohub-backend.fly.dev/api/item/item_id/${itemId}/average_rating`)
            .then(response => response.json())
            .then(data => setAverageRating(data.average_rating))
            .catch(error => console.error("Error fetching average rating: ", error));
    };

    // Handle star rating click and hover
    const handleStarClick = (rating) => {
        setNewReview({ ...newReview, rating });
    };

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    if (!item) {
        return <p>Loading item details...</p>;
    }

    return (
        <div className="item-details">
            <div className="item-details-info">
                <div className="item-details-content">
                    <div className="item-details-image">
                        <img src={`https://electrohub-backend.fly.dev/static/${item.item_image_url}`} alt={item.item_name} />
                    </div>
                    <div className="item-details-text">
                        <h3>{item.item_name}</h3>
                        <div className="item-details-features">
                            {item.item_features
                                ? Object.entries(item.item_features).map(([key, value]) => (
                                    <li key={key}>{value}</li>
                                ))
                                : <li>No features available</li>
                            }
                        </div>
                        <div className="item-details-price">
                            <p>kes {item.item_price}</p>
                            <p><span>kes {item.item_prev_price}</span></p>
                        </div>
                        <button className="details-add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>

                <div className="item-reviews">
                    <h2>{item.item_name} reviews</h2>
                    <div className="rating-content">
                        <div className="overall-rating">
                            <p>Overall Rating</p>
                            <p><span>{averageRating ? averageRating.toFixed(1) : ""}</span></p>
                        </div>

                        <div className="review-product">
                            <p>Review this Product</p>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= (hoveredRating || newReview.rating) ? "filled" : ""}`}
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        onMouseLeave={handleStarLeave}
                                    >★</span>
                                ))}
                            </div>
                            <div className="review-message">
                                <textarea
                                    placeholder="Write your review..."
                                    value={newReview.review_message}
                                    onChange={(e) => setNewReview({ ...newReview, review_message: e.target.value })}
                                />
                                <button onClick={handleReviewSubmit}>Submit Review</button>
                            </div>
                        </div> 
                    </div>
                    
                    <div className="reviews">
                        {reviews.length > 0 ? reviews.map(review => (
                            <div key={review.id} className="review-card">
                                <h4 className="review-card-username"><span>Reviewed by: </span>{review.user.username}</h4>
                                <p className="review-card-message">{review.review_message}</p>
                                <div className="review-card-rating">
                                    <p className="review-card-rating-text">Rating: </p>
                                    <p className="review-card-rating-number"> {review.rating}</p>
                                </div>
                                <p className="review-card-created-at"><span>Reviewed on: {review.created_at}</span></p>
                                <div className="review-card-btns">
                                    {editingReviewId === review.id ? (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Update your review"
                                                value={updatedReviewMessage}
                                                onChange={(e) => setUpdatedReviewMessage(e.target.value)}
                                            />
                                            <button onClick={() => handleUpdateReview(review.id)} className="update-review">Save Update</button>
                                        </>
                                    ) : (
                                        <button onClick={() => { setEditingReviewId(review.id); setUpdatedReviewMessage(review.review_message); }} className="update-review">Update</button>
                                    )}
                                    <button onClick={() => handleDeleteReview(review.id)} className="delete-review">Delete</button>
                                </div>
                            </div>
                        )) : <p>No reviews yet</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;
