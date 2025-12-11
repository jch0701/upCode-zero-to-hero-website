import React from "react";
import { useState } from "react";
import { dashboardList } from "@/lib/types";

import RadioGroup from "@/component/projects/radioGroup";
import { ProfileContent } from "./Profile";
import { ActivityContent } from "./Activity";
import { SkillContent } from "./Skill";
import { SettingContent } from "./Setting";

export const All: React.FC = () => {
    
    const click = ["All", ...dashboardList];
    const [category, setCategory] = useState(click[0]);
    
    function handleCategoryChange(value: string){
        setCategory(value);
    }
    // Load the active user from localStorage
    const activeUserRaw = localStorage.getItem("activeUser");
    const activeUser = activeUserRaw ? JSON.parse(activeUserRaw) : null;
    if(!activeUser){
        return(
            <div className="text-white p-10">
            <h1>You must be logged in to view your profile.</h1>
            <a href="/login" className="text-blue-300 underline">Go to Login</a>
            </div>
        );
    }
    return (
    <div className="flex">
        {/*navbar vertically*/}
        <div className="grid grid-cols-[200px_1fr] min-h-full px-6 w-full">
          <div className="relative ">
                <RadioGroup
                    onClick={handleCategoryChange}
                    options={click}
                    selected={category}
                    isHorizontal = {false}
                    className= "w-60 fixed"
                />  
            </div>
            {/*contents*/}
            <div className="pt-10 ">
                {category === "All" && (
                <>
                  <ProfileContent key={activeUser?.email}/>
                  <SkillContent email={activeUser?.email}/>
                  <ActivityContent/>
                  <SettingContent/>
                </>
              )}
                {category === "Profile" && <ProfileContent key={activeUser?.email}/>}
                {category === "Activity" && <ActivityContent/>}
                {category === "Skill" && <SkillContent email={activeUser?.email}/>}
                {category === "Setting" && <SettingContent/>}
            </div>
        </div>
        
    </div>
    );
};