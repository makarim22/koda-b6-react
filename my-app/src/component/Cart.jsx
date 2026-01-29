
function Cart(props) {
    const {items} = props;
    console.log("items", items)
  return (
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
  )
}

export default Cart
