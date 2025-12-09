import { Empty, EmptyHeader, EmptyMedia, EmptyContent, EmptyTitle, EmptyDescription } from "@/component/shadcn/empty";
import type React from "react";

interface EmptyBoxProps {
  iconSrc: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const EmptyUI: React.FC<EmptyBoxProps> = ({ iconSrc, title, description, children }) => {
  return <Empty className="bg-gray-800/20 rounded-2xl gap-0 p-8 sm:p-12 border border-gray-700/50 shadow-lg">
    <EmptyHeader className="flex flex-col items-center gap-2 mb-6">
      <EmptyMedia className="flex justify-center">
        <img className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-80 hover:opacity-100 transition-opacity" src={iconSrc} alt="Empty Icon" />
      </EmptyMedia>
      <EmptyContent className="text-center">
        <EmptyTitle className="text-2xl sm:text-3xl font-semibold text-white mb-2">{title}</EmptyTitle>
        {description && <EmptyDescription className="text-gray-300 text-sm sm:text-base max-w-sm">{description}</EmptyDescription>}
      </EmptyContent>
    </EmptyHeader>
    <EmptyContent className="flex flex-col items-center gap-2">
      {children}
    </EmptyContent>
  </Empty>;
}