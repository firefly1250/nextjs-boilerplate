import { Music } from "lucide-react";
import { startOfMonth, endOfMonth } from "date-fns";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticsOfDay from "./statistics-of-day";
import { generatePlayData } from "@/lib/play-data";
import SongList from "./song-list";
import Calendar from "./calendar";

export default function MusicView() {
  const currentMonth = new Date();
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const playData = generatePlayData(start, end);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">YouTube Music 統計</h1>
        <Music className="h-6 w-6" />
      </header>

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            <StatisticsOfDay playData={playData}></StatisticsOfDay>
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendar">カレンダー</TabsTrigger>
                <TabsTrigger value="songs">曲統計</TabsTrigger>
              </TabsList>
              <TabsContent value="calendar">
                <Calendar></Calendar>
              </TabsContent>
              <TabsContent value="songs">
                <SongList></SongList>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
