import React from "react";
import menuicon from "../assets/menu_icon.png";


type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, placeholder, className="w-full" }) => {
  return (
    <div className={`p-2 rounded-md border border-white-400 b-6 flex items-center ${className}`}>
      <img src={menuicon} alt="Menu Icon" className="inline-block mr-2 w-10 h-5" />  
      <input
        id="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      />
    </div>
  );
};

export default SearchBar;
