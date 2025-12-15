import React from "react";
import SearchableSelect from "./searchableSelect";

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
  const hasOptions = isOption && options && options.length > 0;
  return (
    <div
      className={`p-2 rounded-md border border-white-400 flex items-center ${className}`}
    > 
      { hasOptions ? (
        <SearchableSelect
                    query={query}
                    setQuery={setQuery}
                    placeholder={placeholder}
                    options={options!} // The ! asserts options is present based on hasOptions check
                    className="bg-transparent" // Pass through classes for input styling
                />
      )
      :            
      (isDescription ? (
        /** Description textarea */
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || "Enter description..."}
          className="flex-grow h-50 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      ) : (
        /** Normal single-line input */
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || "Search..."}
          className="flex-grow text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default FormBar;