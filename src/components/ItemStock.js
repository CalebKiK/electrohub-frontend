import React, { useState } from "react";
import './Modal.css';

function ItemStockForm({ onItemInStockClose }) {
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setResponseMessage('');
        setErrorMessage('');

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/item/${itemId}/items_in_stock`);
            
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'An error occurred');
                return;
            }

            const data = await response.json();
            setItemName(data.item_name);
            setResponseMessage(`Item: ${data.item_name}, In stock: ${data.items_in_stock} items`);
        } catch (error) {
            setErrorMessage('Failed to fetch data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="crud-modal-content">
                <div className="form-header">
                    <h2>Check Stock for Item</h2>
                    <button className="crud-form-close-button" onClick={onItemInStockClose}>&times;</button>
                </div>

                {responseMessage && (<div className="response-message">{responseMessage}</div>)}

                {errorMessage && (<div className="error-message">{errorMessage}</div>)}

                <form onSubmit={handleSubmit} className="items-in-stock-form">
                    <div className="form-group">
                        <label htmlFor="item_id">Item ID:</label>
                        <input
                            type="number"
                            id="item_id"
                            value={itemId}
                            onChange={(e) => setItemId(e.target.value)}
                            required
                            min="1"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="item_name">Item Name:</label>
                        <input
                            type="text"
                            id="item_name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                            disabled
                        />
                    </div>

                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Checking...' : 'Check Stock'}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default ItemStockForm;