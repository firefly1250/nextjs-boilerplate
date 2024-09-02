"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, AlertCircle } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Stats {
  id: string;
  title: string;
  artistid: string;
  artistname: string;
  thumbnailurl: string;
  lastplayed: Date;
  count: number;
}

export default function SongList() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const [stats, setStats] = useState<Stats[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/stats_by_music");
      const jsonData = await res.json();
      setStats(jsonData);
    };
    fetchData();
  }, []);

  const sortedSongStats = stats.sort((a, b) => {
    return sortOrder === "asc" ? a.count - b.count : b.count - a.count;
  });

  const maxPlayCount = Math.max(...sortedSongStats.map((song) => song.count));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">曲別再生回数</CardTitle>
          <Button variant="outline" size="sm" onClick={toggleSortOrder}>
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
              song.lastplayed
            );
            const isOld = daysSinceLastPlay > 30;
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    <a href={`https://music.youtube.com/watch?v=${song.id}`}>
                      {song.title}
                    </a>
                  </span>
                  <span className="text-muted-foreground">{song.count}回</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    <a
                      href={`https://music.youtube.com/browse/${song.artistid}`}
                    >
                      {song.artistname}
                    </a>
                  </span>
                  <span
                    className={cn(
                      "flex items-center",
                      isOld && "text-destructive"
                    )}
                  >
                    {isOld && <AlertCircle className="h-3 w-3 mr-1" />}
                    {format(song.lastplayed, "yyyy/MM/dd")}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full",
                      isOld ? "bg-destructive" : "bg-primary"
                    )}
                    style={{
                      width: `${(song.count / maxPlayCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
