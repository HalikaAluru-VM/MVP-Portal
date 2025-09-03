import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
 
const Dropdown = ({ options, value, onChange, highlightYear, isSection = false }) => {
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
      return val === 'codeclub' ? 'CodeClub' : 'LearniX';
    }
    return `FY-${val}`;
  };
 
  return (
    <div className="relative inline-block w-28" ref={ref}>
      {/* Trigger - Always highlighted when any year is selected */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)}
        className="w-full px-2 py-1 pr-6 rounded-lg font-semibold border border-gray-600 text-sm flex items-center justify-between bg-gray-700 text-white"
      >
        <span>{getDisplayText(value)}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
 
      {/* Options */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute mt-1 w-full bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <div
              role="option"
              aria-selected={option === value}
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer text-sm
                ${isSection
                  ? (option === value ? "bg-gray-600 text-white font-bold" : "text-white hover:bg-gray-600")
                  : (option === highlightYear
                      ? "bg-gradient-to-r from-gray-500 to-gray-500 text-white font-bold"
                      : "text-white hover:bg-gray-600")
                }
              `}
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