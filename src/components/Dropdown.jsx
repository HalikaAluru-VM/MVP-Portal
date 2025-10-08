import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
 
const Dropdown = ({ options, value, onChange, isSection = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
 
  // close on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);
 
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };
 
  // Format display text based on dropdown type
  const getDisplayText = (val) => {
    if (isSection) {
      return val === 'codeclub' ? 'Code Club' : 'Learnix';
    }
    return `FY-${val}`;
  };
 
  return (
    <div className="relative inline-block w-30" ref={ref}>
      {/* Trigger - Always highlighted when any year is selected */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)}
        className="w-30 px-3 py-1 pr-8 rounded-lg font-medium border-none text-sm flex items-center justify-between bg-[#00CFFF] text-black shadow-none h-8"
      >
        <span>{getDisplayText(value)}</span>
        <ChevronDown className={`h-2 w-2 transition-transform text-black ${isOpen ? "rotate-180" : ""}`} />
      </button>
 
      {/* Options */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute mt-1 w-full bg-[#00CFFF] rounded-lg shadow-lg z-2 max-h-48 overflow-y-auto"
        >
          {options.map((option) => (
            <div
              role="option"
              aria-selected={option === value}
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer text-sm font-medium text-black hover:bg-cyan-300 rounded-lg ${option === value ? "bg-cyan-200" : ""}`}
            >
              {getDisplayText(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default Dropdown;