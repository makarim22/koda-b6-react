import React from "react";

export function Button({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false, 
  variant = 'primary',
  ...props 
}) {
  
  const baseStyle = "font-bold py-4 px-8 rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variants = {
    primary: "bg-zinc-950 text-white hover:bg-zinc-900 hover:scale-[1.02] shadow-lg shadow-zinc-900/10",
    outline: "bg-white border-2 border-slate-200 text-zinc-950 hover:border-zinc-950 hover:bg-slate-50",
    ghost: "bg-transparent text-zinc-600 hover:bg-slate-100 hover:text-zinc-950"
  };

  const finalClassName = `${baseStyle} ${variants[variant]} ${className}`.trim();

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={finalClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}