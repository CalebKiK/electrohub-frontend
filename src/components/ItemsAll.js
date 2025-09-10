import React from "react";
import { useNavigate} from "react-router-dom";
import ItemCard from "./ItemCard";
import '../styles/ItemsAll.css';

function ItemsAll({ items, addToCart }) {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('user')); // Fetch stored user data
    const userRole = storedUser ? storedUser.role : null; // Determine user role

    const handleShowModalsButtons = (e) => {
        e.stopPropagation();
        navigate("/modify-items-modals")
    };

    return (
        <div className="all-items">
            <div className="all-items-header">
                <h1>All Items</h1>
                {/* Conditionally render the button if the user is an admin */}
                {userRole === "admin" && (
                    <button className="modify-item-btn" onClick={handleShowModalsButtons}>
                        Modify Items
                    </button>
                )}
            </div>
            
            <div className="items-display">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default ItemsAll;

