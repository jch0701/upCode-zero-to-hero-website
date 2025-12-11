// src/admin/components/AdminTopbar.tsx
import { getActiveUser } from "@/admin/auth/auth";

export default function AdminTopbar() {
  const user = getActiveUser();

  return (
    <div className="w-full bg-gray-800 p-4 flex justify-end items-center border-b border-gray-700">

      <span className="text-gray-300 mr-3">{user?.email}</span>

      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
        {user?.username?.[0]?.toUpperCase()}
      </div>

    </div>
  );
}
