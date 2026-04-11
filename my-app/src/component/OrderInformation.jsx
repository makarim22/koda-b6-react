import {
  CircleUserRound,
  MapPinHouse,
  Phone,
  CreditCard,
  Truck,
  RefreshCw,
} from "lucide-react";

function OrderInformation({ props }) {
  console.log("props", props);

  if (!props) {
    return <p className="text-gray-500 p-8">No order information available.</p>;
  }

  const {
    name,
    address,
    paymentMethod,
    payment,        // fallback if API uses 'payment' instead of 'paymentMethod'
    phone,
    shipping,
    status,
    id,
    order,
    subtotal,       // fallback if API uses 'subtotal' instead of 'order'
    cartHistory,
    created_at,     // API likely returns this instead of timestamp inside cartHistory
    customer,       // API might return customer name at top level
  } = props;

  function convertISOToReadable(isoString) {
    if (!isoString) return "—";
    try {
      return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  }

  // Safely resolve fields — API top-level first, fallback to cartHistory[0]
  const timestamp = created_at || cartHistory?.[0]?.timestamp || null;
  const fullname = customer || name || cartHistory?.[0]?.customer || "—";
  const resolvedPayment = paymentMethod || payment || cartHistory?.[0]?.paymentMethod || "—";
  const resolvedTotal = order || subtotal || "—";

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mb-4">
      <h1 className="text-3xl">Order #{id}</h1>
      <h2 className="text-gray-500 mb-2">{convertISOToReadable(timestamp)}</h2>
      <h2 className="text-lg font-semibold mb-4">Order Information</h2>

      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <CircleUserRound size={16} />
          <span className="font-semibold">Full Name:</span>
        </div>
        {fullname}
      </div>

      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <MapPinHouse size={16} />
          <span className="font-semibold">Address:</span>
        </div>
        {address || "—"}
      </div>

      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <Phone size={16} />
          <span className="font-semibold">Phone:</span>
        </div>
        {phone || "—"}
      </div>

      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <CreditCard size={16} />
          <span className="font-semibold">Payment Method:</span>
        </div>
        {resolvedPayment}
      </div>

      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <Truck size={16} />
          <span className="font-semibold">Shipping:</span>
        </div>
        {shipping || "—"}
      </div>

      <div className="mb-4 flex flex-row justify-between gap-2 border-b pb-2">
        <div className="flex flex-row gap-2">
          <RefreshCw size={16} />
          <span className="font-semibold">Status:</span>
        </div>
        {status || "—"}
      </div>

      <div className="mb-4 flex flex-row justify-between">
        <span className="font-semibold">Total:</span>
        {resolvedTotal}
      </div>
    </div>
  );
}

export default OrderInformation;