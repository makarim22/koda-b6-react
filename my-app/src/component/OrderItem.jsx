import React from 'react';
import './OrderItem.css';

export default function OrderItem({ order, isDetail = false }) {
  return (
    <div className={`order-item ${isDetail ? 'detail-view' : 'list-view'}`}>
      <div className="order-image">
        <img src={order.image} alt={order.name} />
      </div>

      {isDetail && (
        <div className="order-item-details">
          <div className="item-header">
            <span className="flash-badge">FLASH SALE!</span>
            <h3>{order.name}</h3>
            <button className="remove-btn">×</button>
          </div>
          <p className="item-specs">
            {order.quantity}pcs | {order.size} | {order.temperature} | {order.delivery}
          </p>
          <div className="item-pricing">
            <span className="item-original">{order.originalPrice}</span>
            <span className="item-price">{order.price}</span>
          </div>
        </div>
      )}

      {!isDetail && (
        <div className="order-info">
          <p className="order-name">{order.name}</p>
          <p className="order-specs">
            {order.quantity}pcs | {order.size} | {order.temperature}
          </p>
          <p className="order-price">{order.price}</p>
        </div>
      )}
    </div>
  );
}