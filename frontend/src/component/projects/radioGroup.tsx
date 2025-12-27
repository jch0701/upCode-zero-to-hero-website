interface RadioProps {
  onClick: (value: any) => void;
  options: {label: string, value: string}[];
  selected?: string;
  isHorizontal?: boolean;
  className?: string;
  buttonClassName?: string;
}

const RadioGroup: React.FC<RadioProps> = ({ onClick, options, isHorizontal = true, selected = options[0], className, buttonClassName }) => {
  const selectedOutline = "bg-white/80 text-black font-semibold";
  function handleSelect(key: number) {
    onClick((options[key].value));
  }
  return (
    <div className={`flex ${isHorizontal ? "border-b-2" : "h-full flex-col border-r-2"} pt-5 border-white overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`p-2 bg-none w-full ${isHorizontal ? "text-center mr-2" : "text-right mb-2"} 
          cursor-pointer transition-colors
            ${selected === option.value ? selectedOutline : "text-white hover:bg-white/10 "}
            ${buttonClassName || ""}
          `}
          onClick={() => handleSelect(index)}>
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default RadioGroup;