import { useRouteError, useNavigate } from "react-router"
import Door_Symbol from '../assets/Door_Symbol.webp';
import { Button } from "@/component/shadcn/button";
export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log('ErrorBoundary caught an error:', error);
  return (
    <div className="flex flex-col items-start justify-start pl-10 h-screen bg-gray-900 text-white ">
      <h1 className="text-[10rem] ">:&#40;</h1>
      <p className="text-[2rem] w-[50%] text-left mb-2">UpCode ran into some unexpected problems. Why don't you return to the home page for now?</p>
      <pre className="py-4 rounded-lg overflow-x-auto">
          {error instanceof Error ? error.message : String(error)}
      </pre>
      <Button className="mt-6 flex items-center gap-2 py-6 px-3 cursor-pointer bg-gray-800 hover:bg-gray-950" onClick={() => navigate('/')}>
        <img src={Door_Symbol} alt="<-" className="w-10 h-auto" />
        <span className="text-[1.2rem]">Return to Homepage</span>
      </Button>
    </div>
  );
}