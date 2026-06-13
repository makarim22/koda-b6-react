export const PromoCard = ({ icon, title, description, bgColor = 'bg-orange-100' }) => {
  return (
    <div className={`${bgColor} rounded-3xl p-6 flex items-center gap-5 shadow-lg shadow-zinc-900/5 h-full group hover:-translate-y-1 transition-transform duration-300`}>
      <div className="shrink-0 drop-shadow-md">
        {icon && <img src={icon} alt="Promo Icon" className="h-16 w-16 object-contain group-hover:scale-110 transition-transform duration-500" />} 
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-extrabold text-sm text-zinc-950 uppercase tracking-widest leading-tight mb-1.5">{title}</h3>
        <p className="text-sm font-medium text-zinc-700 leading-snug">{description}</p>
      </div>
    </div>
  );
};