export function getUserCount() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.length;
}

export function getUser_onscreen() {
  const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const now = Date.now();
  const fiveMin = 5 * 60 * 1000; // 5 minutes

  return allUsers.filter((u: any) => {
    const last = localStorage.getItem(`last_active_${u.email}`);
    if (!last) return false;

    return now - Number(last) <= fiveMin;
  }).length;
}
