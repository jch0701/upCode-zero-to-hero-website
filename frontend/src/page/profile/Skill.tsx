import SkillOptions from "@/page/profile/SkillOptions";

type skillOptionsProps ={
  userId: number;
  editable: boolean;
};

export function SkillContent({ userId,editable }: skillOptionsProps) {
  return (
    <div className="space-y-2">
      <label className="block text-center text-indigo-600 text-6xl font-bold pt-1 mt-2 -mb-2 ">Skills</label>
       <div className="w-full flex justify-center items-center py-8">
        <div className="w-[600px] bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl pt-4 pb-10 space-y-6">
        <label className="block text-start text-indigo-400 text-2xl font-semibold pt-1 pl-7 mb-2 mt-2 ml-3">{editable?"Add Your Skills": "User Skills"}</label>
          <div className="p-6">
          
            <SkillOptions userId={userId} editable= {editable} />
          </div> 
        </div>
        </div> 
    </div>
    
  );
}

