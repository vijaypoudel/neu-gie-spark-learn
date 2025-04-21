
export const weekData = [
  { week: "2024-03-18", Math: 78, Science: 66, Language: 80, Social: 70 },
  { week: "2024-03-25", Math: 82, Science: 74, Language: 89, Social: 75 },
  { week: "2024-04-01", Math: 73, Science: 68, Language: 77, Social: 86 },
  { week: "2024-04-08", Math: 91, Science: 81, Language: 79, Social: 88 },
  { week: "2024-04-15", Math: 87, Science: 73, Language: 72, Social: 81 },
  { week: "2024-04-22", Math: 95, Science: 78, Language: 85, Social: 89 },
  { week: "2024-04-29", Math: 84, Science: 72, Language: 91, Social: 80 },
  { week: "2024-05-06", Math: 86, Science: 83, Language: 73, Social: 82 },
  { week: "2024-05-13", Math: 89, Science: 77, Language: 84, Social: 88 },
  { week: "2024-05-20", Math: 78, Science: 88, Language: 78, Social: 85 },
  { week: "2024-05-27", Math: 94, Science: 80, Language: 86, Social: 92 },
  { week: "2024-06-03", Math: 90, Science: 85, Language: 80, Social: 87 },
];

export const subjectList = Object.keys(weekData[0]).filter(k => k !== "week");

export const subjectColors: Record<string, string> = {
  Math: "#FB923C",
  Science: "#BDE2B9",
  Language: "#FFC26C",
  Social: "#FFA99F",
};

export function getWeeksForTimeline(timeline: number): string[] {
  return weekData.slice(-timeline * 4).map(row => row.week);
}

export function averageScoresByWeek(
  data: typeof weekData,
  subject: string,
  weeks: string[],
) {
  return weeks.map((wk) => {
    const row = data.find(r => r.week === wk);
    return {
      week: wk,
      avg: row ? row[subject] : null,
    };
  });
}

export function averageScoreForTimeline(
  data: typeof weekData,
  subject: string,
  weeks: string[],
) {
  const vals = weeks.map(wk => {
    const row = data.find(r => r.week === wk);
    return row && typeof row[subject] === "number" ? row[subject] : null;
  }).filter(v => v !== null) as number[];
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function formatWeekLabel(week: string) {
  const date = new Date(week);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
