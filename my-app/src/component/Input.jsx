// src/components/Input/Input.jsx
import React from 'react';


export function Input({
  label,
  type = 'text',
  value,
  onChange,
  icon, // New prop for the icon path
  iconAlt, // New prop for icon alt text
//   id, // Explicitly destructure id
  ...props // Capture other props like placeholder, name, required, etc.
}) {
  // Ensure a unique ID for the label association
  const inputId = label;

  return (
    <div className="mb-4"> {/* Added margin bottom for spacing, can be overridden by parent */}
      {label && (
        <label htmlFor={inputId} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <div className="relative flex items-center border rounded-md shadow-sm">
        <input
          type={type}
          id={inputId}
          value={value} // Use the value prop directly from useState in parent
          onChange={onChange}
          className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
          // Adjust padding-right if an icon is present to prevent text from overlapping it
          // You might need to make this dynamic if you have different icon sizes
          style={icon ? { paddingRight: '2.5rem' } : {}}
          {...props} // Spread remaining props like placeholder, name, required, etc.
        />
        {icon && (
          <img
            src={icon}
            alt={iconAlt || 'Input Icon'} // Provide a fallback alt text
            className="absolute right-3 w-5 h-5 text-gray-500" // Tailwind classes for icon positioning and size
          />
        )}
      </div>
    </div>
  );
}