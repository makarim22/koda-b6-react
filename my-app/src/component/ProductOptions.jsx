import React, { useState } from 'react';
// import './ProductOptions.css';

export default function ProductOptions({ onOptionChange }) {
  const [size, setSize] = useState('Regular');
  const [temperature, setTemperature] = useState('Ice');
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    onOptionChange({ size: newSize, temperature, quantity });
  };

  const handleTempChange = (newTemp) => {
    setTemperature(newTemp);
    onOptionChange({ size, temperature: newTemp, quantity });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    onOptionChange({ size, temperature, quantity: newQuantity });
  };

  return (
    <div className="product-options">
      {/* Quantity Control */}
      <div className="quantity-control">
        <button 
          className="qty-btn minus" 
          onClick={() => handleQuantityChange(-1)}
        >
          −
        </button>
        <input 
          type="number" 
          value={quantity} 
          readOnly 
          className="qty-input"
        />
        <button 
          className="qty-btn plus" 
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>

      {/* Size Selection */}
      <div className="option-group">
        <h3>Choose Size</h3>
        <div className="size-options">
          {['Regular', 'Medium', 'Large'].map(sizeOption => (
            <button
              key={sizeOption}
              className={`size-btn ${size === sizeOption ? 'active' : ''}`}
              onClick={() => handleSizeChange(sizeOption)}
            >
              {sizeOption}
            </button>
          ))}
        </div>
      </div>

      {/* Temperature Selection */}
      <div className="option-group">
        <h3>Hot/Ice?</h3>
        <div className="temp-options">
          {['Ice', 'Hot'].map(tempOption => (
            <button
              key={tempOption}
              className={`temp-btn ${temperature === tempOption ? 'active' : ''}`}
              onClick={() => handleTempChange(tempOption)}
            >
              {tempOption}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}