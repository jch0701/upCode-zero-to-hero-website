export function simulation() {
    const activeUser = JSON.parse(localStorage.getItem("activeUser") || "null");
    if (!activeUser) return;

    const key = `last_active_${activeUser.email}`;
    localStorage.setItem(key, Date.now().toString());
}