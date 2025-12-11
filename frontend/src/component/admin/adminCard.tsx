import React from "react";

type AdminCardProps = {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
};

const AdminCard: React.FC<AdminCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="
      p-6 rounded-xl 
      bg-[#1D2635] 
      border border-[#2A3547] 
      hover:border-indigo-500 
      transition-all flex items-center gap-5
      shadow-lg
    ">
      
      {/* Icon Wrapper */}
      <div className={`p-4 rounded-lg ${color ?? "bg-indigo-600"} text-white text-2xl`}>
        {icon ?? "📌"}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-3xl font-bold text-white leading-tight">{value}</span>
      </div>

    </div>
  );
};

export default AdminCard;
