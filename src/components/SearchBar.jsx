import React, { useRef } from "react";

/**
 * Reusable SearchBar component with suggestions dropdown and custom styling.
 * @param {Object} props
 * @param {string} props.value - The current value of the search input.
 * @param {function} props.onChange - Handler for input value change.
 * @param {function} [props.onFocus] - Handler for input focus.
 * @param {function} [props.onBlur] - Handler for input blur.
 * @param {function} [props.onSubmit] - Handler for form submit.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {boolean} [props.showSuggestions] - Whether to show suggestions dropdown.
 * @param {string[]} [props.suggestions] - Array of suggestion strings.
 * @param {function} [props.onSuggestionClick] - Handler when a suggestion is clicked.
 */
const SearchBar = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  placeholder = "Search...",
  showSuggestions = false,
  suggestions = [],
  onSuggestionClick = () => {},
}) => {
  const inputRef = useRef(null);

  return (
  <div className="relative w-full max-w-4xl">
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-4xl"
        autoComplete="off"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-700 rounded-lg px-3 py-2 text-black placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-base"
          style={{ backgroundColor: '#d3d2d2', paddingBottom: '30px' }}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        <div className="absolute right-3" style={{ top: '0.85rem' }}>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 mt-2 w-full rounded-xl shadow z-10 border border-gray-200" style={{ background: '#d3d2d2' }}>
            {suggestions.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:bg-gray-300 cursor-pointer text-base"
                style={{ minHeight: 36 }}
                onMouseDown={() => onSuggestionClick(s)}
              >
                <svg style={{fontSize: '18px', marginRight: '8px'}} className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {s}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;