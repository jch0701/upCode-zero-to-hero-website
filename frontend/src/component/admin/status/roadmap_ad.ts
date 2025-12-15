import { store } from "@/store";

export function getTotalRoadmapCount() {
  return store.getState().roadmap.roadmapList.length;
}

export function getTotalRoadmapsCreated() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  let total = 0;

  users.forEach((u: any) => {
    const act = JSON.parse(localStorage.getItem(`activity_${u.email}`) || "{}");
    total += act.roadmap_created || 0;
  });

  return total;
}

export function getTotalRoadmapsDeleted() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  let total = 0;

  users.forEach((u: any) => {
    const act = JSON.parse(localStorage.getItem(`activity_${u.email}`) || "{}");
    total += act.roadmap_deleted || 0;
  });

  return total;
}
