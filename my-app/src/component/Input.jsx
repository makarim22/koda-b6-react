import React from "react";

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  icon, 
  iconAlt,
  className = '',
  ...props 
}) {
  const inputId = label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString();

  return (
    <div className={`mb-4 w-full ${className}`}> 
      {label && (
        <label htmlFor={inputId} className="block text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center bg-white border border-slate-200 rounded-xl transition-all focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-transparent shadow-sm">
        {icon && (
          <div className="absolute left-4 flex items-center justify-center pointer-events-none">
            <img
              src={icon}
              alt={iconAlt || 'Input Icon'} 
              className="w-5 h-5 opacity-50 grayscale" 
            />
          </div>
        )}
        <input
          type={type}
          id={inputId}
          value={value} 
          onChange={onChange}
          className={`w-full bg-transparent px-4 py-3 text-zinc-900 leading-tight focus:outline-none placeholder:text-zinc-400 ${icon ? 'pl-11' : ''}`}
          {...props} 
        />
      </div>
    </div>
  );
}