import React from 'react';
import '../styles/CartModal.css'; 

const CartModal = ({ cartItems, onClose, username, proceedToCheckout }) => {
  console.log(username);  // Debugging line to check the value of username

  // Aggregate cart items and update quantities if needed
  const updatedCartItems = cartItems.reduce((acc, item) => {
    const existingItemIndex = acc.findIndex((cartItem) => cartItem.item_name === item.item_name);

    if (existingItemIndex !== -1) {
      acc[existingItemIndex].quantity += item.quantity;
    } else {
      acc.push(item);
    }
    return acc;
  }, []); 

  // Calculate total amount
  const totalAmount = updatedCartItems.reduce(
    (total, item) => total + item.item_price * item.quantity,
    0
  );

  return (
    <div className="cart-modal"> {/* Cart-specific styles */}
      <div className="modal-content">
        <h2>Cart Items</h2>
        {updatedCartItems.length > 0 ? (
          updatedCartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.item_image_url} alt={item.item_name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.item_name}</p>
                <p>Ksh {item.item_price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Hi, {username || "Guest"}, your cart is empty. Please add items!</p>
        )}
        <h3>Total: Ksh {totalAmount}</h3> {/* Show total amount */}
        
        <div className="cart-actions">
          <button className="close-button" onClick={onClose}>Close</button>
          {updatedCartItems.length > 0 && (
            <button className="checkout-button" onClick={() => proceedToCheckout(updatedCartItems, totalAmount)}>
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
