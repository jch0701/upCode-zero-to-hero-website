import { RoadmapItemCard } from "../roadmaps/Selector/roadmapCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import search_icon from "../../assets/search_icon.png"
import { useGetAllRecommendations } from "@/api/projects/recommendationsAPI";
import Recommendation from "../roadmaps/Selector/recommendation";
interface InterModuleRelationsProps {
  projectId: number;
}

export const InterModuleRelations: React.FC<InterModuleRelationsProps> = ({ projectId }) => {
  const {
    data: recommendations = [],
    isLoading: isLoadingRecommendations,
    isError: isErrorRecommendations,
    isSuccess: isSuccessLoadingRecommendations
  } = useGetAllRecommendations(projectId);

  if (isLoadingRecommendations) {
    return <p>Loading related modules...</p>;
  }

  if (isErrorRecommendations) {
    return <p>Whoops! Sorry, there was an error while loading the related modules.</p>;
  }

  let relatedRoadmaps: any[] = [], relatedCareers: any[] = [];
  if (isSuccessLoadingRecommendations && recommendations.length > 0) {
    relatedRoadmaps = recommendations?.filter((rec: any) =>
      rec.sourceId === projectId && rec.targetType === "roadmap" || rec.targetType === "chapter" ||
      rec.targetId === projectId && rec.sourceType === "roadmap" || rec.sourceType === "chapter");
    relatedCareers = recommendations?.filter((rec: any) =>
      rec.sourceId === projectId && rec.targetType === "career" ||
      rec.targetId === projectId && rec.sourceType === "career");
  }

  return (
    <Collapsible className="w-[90%] rounded-2xl p-[0.1rem] text-sm font-semibold bg-gray-800 text-white">
      <CollapsibleTrigger className="p-2 rounded-2xl w-full cursor-pointer">
        <div className="flex items-center pl-5 justify-between gap-4 px-4 text-white">
          <p>Related Roadmaps and Career opportunities</p>
          <img src={search_icon} alt="Toggle" className="w-7 rotate-90 cursor-pointer hover:bg-gray-600/80 p-1 rounded-xl" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-5 my-2 pb-5 pt-3 px-4 space-y-3 border-t-2 border-gray-700">
        <div>
          <h1 className="text-2xl">Related Roadmaps</h1>
          <span className="text-[1rem] italic font-extralight">
            Don't know how to start? Perhaps explore these roadmaps to learn the skills you need.
          </span>
          <div className="mt-2">
            {relatedRoadmaps?.length === 0 ? <p>No related roadmaps found.</p> :
              <div className="flex flex-wrap gap-4 mt-4">
                {relatedRoadmaps?.map((rec: any) => {
                  if (rec.sourceType === "chapter" || rec.targetType === "chapter") return (
                    <div key={rec.id}>
                      <RoadmapItemCard
                        customTitle={`${rec.roadmapTitle} -> ${rec.title}`}
                        selectedRoadmapID={rec.roadmapID}
                      />
                    </div>
                  ); else
                    return (
                      <div key={rec.id}>
                        <RoadmapItemCard
                          selectedRoadmapID={rec.sourceType === "roadmap" ? rec.sourceId : rec.targetId}
                        />
                      </div>
                    )
                })}
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
            {/* replace && with ? later on */}
            {relatedCareers?.length === 0 ? <p>No related careers found.</p>
              : <div className="flex flex-wrap gap-4 mt-4">
                {relatedCareers?.map((rec: any) => (
                  <Recommendation
                    mode="career"
                    selectedID={rec.sourceType === "career" ? rec.sourceId : rec.targetId}
                    navigateDetails={() => { }}
                    creator={""}
                  />
                ))}
              </div>
            }
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}