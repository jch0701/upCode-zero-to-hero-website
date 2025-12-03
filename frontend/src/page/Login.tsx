import React from "react";

export const Login: React.FC = () => {
    const handleLogin = () => {
        // Manually set userID
        localStorage.setItem("userID", "100001");
        window.location.href = "/";
    };
    return (
        <div className="pt-6">
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Login
            </button>
        </div>
    );
};