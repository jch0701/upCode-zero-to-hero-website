type User = {
  userId: number;
  username: string;
  email: string;
};

export function syncUserToUsers(activeUser: User) {
  const users: User[] = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const exists = users.some(u => u.userId === activeUser.userId);

  if (!exists) {
    users.push({
      userId: activeUser.userId,
      username: activeUser.username,
      email: activeUser.email
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
}
