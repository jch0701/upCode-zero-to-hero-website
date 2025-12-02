import React from "react";
import Navbar from "../component/navbar";

export const Profile: React.FC = () => {
    return (
        <div className="pt-20">
            <Navbar />
            <h1 className="text-3xl font-bold">Profile Page</h1>
        </div>
    );
};