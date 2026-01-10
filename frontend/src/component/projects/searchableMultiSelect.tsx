import { useState, useRef, useEffect } from "react";
import { Input } from "@/component/shadcn/input";
import { Button } from "@/component/shadcn/button";
import { X } from "lucide-react";

interface SearchableMultiSelectProps {
  label: string;
  openFor: string;
  isEditing: boolean;
  description?: string;
  placeholder: string;
  items: any[];
  chosenItems: any[];
  onSelect: (items: any[]) => void;
  maxSelections?: number;
  renderItem: (item: any) => React.ReactNode;
  searchKey: string; // key to search by (e.g., "title", "name")
  idtag?: string;
}

export type ItemType = {
  referenceId: number; //roadmapId or careerId
  referenceType: string; //"roadmap" or "career"
  title: string;
}

export const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
  label,
  openFor,
  isEditing,
  description,
  placeholder,
  items,
  chosenItems,
  onSelect,
  maxSelections = 15,
  renderItem,
  searchKey,
  idtag = "recommendationID"
}) => {
  const selectedItems = chosenItems;
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filteredItems = items.filter(
    (item) =>
      item[searchKey].toLowerCase().includes(query.toLowerCase()) &&
      !selectedItems.some((selected) => selected.referenceId === item[idtag])
  );

  const handleSelect = (item: any) => {
    if(selectedItems.some((selected) => selected.referenceId === item[idtag])){
      return;
    }
    if (selectedItems.length < maxSelections) {
      const newItem: ItemType = {
        referenceId: item[idtag],
        referenceType: openFor,
        title: item.title,
      }
      onSelect([...selectedItems, newItem]);
      setQuery("");
      setIsOpen(false);
    }
  };
  console.log("Selected Items:", selectedItems);

  const handleRemove = (itemId: number) => {
    const remainingItems = selectedItems.filter((item) => item.referenceId !== itemId);
    onSelect(remainingItems);
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

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            {filteredItems.length > 0 ? filteredItems.map((item) => (
              <button
                key={item[idtag]}
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0"
              >
                {renderItem(item)}
              </button>
            )) : (
              <div className="px-4 py-3 text-gray-400">No items found</div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedItems?.map((item) => (
          <div
            key={item.referenceId}
            className="bg-blue-600 text-white px-3 py-[0.15rem] rounded-full flex items-center gap-2"
          >
            <span className="text-sm">{item.title}</span>
            <Button
              type="button"
              onClick={() => handleRemove(item.referenceId)}
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