import { useState } from "react";

interface VerticalRadioProps {
  onClick: (value: string) => void;
  options: string[];
  selected?: string;
}

const VerticalRadio: React.FC<VerticalRadioProps> = ({ onClick, options, selected = options[0] }) => {
  const selectedOutline = "bg-white/80 text-black font-semibold";
  const [selectedOption, setSelectedOption] = useState<string>(selected);
  function handleSelect(key: number){
    setSelectedOption(options[key]);
    onClick(options[key]);
  }

  return (
    <div className="flex flex-col border-r-2 border-white">
      {options.map((option, index) => (
        <button
          key={index}
          className={`p-2 bg-none w-full text-right mb-2 cursor-pointer transition-colors
            ${selectedOption === option ? selectedOutline : "text-white hover:bg-white/10 "}
          `}
          onClick={() => handleSelect(index)}>
          {option}
        </button>
      ))}
    </div>
  )
}

export default VerticalRadio;