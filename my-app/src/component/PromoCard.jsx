export const PromoCard = ({ icon, title, description, bgColor = 'bg-green-100' }) => {
  return (
    <div className={`${bgColor} rounded-r-3xl p-6 flex items-center gap-4`}>
       <div className="text-4xl">
        {icon && <img src={icon} alt="Promo Icon" className="h-20 w-20" />} 
      </div>
      <div>
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-xs text-gray-700">{description}</p>
      </div>
    </div>
  );
};