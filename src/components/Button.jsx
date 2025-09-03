import React from 'react';
 
const Button = ({
  children,
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  iconLeft,
  iconRight,
  circle = false, // new prop for circle shape
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium ';
 
  const variants = {
    primary:
      'bg-gray-700  text-gray-300 ',
    secondary:
      'bg-gray-700 text-gray-300  ',
    outline:
      '',
    success:
      'bg-green-600 hover:bg-green-700 text-white ',
    warning:
      'bg-yellow-600 hover:bg-yellow-700 text-white ',
    danger:
      'bg-red-600 hover:bg-red-700 text-white ',
    white:
      'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 ',
        custom:
      'border-0',
  };
 
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
 
  // Add circle shape if circle prop is true
  const shapeClass = circle ? 'rounded-full aspect-square !p-0 w-10 h-5 sm:w-12 sm:h-12' : 'rounded-lg';
 
  const combinedClassName = `
    ${baseStyles}
    ${variants[variant] || ''}
    ${sizes[size]}
    ${shapeClass}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();
 
  return (
    <button onClick={onClick} disabled={disabled} className={combinedClassName}>
      {iconLeft && <span className="mr-1">{iconLeft}</span>}
      {label || children}
      {iconRight && <span className="ml-1">{iconRight}</span>}
    </button>
  );
};
 
export default Button;
 