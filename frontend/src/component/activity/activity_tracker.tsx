import { saveUserActivity } from "@/api/profile/activityAPI";
import { getActiveUserField } from "@/lib/utils";

// Holds new actions that haven't been saved yet
let pendingIncrements: any = {
  submissions: 0,
  opened: { main_topic: {}, chapters: {} },
  history: []
};

let timer: NodeJS.Timeout | null = null;

// 2. The Save Function
// This runs automatically 2 seconds after the user stops clicking.
const saveToBackend = async () => {
  const userId = getActiveUserField("userId");
  if (!userId) return;

  const hasData = 
    pendingIncrements.submissions > 0 ||
    Object.keys(pendingIncrements.opened.main_topic).length > 0 ||
    Object.keys(pendingIncrements.opened.chapters).length > 0 ||
    pendingIncrements.history.length > 0;

  if (!hasData) return;
  const payload = { ...pendingIncrements };

  // Reset the bucket ensures we never send the same "plus one" twice.
  pendingIncrements = {
    submissions: 0,
    opened: { main_topic: {}, chapters: {} },
    history: []
  };

  try {
    console.log("Syncing Activity Increment:", payload);
    await saveUserActivity(userId, payload);
  } catch (e) {
    console.error("Failed to sync activity", e);
  }
};

// Helper Function
export const trackNewActivity = (
  type: string,
  id: string | number
) => {
  const key = String(id);

  // Add timestamp to history
  pendingIncrements.history.push({
    type,
    id: key,
    timestamp: Date.now()
  });

  // Add 1 to the specific counter
  if (type === "chapter") {
    pendingIncrements.opened.chapters[key] = (pendingIncrements.opened.chapters[key] || 0) + 1;
  } 
  else if (type === "roadmap") {
    pendingIncrements.opened.main_topic[key] = (pendingIncrements.opened.main_topic[key] || 0) + 1;
  } 
  else if (type === "submission") {
    pendingIncrements.submissions += 1;
  }

  // Auto-Save Logic (Debounce) Wait 1 seconds, then save.
  if (timer) clearTimeout(timer);
  timer = setTimeout(saveToBackend, 1000); 
};