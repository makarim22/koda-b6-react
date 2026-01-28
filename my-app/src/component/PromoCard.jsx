export const PromoCard = ({ icon, title, description, bgColor = 'bg-green-100' }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 flex items-center gap-4`}>
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-xs text-gray-700">{description}</p>
      </div>
    </div>
  );
};