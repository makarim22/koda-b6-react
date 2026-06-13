import {
  CircleUserRound,
  MapPinHouse,
  Phone,
  CreditCard,
  Truck,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

function OrderInformation({ props }) {
  if (!props) {
    return <p className="text-zinc-500">No order information available.</p>;
  }

  const {
    name,
    address,
    paymentMethod,
    payment,
    phone,
    shipping,
    status,
    id,
    order,
    subtotal,
    cartHistory,
    created_at,
    customer,
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
        timeZone: "Asia/Jakarta",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  }

  const timestamp = created_at || cartHistory?.[0]?.timestamp || null;
  const fullname = customer || name || cartHistory?.[0]?.customer || "—";
  const resolvedPayment = paymentMethod || payment || cartHistory?.[0]?.paymentMethod || "—";
  const resolvedTotal = order || subtotal || "—";

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-100 pb-6 gap-4">
        <div>
          <h2 className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">Order Information</h2>
          <h1 className="text-4xl tracking-tighter font-semibold text-zinc-900 leading-none">Order <span className="font-mono text-3xl">#{id}</span></h1>
        </div>
        <div className="text-sm font-mono text-zinc-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
          {convertISOToReadable(timestamp)}
        </div>
      </motion.div>

      {/* Grid Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <motion.div variants={itemVariants} className="flex flex-col gap-2 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <CircleUserRound size={16} />
            <span className="text-xs font-semibold uppercase tracking-widest">Full Name</span>
          </div>
          <div className="font-semibold text-zinc-900 text-lg">{fullname}</div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <MapPinHouse size={16} />
            <span className="text-xs font-semibold uppercase tracking-widest">Address</span>
          </div>
          <div className="font-medium text-zinc-700 leading-relaxed max-w-[30ch]">{address || "—"}</div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <Phone size={16} />
            <span className="text-xs font-semibold uppercase tracking-widest">Phone</span>
          </div>
          <div className="font-mono text-zinc-900 text-base">{phone || "—"}</div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <CreditCard size={16} />
            <span className="text-xs font-semibold uppercase tracking-widest">Payment Method</span>
          </div>
          <div className="font-semibold text-zinc-900 text-base capitalize">{resolvedPayment}</div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <Truck size={16} />
            <span className="text-xs font-semibold uppercase tracking-widest">Shipping</span>
          </div>
          <div className="font-semibold text-zinc-900 text-base capitalize">{shipping || "—"}</div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <RefreshCw size={16} />
            <span className="text-xs font-semibold uppercase tracking-widest">Status</span>
          </div>
          <div className="w-fit font-semibold text-zinc-900 text-sm capitalize bg-orange-50 text-orange-600 px-3 py-1 rounded-full border border-orange-100">
            {status || "—"}
          </div>
        </motion.div>
      </div>

      {/* Total Section */}
      <motion.div variants={itemVariants} className="bg-zinc-950 rounded-2xl p-6 flex items-center justify-between shadow-lg shadow-zinc-900/10 mt-4">
        <span className="text-zinc-400 text-sm font-semibold uppercase tracking-widest">Total Amount</span>
        <span className="font-mono text-2xl font-bold text-white">{resolvedTotal}</span>
      </motion.div>
    </div>
  );
}

export default OrderInformation;