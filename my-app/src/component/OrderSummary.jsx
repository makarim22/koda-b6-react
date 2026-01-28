import React from 'react';
import './OrderSummary.css';

export default function OrderSummary({ order = {} }) {
  const {
    orderNumber = '#12354-09893',
    date = '21 March 2023 at 10:30 AM',
    customer = {},
    items = [],
    subtotal = 40000,
    tax = 4000,
    delivery = 0,
    status = 'Done'
  } = order;

  const total = subtotal + tax + delivery;

  return (
    <div className="order-summary">
      <div className="summary-grid">
        <div className="summary-section">
          <h2>Order {orderNumber}</h2>
          <p className="order-date">{date}</p>

          <div className="info-section">
            <h3>Order Information</h3>
            <div className="info-item">
              <span className="label">👤 Full Name</span>
              <span className="value">{customer.name || 'Ghaluh Wizard Anggoro'}</span>
            </div>
            <div className="info-item">
              <span className="label">📍 Address</span>
              <span className="value">{customer.address || 'Griya bandung indah'}</span>
            </div>
            <div className="info-item">
              <span className="label">📱 Phone</span>
              <span className="value">{customer.phone || '082116304338'}</span>
            </div>
            <div className="info-item">
              <span className="label">💳 Payment Method</span>
              <span className="value">Cash</span>
            </div>
            <div className="info-item">
              <span className="label">🚚 Shipping</span>
              <span className="value">Dine In</span>
            </div>
            <div className="info-item">
              <span className="label">✓ Status</span>
              <span className={`value status-${status.toLowerCase()}`}>{status}</span>
            </div>
          </div>
        </div>

        <div className="summary-section order-items-section">
          <h3>Your Order</h3>
          <div className="items-list">
            {items.map((item, idx) => (
              <div key={idx} className="cart-item">
                <span className="flash-badge">FLASH SALE!</span>
                <h4>{item.name}</h4>
                <p>{item.quantity}pcs | {item.size} | {item.temperature} | Dine In</p>
                <div className="item-price-row">
                  <span className="original">{item.originalPrice}</span>
                  <span className="current">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="order-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>Idr {subtotal.toLocaleString()}</span>
        </div>
        <div className="total-row">
          <span>Tax</span>
          <span>Idr {tax.toLocaleString()}</span>
        </div>
        <div className="total-row">
          <span>Delivery</span>
          <span>Idr {delivery.toLocaleString()}</span>
        </div>
        <div className="total-row final">
          <span>Total</span>
          <span>Idr {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}