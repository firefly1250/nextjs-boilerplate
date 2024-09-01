import { format, eachDayOfInterval } from "date-fns";

export type IPlayData = Record<string, { count: number; time: number }>;

export const generatePlayData = (start: Date, end: Date) => {
  const interval = eachDayOfInterval({ start, end });
  return interval.reduce((acc, date) => {
    acc[format(date, "yyyy-MM-dd")] = {
      count: Math.floor(Math.random() * 50),
      time: Math.floor(Math.random() * 180), // 0-180分
    };
    return acc;
  }, {} as IPlayData);
};
