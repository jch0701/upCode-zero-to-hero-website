import React from "react";
import { useState } from "react";
import { dashboardList } from "@/lib/types";
import RadioGroup from "@/component/projects/radioGroup";

export const Profile: React.FC = () => {

    const handleLogout = () => {
        // Manually set userID
        localStorage.removeItem("userID");
        window.location.href = "/";
    };

    const click = ["ALL", ...dashboardList];
    const [category, setCategory] = useState(click[0]);

    function handleCategoryChange(value: string){
        setCategory(value);
    }
    return (
    <div>
        <div className="w-full fixed bottom-0 top-25 px-10 grid grid-cols-[200px_1fr] gap-10">
            <div className="sticky ">
                <RadioGroup
                    onClick={handleCategoryChange}
                    options={click}
                    selected={category}
                    isHorizontal = {false}
                    className= "w-50"
                />
                    
            </div>
            <div className="pt-6">
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    Logout
                </button>
            </div>
        </div>
        
    </div>
    );
};