import React, { useState, useEffect} from 'react';
import {  Routes, Route } from 'react-router-dom';

import './App.css';
import OfferSection from './components/OfferSection';
import ItemsAll from './components/ItemsAll';
import ItemDetails from './components/ItemDetails';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/api/items")
    .then(response => response.json())
    .then(data => setItems(data));
  }, []);

  return (
    <div className="App">
      <OfferSection items={items} />
      <ItemsAll items={items} />
      <Routes>
        <Route path="/item-details/:id" element={<ItemDetails />} />
      </Routes>
    </div>
  );
}

export default App;
