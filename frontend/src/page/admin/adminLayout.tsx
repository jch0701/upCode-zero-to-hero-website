import { Outlet } from "react-router-dom";
import AdminSidebar from "@/component/admin/adminSidebar";
import AdminTopbar from "@/component/admin/adminTopbar";

export default function AdminLayout() {
    return (
        <div className="flex w-full h-screen bg-gray-800 text-white">

            {/* Sidebar */}
            <AdminSidebar />
          
            {/* Right side with topbar and content */}
            <div className="flex flex-col flex-1 overflow-auto ml-64">
                <AdminTopbar />

                <div className="p-6 overflow-y-auto h-full">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}
