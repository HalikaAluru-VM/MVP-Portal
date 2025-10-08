import React, { useRef } from "react";

const SearchBar = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  placeholder = "Ask your question or make a request...",
}) => {
  const inputRef = useRef(null);

  return (
    <div className="w-full mb-6 flex justify-center">
      <form className="relative w-full" onSubmit={onSubmit}>
        {/* Only sub-box for textarea, main box removed */}
        <div className="bg-gray-950 border border-gray-500 rounded-xl p-2 mb-2 min-h-[60px] h-[60px] flex flex-col justify-center shadow-[0_0_0_1px_#232B39]">
          <textarea
            ref={inputRef}
            placeholder={placeholder}
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none resize-none px-2 py-1 text-base min-h-[40px] rounded-xl"
            rows={3}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;