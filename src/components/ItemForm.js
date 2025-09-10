import React, { useState } from 'react';
import '../styles/Modal.css';

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    new_item_name: '',
    new_item_features: '',
    new_item_price: '',
    new_item_image_url: '',
    new_item_category: '',
    new_items_in_stock: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form field change
  const handleFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.new_item_name || !formData.new_item_features || !formData.new_item_price || !formData.new_item_image_url || !formData.new_item_category || !formData.new_items_in_stock) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const itemData = {
      item_name: formData.new_item_name,
      item_features: formData.new_item_features,
      item_price: formData.new_item_price,
      item_image_url: formData.new_item_image_url,
      item_category: formData.new_item_category,
      items_in_stock: formData.new_items_in_stock,
    };

    try {
      const response = await fetch('https://electrohub-backend.fly.dev/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Item added successfully!');
        setFormData({
          new_item_name: '',
          new_item_features: '',
          new_item_price: '',
          new_item_image_url: '',
          new_item_category: '',
          new_items_in_stock: '',
        });
      } else {
        setErrorMessage(result.message || 'Error adding item');
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Update Item Modal</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Close button */}
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2>Add New Item</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseMessage && <p className="success-message">{responseMessage}</p>}

            <form onSubmit={handleSubmit} className="add-item-form">
              <div className="form-group">
                <label htmlFor="new_item_name">Item Name:</label>
                <input
                  type="text"
                  id="new_item_name"
                  value={formData.new_item_name}
                  onChange={(e) => handleFieldChange('new_item_name', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_features">Item Features:</label>
                <input
                  type="text"
                  id="new_item_features"
                  value={formData.new_item_features}
                  onChange={(e) => handleFieldChange('new_item_features', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_price">Item Price:</label>
                <input
                  type="number"
                  id="new_item_price"
                  value={formData.new_item_price}
                  onChange={(e) => handleFieldChange('new_item_price', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_image_url">Item Image URL:</label>
                <input
                  type="url"
                  id="new_item_image_url"
                  value={formData.new_item_image_url}
                  onChange={(e) => handleFieldChange('new_item_image_url', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_category">Item Category:</label>
                <input
                  type="text"
                  id="new_item_category"
                  value={formData.new_item_category}
                  onChange={(e) => handleFieldChange('new_item_category', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_items_in_stock">Items in Stock:</label>
                <input
                  type="number"
                  id="new_items_in_stock"
                  value={formData.new_items_in_stock}
                  onChange={(e) => handleFieldChange('new_items_in_stock', e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-button">Add Item</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItemForm;
