export function getActiveUser() {
  const raw = localStorage.getItem("activeUser");
  return raw ? JSON.parse(raw) : null;
}

export function isAdmin() {
  const user = getActiveUser();
  return user?.role === "admin";
}

