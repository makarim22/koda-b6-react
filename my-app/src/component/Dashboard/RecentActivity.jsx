import React from "react";
import { ArrowRight } from "lucide-react";

const RANK_COLORS = [
  "bg-orange-500/10 text-orange-400",
  "bg-zinc-700 text-zinc-300",
  "bg-amber-800/20 text-amber-600",
  "bg-zinc-800 text-zinc-400",
  "bg-zinc-800 text-zinc-400",
];

const RecentActivity = ({ topProducts }) => {
  return (
    <div className="bg-zinc-900 border border-white/8 rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-zinc-200">Top Selling Products</h2>
        <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">Revenue</span>
      </div>

      {topProducts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-zinc-600">No data available.</p>
        </div>
      ) : (
        <div className="space-y-1 flex-1">
          {topProducts.slice(0, 5).map((product, index) => (
            <div
              key={product.id || index}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/4 transition-colors group"
            >
              {/* Rank badge */}
              <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0 ${RANK_COLORS[index] || RANK_COLORS[4]}`}>
                {index + 1}
              </div>

              {/* Name + sold */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate leading-tight">{product.name}</p>
                <p className="text-[11px] text-zinc-600 mt-0.5">{product.sold} units sold</p>
              </div>

              {/* Revenue */}
              <p className="text-xs font-semibold text-emerald-400 shrink-0">{product.profit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
