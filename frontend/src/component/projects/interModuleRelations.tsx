import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RoadmapItemCard } from "../roadmaps/Selector/roadmapCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import search_icon from "../../assets/search_icon.png"
interface InterModuleRelationsProps {
  projectId: number;
}

export const InterModuleRelations: React.FC<InterModuleRelationsProps> = ({projectId}) => {
  const navigate = useNavigate();
  const recommendations = useSelector((state: any) => state.recommendations.recommendations.filter((rec: any) =>{
    if (rec.sourceType !== "project" && rec.targetType !== "project")
      return false;
    return rec;
  }));
  const relatedRoadmaps = recommendations.filter((rec: any) => rec.sourceId === projectId && rec.targetType === "roadmap");
  const relatedCareers = recommendations.filter((rec: any) => rec.sourceId === projectId && rec.targetType === "career");
  
  console.log("Recommendations:", useSelector((state: any) => state.recommendations.recommendations));
  const roadmapsData = useSelector((state: any) => state.roadmap.roadmapList.filter((roadmap: any) => {
    return relatedRoadmaps.some((rec: any) => rec.targetId === roadmap.roadmapID 
    || rec.sourceId === roadmap.roadmapID);
  }));

  const careersData = []; // Assume careers data is fetched similarly
  return(
    <Collapsible className="w-[90%] rounded-2xl p-[0.1rem] text-sm font-semibold bg-gray-800 text-white">
      <div className="flex items-center pl-5 justify-between gap-4 px-4 text-white">
        <p>Related Roadmaps and Career opportunities</p>
        <CollapsibleTrigger className="p-2">
          <img src={search_icon} alt="Toggle" className="w-7 rotate-90 cursor-pointer hover:bg-gray-600/80 p-1 rounded-xl" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pl-5 my-2 pb-5 pt-3 px-4 space-y-3 border-t-2 border-gray-700">
        <div>
          <h1 className="text-2xl">Related Roadmaps</h1>
          <span className="text-[1rem] italic font-extralight">
            Don't know how to start? Perhaps explore these roadmaps to learn the skills you need.
          </span>
          <div className="mt-2">
            {relatedRoadmaps.length === 0 ? <p>No related roadmaps found.</p> :
              <div className="flex flex-wrap gap-4 mt-4">
                {roadmapsData.map((rec: any) => (
                  <div key={rec.id} onClick={() => navigate(`/roadmaps/${rec.targetId}`)}>
                    <RoadmapItemCard
                      selectedRoadmapID={rec.roadmapID}
                    />
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
        <div>
          <h1 className="text-2xl">Related Careers</h1>
          <span className="text-[1rem] italic font-extralight">
            Look at all these career opportunities that require skills from this project!
          </span>
          <div className="mt-2">
            {relatedCareers.length === 0 && <p>No related careers found.</p>}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}