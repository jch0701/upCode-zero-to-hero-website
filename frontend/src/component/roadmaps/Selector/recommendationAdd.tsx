import React from 'react';
import { CgAddR } from 'react-icons/cg';

interface RecommendationProps {
    extraClass : string; 
}

const AddRecommendation: React.FC<RecommendationProps> = ({extraClass}) => {
    return (
        <div className={`w-70 cursor-pointer border-none 
                        bg-gray-800/50 block pl-3 rounded-lg shadow-md
                        flex items-center justify-center
                        hover:bg-gray-800/80 transition-shadow duration-300
                        hover:text-white transition-colors ${extraClass}`}>
            <CgAddR className='flex w-30 h-30'/>    
        </div>
    )
}

export default AddRecommendation