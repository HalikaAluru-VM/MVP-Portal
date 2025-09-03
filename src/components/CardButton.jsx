import React from "react";
 
const CardButton = ({ label, icon: Icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
  className={`cursor-pointer flex flex-col items-center justify-center rounded-xl p-3 min-w-[140px] px-8 text-white text-sm font-medium shadow-lg hover:scale-105 transition-transform duration-300`}
      style={{ background: color }}
    >
  {Icon && <Icon className="w-4 h-4 mb-1" />}
      <span>{label}</span>
    </div>
  );
};
 
export default CardButton;