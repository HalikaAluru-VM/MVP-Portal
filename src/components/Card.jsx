import React from 'react'


const Card = ({ children, className = '', hover = false, padding = 'default', gradient = false }) => {
  const baseStyles = 'bg-gray-700 rounded-xl border border-gray-700 transition-all duration-300';
  // const hoverStyles = hover ? 'hover:shadow-xl ';
  // const gradientStyles = gradient ? 'bg-gradient-to-br from-gray-800 to-gray-900' : '';
  const paddings = {
    none: '',
    sm: 'p-4', 
    default: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div className={`${baseStyles}   ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card