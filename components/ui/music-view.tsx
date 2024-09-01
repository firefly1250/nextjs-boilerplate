"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Music,
  ArrowUpDown,
  AlertCircle,
} from "lucide-react";
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  differenceInDays,
} from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const generatePlayData = (start: Date, end: Date) => {
  const interval = eachDayOfInterval({ start, end });
  return interval.reduce((acc, date) => {
    acc[format(date, "yyyy-MM-dd")] = {
      count: Math.floor(Math.random() * 50),
      time: Math.floor(Math.random() * 180), // 0-180分
    };
    return acc;
  }, {} as Record<string, { count: number; time: number }>);
};

const generateSongStats = () => {
  const today = new Date();
  return [
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      playCount: 42,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      title: "Imagine",
      artist: "John Lennon",
      playCount: 38,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 10),
    },
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      playCount: 35,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 5),
    },
    {
      title: "Billie Jean",
      artist: "Michael Jackson",
      playCount: 33,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 15),
    },
    {
      title: "Like a Rolling Stone",
      artist: "Bob Dylan",
      playCount: 30,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 30),
    },
    {
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      playCount: 28,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 3),
    },
    {
      title: "Purple Rain",
      artist: "Prince",
      playCount: 25,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 20),
    },
    {
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      playCount: 23,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 45),
    },
    {
      title: "Hey Jude",
      artist: "The Beatles",
      playCount: 21,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 7),
    },
    {
      title: "Wonderwall",
      artist: "Oasis",
      playCount: 19,
      lastPlayed: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 1),
    },
  ];
};

export default function MusicView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });
  const playData = generatePlayData(start, end);
  const songStats = generateSongStats();

  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedSongStats = [...songStats].sort((a, b) => {
    return sortOrder === "asc"
      ? a.playCount - b.playCount
      : b.playCount - a.playCount;
  });

  const maxPlayCount = Math.max(
    ...sortedSongStats.map((song) => song.playCount)
  );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">YouTube Music 統計</h1>
        <Music className="h-6 w-6" />
      </header>

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendar">カレンダー</TabsTrigger>
                <TabsTrigger value="songs">曲統計</TabsTrigger>
              </TabsList>
              <TabsContent value="calendar">
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
              </TabsContent>
              <TabsContent value="songs">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">曲別再生回数</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleSortOrder}
                      >
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        {sortOrder === "asc" ? "昇順" : "降順"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sortedSongStats.map((song, index) => {
                        const daysSinceLastPlay = differenceInDays(
                          new Date(),
                          song.lastPlayed
                        );
                        const isOld = daysSinceLastPlay > 30;
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{song.title}</span>
                              <span className="text-muted-foreground">
                                {song.playCount}回
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{song.artist}</span>
                              <span
                                className={cn(
                                  "flex items-center",
                                  isOld && "text-destructive"
                                )}
                              >
                                {isOld && (
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                )}
                                {format(song.lastPlayed, "yyyy/MM/dd")}
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full",
                                  isOld ? "bg-destructive" : "bg-primary"
                                )}
                                style={{
                                  width: `${
                                    (song.playCount / maxPlayCount) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">今日の統計</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-muted-foreground">
                      再生曲数
                    </dt>
                    <dd className="text-2xl font-bold">
                      {playData[format(new Date(), "yyyy-MM-dd")]?.count ?? 0}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">
                      総再生時間
                    </dt>
                    <dd className="text-2xl font-bold">
                      {playData[format(new Date(), "yyyy-MM-dd")]?.time ?? 0}分
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">
                      最も聴いたアーティスト
                    </dt>
                    <dd className="font-semibold">Queen</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">
                      最も聴いた曲
                    </dt>
                    <dd className="font-semibold">Bohemian Rhapsody</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
