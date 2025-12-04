interface RadioProps {
  onClick: (value: any) => void;
  options: string[];
  selected?: string;
  isHorizontal?: boolean;
  className?: string;
}

const RadioGroup: React.FC<RadioProps> = ({ onClick, options, isHorizontal = true, selected = options[0], className }) => {
  const selectedOutline = "bg-white/80 text-black font-semibold";
  function handleSelect(key: number) {
    onClick(options[key]);
  }
  return (
    <div className={`flex ${isHorizontal ? "border-b-2" : "flex-col border-r-2"}  border-white ${className}`}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`p-2 bg-none w-full ${isHorizontal ? "text-center mr-2" : "text-right mb-2"} 
          cursor-pointer transition-colors
            ${selected === option ? selectedOutline : "text-white hover:bg-white/10 "}
          `}
          onClick={() => handleSelect(index)}>
          {option}
        </button>
      ))}
    </div>
  )
}

export default RadioGroup;