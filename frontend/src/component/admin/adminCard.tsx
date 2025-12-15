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
      p-6 rounded-xl bg-gray-900 border border-gray-700 hover:border-indigo-500 transition-all flex items-center gap-5 shadow-lg
    ">
      
      {/* Icon Wrapper */}
      <div className="text-3xl">
        {icon
          ? React.cloneElement(icon as any, { className: color ?? "text-indigo-400" })
          : "📌"}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className={`text-2xl font-bold ${color ?? "text-indigo-400"}`}>{value}</span>
      </div>

    </div>
  );
};

export default AdminCard;
