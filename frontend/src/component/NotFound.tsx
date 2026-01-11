import { useNavigate, useLocation } from "react-router-dom";

interface NotFoundProps {
  resource?: string;
}

export const NotFound = ({ resource }: NotFoundProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract and capitalize resource type
  const pathSegment = location.pathname.split("/")[1];
  const rawItem = resource || pathSegment || "page";
  const item = rawItem.charAt(0).toUpperCase() + rawItem.slice(1);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 m-auto bg-gray-800/20 rounded-2xl w-fit">
      <div className="max-w-md w-full text-center">
        {/* Subtle Icon / Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-6">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-50 mb-2">
          {item} not found
        </h1>
        
        <p className="font-semibold text-slate-50 mb-8">
          We couldn't find the {item.toLowerCase()} you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-lg font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Go Back
          </button>
          <button 
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
