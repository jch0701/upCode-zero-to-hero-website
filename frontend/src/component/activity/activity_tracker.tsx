import { initial_Completion } from "./activity_details";
import type { completion_activity_type } from "./activity_details";

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

    // Correct validation
    const isValid =
      parsed &&
      typeof parsed.submissions === "number" &&
      parsed.opened &&
      typeof parsed.opened === "object" &&
      Array.isArray(parsed.history);

    activity = isValid
      ? parsed
      : structuredClone(initial_Completion); // deep clone
  } catch {
    activity = structuredClone(initial_Completion);
  }

  // Apply user update
  updateFn(activity);

  // Add history entry
  activity.history.push({
    type: meta?.type || "update",
    id: meta?.id || "",
    timestamp: Date.now(),
  });

  // Save
  localStorage.setItem(key, JSON.stringify(activity));
}

