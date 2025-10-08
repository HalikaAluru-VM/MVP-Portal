import React from "react";

const CardButton = ({ title, description, icon, onClick }) => {
  return (
    <button
      className="group relative bg-[#181F2A] border border-[#2A3341] rounded-xl px-3 py-2 max-w-[190px] min-h-[95px] flex flex-col justify-start items-start transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
      before:absolute before:top-0 before:left-0 before:w-3 before:h-3 before:rounded-tl-xl before:border-t-1 before:border-l-1 before:border-gray-200 before:bg-transparent before:z-10
      after:absolute after:bottom-0 after:right-0 after:w-3 after:h-3 after:rounded-br-xl after:border-b-1 after:border-r-1 after:border-gray-200 after:bg-transparent after:z-10"
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        <span className="w-6 h-6 flex items-center justify-center rounded bg-cyan-400/20 mr-3">
          {icon && React.createElement(icon, { size: 16, color: '#00CFFF' })}
        </span>
        <h3 className="text-white text-sm font-semibold tracking-tight" style={{color:'#00CFFF'}}>{title}</h3>
      </div>
      <p className="text-gray-300 text-[10px] font-normal leading-snug text-left w-full" style={{marginTop:2, textAlign: 'left', wordBreak: 'break-word'}}>{description}</p>
    </button>
  );
};

export default CardButton;