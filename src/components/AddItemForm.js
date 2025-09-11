import React, { useState } from 'react';
import '../styles/Modal.css'; 

const AddItemForm = ({ onCreateItemClose }) => {
  const [formData, setFormData] = useState({
    item_name: '',
    item_features: {
      feature1: '',
      feature2: '',
      feature3: ''
    },
    item_price: '',
    item_image_url: '',
    item_category: '',
    items_in_stock: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form field change
  const handleFieldChange = (field, value) => {
    if (field.startsWith('item_features')){
        const featureKey = field.split('_')[2];
        setFormData( prevState => ({
          ...prevState,
          item_features: {
            ...prevState.item_features,
            [featureKey]: value
          }
        }));
    } else {
      setFormData({
      ...formData,
      [field]: value,
    });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.item_name || 
      !formData.item_features.feature1 || 
      !formData.item_features.feature2 || 
      !formData.item_features.feature3 || 
      !formData.item_price || 
      !formData.item_image_url || 
      !formData.item_category || 
      !formData.items_in_stock) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const itemData = {
      item_name: formData.item_name,
      item_features: formData.item_features,
      item_price: formData.item_price,
      item_image_url: formData.item_image_url,
      item_category: formData.item_category,
      items_in_stock: formData.items_in_stock,
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
          item_name: '',
          item_features: {
            feature1: '',
            feature2: '',
            feature3: ''
          },
          item_price: '',
          item_image_url: '',
          item_category: '',
          items_in_stock: '',
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
      <div className="modal-overlay">
        <div className="crud-modal-content">
          <div className='form-header'>
            <h2>Create New Item</h2>
            <button className="crud-form-close-button" onClick={onCreateItemClose}>&times;</button>
          </div>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {responseMessage && <p className="success-message">{responseMessage}</p>}

          <form onSubmit={handleSubmit} className="add-item-form">
            <div className="form-group">
              <label htmlFor="item_name">Item Name:</label>
              <input
                type="text"
                id="item_name"
                value={formData.item_name}
                onChange={(e) => handleFieldChange('item_name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="item_features_feature1">Feature 1:</label>
              <input
                type="text"
                id="item_features_feature1"
                value={formData.item_features.feature1}
                onChange={(e) => handleFieldChange('item_features_feature1', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="item_features_feature2">Feature 2:</label>
              <input
                type="text"
                id="item_features_feature2"
                value={formData.item_features.feature2}
                onChange={(e) => handleFieldChange('item_features_feature2', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="item_features_feature3">Feature 3:</label>
              <input
                type="text"
                id="item_features_feature3"
                value={formData.item_features.feature3}
                onChange={(e) => handleFieldChange('item_features_feature3', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="item_price">Item Price:</label>
              <input
                type="number"
                id="item_price"
                value={formData.item_price}
                onChange={(e) => {
                  let newValue = e.target.value;
                  if (newValue < 0) {
                    newValue = 0;
                  }
                  handleFieldChange('item_price', newValue);
                }}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="item_image_url">Item Image URL:</label>
              <input
                type="text"
                id="item_image_url"
                value={formData.item_image_url}
                onChange={(e) => handleFieldChange('item_image_url', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="item_category">Item Category:</label>
              <input
                type="text"
                id="item_category"
                value={formData.item_category}
                onChange={(e) => handleFieldChange('item_category', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="items_in_stock">Items in Stock:</label>
              <input
                type="number"
                id="items_in_stock"
                value={formData.items_in_stock}
                onChange={(e) => handleFieldChange('items_in_stock', e.target.value)}
                required
              />
            </div>

            <button type="submit" className="crud-submit-button">Add Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;