import React, { useState } from 'react';
import './Modal.css';

const UpdateItemForm = ({ onUpdateItemClose }) => {
  const [formData, setFormData] = useState({
    new_item_id: '', 
    new_item_name: '',
    new_item_features: {
        new_feature1: '',
        new_feature2: '',
        new_feature3: ''
    },
    new_item_price: '',
    new_item_image_url: '',
    new_item_category: '',
    new_items_in_stock: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form field change
  const handleFieldChange = (field, value) => {
    if (field.startsWith('new_item_features')){
        const featureKey = field.split('_')[2];
        setFormData( prevState => ({
          ...prevState,
          new_item_features: {
            ...prevState.new_item_features,
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

    if (!formData.item_id) {
        setErrorMessage('Item ID is required.');
        return;
      }

    const itemData = {};
    if (formData.new_item_name) itemData.item_name = formData.new_item_name;
    if (formData.new_item_features.new_feature1 || formData.new_item_features.new_feature2 || formData.new_item_features.new_feature3) {
      itemData.item_features = {
        ...(formData.new_item_features.new_feature1 && { feature1: formData.new_item_features.new_feature1 }),
        ...(formData.new_item_features.new_feature2 && { feature2: formData.new_item_features.new_feature2 }),
        ...(formData.new_item_features.new_feature3 && { feature3: formData.new_item_features.new_feature3 }),
      };
    }
    if (formData.new_item_price) itemData.item_price = formData.new_item_price;
    if (formData.new_item_image_url) itemData.item_image_url = formData.new_item_image_url;
    if (formData.new_item_category) itemData.item_category = formData.new_item_category;
    if (formData.new_items_in_stock) itemData.items_in_stock = formData.new_items_in_stock;

    // Ensure at least one field is being updated
    if (Object.keys(itemData).length === 0) {
      setErrorMessage('Please fill in at least one field to update.');
      return;
    }

    try {
      const response = await fetch(`https://electrohub-backend-ezes.onrender.com/api/items/item_id/${formData.item_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Item updated successfully!');
        setFormData({
          item_id: '',
          new_item_name: '',
          new_item_features: {
            new_feature1: '',
            new_feature2: '',
            new_feature3: ''
            },
          new_item_price: '',
          new_item_image_url: '',
          new_item_category: '',
          new_items_in_stock: '',
        });
      } else {
        setErrorMessage(result.message || 'Error updating item');
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
                <h2>Update Item</h2>
                <button className="crud-form-close-button" onClick={onUpdateItemClose}>&times;</button>
            </div>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseMessage && <p className="success-message">{responseMessage}</p>}

            <form onSubmit={handleSubmit} className="update-item-form">
              <div className="form-group">
                <label htmlFor="item_id">Item ID:</label>
                <input
                  type="text"
                  id="item_id"
                  value={formData.item_id}
                  onChange={(e) => handleFieldChange('item_id', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_name">New Item Name:</label>
                <input
                  type="text"
                  id="new_item_name"
                  value={formData.new_item_name}
                  onChange={(e) => handleFieldChange('new_item_name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_features_feature1">New Feature 1:</label>
                <input
                  type="text"
                  id="new_item_features_feature1"
                  value={formData.new_item_features.feature1}
                  onChange={(e) => handleFieldChange('new_item_features_feature1', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_features_feature2">New Feature 2:</label>
                <input
                  type="text"
                  id="new_item_features_feature2"
                  value={formData.new_item_features.feature2}
                  onChange={(e) => handleFieldChange('new_item_features_feature2', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_features_feature3">New Feature 3:</label>
                <input
                  type="text"
                  id="new_item_features_feature3"
                  value={formData.new_item_features.feature3}
                  onChange={(e) => handleFieldChange('new_item_features_feature3', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_price">New Item Price:</label>
                <input
                  type="number"
                  id="new_item_price"
                  value={formData.new_item_price}
                  onChange={(e) => {
                    let newValue = e.target.value;
                    if (newValue < 0) {
                      newValue = 0;
                    }
                    handleFieldChange('new_item_price', newValue);
                  }}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_image_url">New Item Image URL:</label>
                <input
                  type="text"
                  id="new_item_image_url"
                  value={formData.new_item_image_url}
                  onChange={(e) => handleFieldChange('new_item_image_url', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_item_category">New Item Category:</label>
                <input
                  type="text"
                  id="new_item_category"
                  value={formData.new_item_category}
                  onChange={(e) => handleFieldChange('new_item_category', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_items_in_stock">New Items in Stock:</label>
                <input
                  type="number"
                  id="new_items_in_stock"
                  value={formData.new_items_in_stock}
                  onChange={(e) => handleFieldChange('new_items_in_stock', e.target.value)}
                />
              </div>

              <button type="submit" className="submit-button">Update Item</button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default UpdateItemForm;