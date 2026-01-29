function OrderInformation ({ props}){
    const {name, address, paymentMethod, phone, shipping ,status, total} = props
    return(
        <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-4">Order Information</h2>
        <div className="mb-4">
          <span className="font-semibold">Full Name:</span> {name}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Address:</span> {address}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Phone:</span> {phone}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Payment Method:</span> {paymentMethod}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Shipping:</span> {shipping}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Status:</span> {status}
        </div>
         <div className="mb-4">
          <span className="font-semibold">Total:</span> {total}
        </div>
      </div>
    )
}

export default OrderInformation