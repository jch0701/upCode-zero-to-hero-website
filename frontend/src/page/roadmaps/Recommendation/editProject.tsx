import React from "react";
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export const EditRecommendedProject: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-700/70 w-full max-w-2xl rounded-xl shadow-2xl p-6">
                <div className="flex justify-end">
                    <button
                        className="text-white hover:text-gray-400 p-1"
                        aria-label="Close Chapter Description"
                        onClick={() => navigate(-1)}
                    >
                        <X size={20} />
                    </button>
                </div>
                <h1 className="text-3xl font-bold">Coming Soon</h1>
            </div>
        </div>
    );
};