export function Input({
  label,
  type = 'text',
  value,
  onChange,
  icon, 
  iconAlt,
  ...props 
}) {
  const inputId = label;

  return (
    <div className="mb-4"> 
      {label && (
        <label htmlFor={inputId} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <div className="relative flex items-center border rounded-md shadow-sm">
        <input
          type={type}
          id={inputId}
          value={value} 
          onChange={onChange}
          className="appearance-none border-none w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow"
          style={icon ? { paddingRight: '2.5rem' } : {}}
          {...props} 
        />
        {icon && (
          <img
            src={icon}
            alt={iconAlt || 'Input Icon'} 
            className="absolute left-3 w-5 h-5 text-gray-500" 
          />
        )}
      </div>
    </div>
  );
}