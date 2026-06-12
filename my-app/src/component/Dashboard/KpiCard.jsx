import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const KpiCard = ({ title, value, icon: Icon, trend, accent = "orange" }) => {
  const ACCENTS = {
    orange:  { bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    blue:    { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/20" },
    violet:  { bg: "bg-violet-500/10",  text: "text-violet-400",  border: "border-violet-500/20" },
    white:   { bg: "bg-white/8",        text: "text-white/70",    border: "border-white/12" },
  };
  const c = ACCENTS[accent] || ACCENTS.orange;

  return (
    <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/15 transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{title}</p>
        <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center`}>
          <Icon size={15} className={c.text} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-zinc-100 tracking-tight">{value}</p>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trend.isUp ? "text-emerald-400" : "text-red-400"}`}>
            {trend.isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {trend.value}%
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
