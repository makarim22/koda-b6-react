import {
  CircleUserRound,
  MapPinHouse,
  Phone,
  CreditCard,
  Truck,
  RefreshCw,
} from "lucide-react";

function OrderInformation({ props }) {
  const { name, address, paymentMethod, phone, shipping, status, total, orderNumber, date } =
    props;
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mb-4">
      <h1 className="text-3xl">Order {orderNumber}</h1>
      <h2>{date}</h2>
      <h2 className="text-lg font-semibold mb-4">Order Information</h2>
      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <CircleUserRound size={16} />
          <span className="font-semibold">Full Name:</span>
        </div>
        {name}
      </div>
      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <MapPinHouse size={16} />
          <span className="font-semibold">Address:</span>
        </div>
        {address}
      </div>
      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <Phone size={16} />
          <span className="font-semibold">Phone:</span>
        </div>
        {phone}
      </div>
      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <CreditCard size={16} />
          <span className="font-semibold">Payment Method:</span>
        </div>
        {paymentMethod}
      </div>
      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <Truck size={16} />
          <span className="font-semibold">Shipping:</span>
        </div>
        {shipping}
      </div>
      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <RefreshCw size={16} />
          <span className="font-semibold">Status:</span>
        </div>
        {status}
      </div>
      <div className="mb-4 flex flex-row justify-between">
        <span className="font-semibold">Total:</span>
         {total}
      </div>
    </div>
  );
}

export default OrderInformation;
