import { initial_Completion } from "./activity_details";
import type { completion_activity_type } from "./activity_details";
import { saveUserActivity } from "@/api/profile/activityAPI";

export function update_Activity(
  updateFn: (activity: completion_activity_type) => void,
  meta?: { type: string; id: string | number }
) {
  const raw = localStorage.getItem("activeUser");
  if (!raw) return;

  const user = JSON.parse(raw);
  const key = `activity_${user.userId}`;

  let activity: completion_activity_type;

  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : null;

    // Ensure 'opened' fields are NOT arrays
    const isValid =
      parsed &&
      typeof parsed.submissions === "number" &&
      parsed.opened &&
      !Array.isArray(parsed.opened.main_topic) &&  
      !Array.isArray(parsed.opened.chapters) &&   
      Array.isArray(parsed.history);

    activity = isValid
      ? parsed
      : structuredClone(initial_Completion); 
  } catch {
    activity = structuredClone(initial_Completion);
  }

  // Force these to be Objects if they are missing or wrongly typed
  if (!activity.opened) activity.opened = { main_topic: {}, chapters: {} };
  if (Array.isArray(activity.opened.main_topic)) activity.opened.main_topic = {};
  if (Array.isArray(activity.opened.chapters)) activity.opened.chapters = {};
  // ------------------------

  // Apply user update
  updateFn(activity);

  // Add history entry
  activity.history.push({
    type: meta?.type || "update",
    id: meta?.id || "",
    timestamp: Date.now(),
  });

  // Save to LocalStorage
  localStorage.setItem(key, JSON.stringify(activity));

  // Sync to Database
  saveUserActivity(user.userId, activity)
    .then(() => console.log("Activity synced to DB"))
    .catch((err) => console.error("Failed to sync activity:", err));
}