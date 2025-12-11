export function getWeeklyStats(history: any[]) {
  const ONE_DAY = 86400000;
  const now = Date.now();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Convert JS getDay() (0=Sun) → 0=Mon mapping
  const convertDay = (jsDay: number) => (jsDay === 0 ? 6 : jsDay - 1);

  return weekDays.map((label, index) => {
    const count = history.filter((log) => {
      if (now - log.timestamp > 7 * ONE_DAY) return false;

      const jsDay = new Date(log.timestamp).getDay();
      const mappedDay = convertDay(jsDay);

      return mappedDay === index;
    }).length;

    return { day: label, count };
  });
}

export function getMonthlyStats(history: any[]) {
  const ONE_MONTH = 86400000 * 30;
  const now = Date.now();

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun",
                      "Jul","Aug","Sep","Oct","Nov","Dec"];

  return monthNames.map((monthLabel, index) => {
    const count = history.filter(log => {
      const diff = now - log.timestamp;
      if (diff > ONE_MONTH) return false;

      return new Date(log.timestamp).getMonth() === index;
    }).length;

    return { month: monthLabel, count };
  });
}


