import React from "react";

export type SelectorOption = {
    value: string | number;
    label: string;
};

type FormBarProps = {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
  className?: string;
  options?: SelectorOption[];
  isDescription?: boolean;
  isOption?: boolean;
};

const FormBar: React.FC<FormBarProps> = ({ query, setQuery, placeholder, className="w-full", isDescription = false, isOption = false, options}) => {
  return (
    <div
      className={`p-2 rounded-md border border-white-400 flex items-center ${className}`}
    > 
      { isOption ? (
        <select
          value = {query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-black"
        >
          <option value="" disabled>
              {placeholder || "Select option"}
          </option>
              {options && options.map((option) => (
                  <option key={option.value} value={option.value}>
                      {option.label}
                  </option>
              ))}
        </select>
      )
      :            
      (isDescription ? (
        /** Description textarea */
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || "Enter description..."}
          className="flex-grow h-50 text-white placeholder-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      ) : (
        /** Normal single-line input */
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || "Search..."}
          className="flex-grow text-white placeholder-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default FormBar;