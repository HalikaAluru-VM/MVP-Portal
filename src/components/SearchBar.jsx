import React from "react";
 
const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
  className="w-full p-4 text-sm bg-gray-700 text-gray-200 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow"
    />
  );
};
 
export default SearchBar;