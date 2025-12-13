import React, { useState, useMemo, useRef, useEffect } from "react";
import type { SelectorOption } from "./formBox";

type SearchableSelectProps = {
    query: string;
    setQuery: (value: string) => void;
    placeholder?: string;
    options: SelectorOption[];
    className?: string; // Tailwind classes for the main input
};

const SearchableSelect: React.FC<SearchableSelectProps> = ({ query, setQuery, placeholder, options, className }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Ref to detect clicks outside the component to close the dropdown
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Find the currently selected option's label (case-insensitive comparison)
    const selectedOption = options.find(opt => String(opt.value).toLowerCase() === String(query).toLowerCase());
    const selectedLabel = selectedOption ? selectedOption.label : '';

    // Effect to handle clicks outside the component
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                // Reset search term to selected label when closing
                if (selectedLabel) setSearchTerm(selectedLabel); 
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedLabel]);

    // Filtering Logic (Optimized with useMemo)
    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;

        const lowerCaseSearch = searchTerm.toLowerCase();

        return options.filter(option =>
            option.label.toLowerCase().includes(lowerCaseSearch)
        );
    }, [options, searchTerm]);

    // Handle when an option is clicked/selected
    const handleOptionSelect = (option: SelectorOption) => {
        // Normalize selected value to lowercase (parent forms expect lowercase)
        const newValue = String(option.value).toLowerCase();
        setQuery(newValue);
        setSearchTerm(option.label);
        setIsOpen(false);
    };

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsOpen(true); 
        setQuery(''); // Clear the final query while searching
    };
    
    
    const displayValue = isOpen ? searchTerm : selectedLabel || searchTerm;

    return (
        <div ref={wrapperRef} className="relative flex-grow">
            
            {/* The Search Input Field */}
            <input
                type="text"
                value={displayValue}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder || "Search or Select option..."}
                className={`w-full border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            />

            {/* The Dropdown Options List */}
            {isOpen && (
                <div
                    className="absolute w-full mt-1 border border-gray-600 rounded-md bg-gray-900 shadow-lg"
                    style={{ 
                        maxHeight: '150px', 
                        overflowY: 'auto',  
                        zIndex: 20 
                    }}
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleOptionSelect(option)}
                                className={`p-2 cursor-pointer text-sm text-left transition-colors ${
                                    option.value === query ? 'bg-blue-600' : 'hover:bg-gray-700'
                                }`}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-sm text-gray-400">No matching options found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;