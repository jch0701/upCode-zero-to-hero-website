import { useState, useRef, useEffect } from "react";
import { Input } from "@/component/shadcn/input";
import { Button } from "@/component/shadcn/button";
import { X } from "lucide-react";

interface SearchableMultiSelectProps {
  label: string;
  description?: string;
  placeholder: string;
  items: any[];
  selectedItems: any[];
  onSelect: (items: any[]) => void;
  maxSelections?: number;
  renderItem: (item: any) => React.ReactNode;
  searchKey: string; // key to search by (e.g., "title", "name")
  idtag?: string;
}

export const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
  label,
  description,
  placeholder,
  items,
  selectedItems,
  onSelect,
  maxSelections = 5,
  renderItem,
  searchKey,
  idtag = "id"
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter(
    (item) =>
      item[searchKey].toLowerCase().includes(query.toLowerCase()) &&
      !selectedItems.some((selected) => selected[idtag] === item[idtag])
  );

  const handleSelect = (item: any) => {
    if (selectedItems.length < maxSelections) {
      onSelect([...selectedItems, item]);
      setQuery("");
      setIsOpen(false);
    }
  };

  const handleRemove = (itemId: number) => {
    onSelect(selectedItems.filter((item) => item[idtag] !== itemId));
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <label className="text-white text-sm font-medium mb-1 block">{label}</label>
      {description && (
        <p className="text-gray-400 text-sm mb-2 italic">{description}</p>
      )}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full"
        />

        {isOpen && filteredItems.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            {filteredItems.map((item) => (
              <button
                key={item[idtag]}
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0"
              >
                {renderItem(item)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedItems?.map((item) => (
          <div
            key={item[idtag]}
            className="bg-blue-600 text-white px-3 py-[0.15rem] rounded-full flex items-center gap-2"
          >
            <span className="text-sm">{item[searchKey]}</span>
            <Button
              type="button"
              onClick={() => handleRemove(item[idtag])}
              className="hover:opacity-70 hover:bg-blue-900 rounded-4xl bg-transparent cursor-pointer"
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>

      {selectedItems?.length >= maxSelections && (
        <p className="text-sm text-gray-400 mt-2">
          Maximum {maxSelections} selections reached
        </p>
      )}
    </div>
  );
};