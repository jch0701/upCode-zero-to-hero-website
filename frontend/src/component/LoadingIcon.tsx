import { Spinner } from "./shadcn/spinner";

export const LoadingIcon: React.FC<{ 
  text?: string; 
  containerClass?: string; // Renamed from iconClass for clarity
  textClass?: string; 
}> = ({ text, containerClass, textClass }) => {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 min-h-fit w-full py-8 ${containerClass}`}>
      <Spinner className="size-12 text-amber-50" />
      {text && (
        <span className={`text-amber-50 text-xl font-medium animate-pulse ${textClass}`}>
          {text}
        </span>
      )}
    </div>
  );
};