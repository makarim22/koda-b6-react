import React from 'react'

function Invoice(props) {
    const {order, delivery, tax, subtotal} = props
  return (
    <>
    <div>
      Total
    </div>
    <div>
     <span>Order :{order} </span>
     <span>Delivery: {delivery} </span>
     <span>Tax : {tax} </span>
     <span>SubTotal {subtotal} </span>
    </div>
    <div>
        <button>Checkout</button>
        <span>We Accept</span>
        <div>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
        </div>
    </div>
    </>
  )
  
}

export default Invoice
