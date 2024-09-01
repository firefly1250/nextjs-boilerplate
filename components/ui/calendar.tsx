"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePlayData } from "@/lib/play-data";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });
  const playData = generatePlayData(start, end);

  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {format(currentMonth, "yyyy年 M月", { locale: ja })}
        </CardTitle>
        <div className="space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">前月</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">翌月</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <div
              key={day}
              className="text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
          {days.map((day, dayIdx) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayData = playData[dateKey];
            return (
              <div
                key={day.toString()}
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-md text-sm p-1",
                  dayIdx === 0 && `col-start-${day.getDay() + 1}`,
                  "hover:bg-muted"
                )}
              >
                <time dateTime={dateKey} className="font-medium">
                  {format(day, "d")}
                </time>
                <div className="text-[10px] leading-tight text-muted-foreground">
                  <span>{dayData.count}曲</span>
                  <br />
                  <span>{dayData.time}分</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
