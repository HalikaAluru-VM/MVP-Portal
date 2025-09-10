import React from "react";

const CardButton = ({ label, icon: Icon, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700 hover:border-gray-600 min-h-[90px] flex flex-col justify-between w-full h-full"
      style={{ minHeight: 95 }}
    >
      <div className="flex items-start mb-2">
        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mr-2">
          {Icon && <Icon size={18} className="text-gray-300" />}
        </div>
        <div>
          <h3 className="text-base font-semibold text-white mb-1">{label}</h3>
          {description && (
            <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardButton;