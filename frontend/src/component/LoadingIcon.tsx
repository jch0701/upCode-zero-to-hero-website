import { Spinner } from "./shadcn/spinner";

export const LoadingIcon: React.FC<
{ text?: string, iconClass?: string, textClass?: string }
> = ({ text, iconClass, textClass }) => {
  return (
    <div className={`flex h-full w-full gap-3 items-center justify-center ${iconClass}`}>
      <Spinner className="size-20 text-amber-500/50" />
      {text && <span className={`text-amber-500/50 text-3xl ${textClass}`}>{text}</span>}
    </div>
  )
};