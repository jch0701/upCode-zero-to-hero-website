export const getWeeklyStats = (history: any[]) => {
  const today = new Date();
  
  // Calculate the start of the current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(today.getDate() - today.getDay());

  // Calculate the end of the current week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const counts = Array(7).fill(0);

  history.forEach((item: any) => {
    const dateValue = item.timestamp || item.date || item.created_at;
    if (!dateValue) return;

    const itemDate = new Date(dateValue);

    // Only count if the date is actually inside this week's range
    if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
      const dayIndex = itemDate.getDay(); // 0 = Sunday, 6 = Saturday
      counts[dayIndex]++;
    }
  });

  return days.map((day, index) => ({
    day: day,
    count: counts[index]
  }));
};

export const getMonthlyStats = (history: any[]) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const counts = Array(12).fill(0);

  history.forEach((item: any) => {
      const dateValue = item.timestamp || item.date || item.created_at;
      if (!dateValue) return;

      const itemDate = new Date(dateValue);
      
      if (itemDate.getFullYear() === currentYear) {
          counts[itemDate.getMonth()]++;
      }
  });

  return months.map((month, index) => ({
      month: month,
      count: counts[index]
  }));
};