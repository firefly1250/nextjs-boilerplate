"use client";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPlayData } from "@/lib/play-data";
import React from "react";

type Props = {
  playData: IPlayData;
};

const StatisticsOfDay: React.FC<Props> = ({ playData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">今日の統計</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-muted-foreground">再生曲数</dt>
            <dd className="text-2xl font-bold">
              {playData[format(new Date(), "yyyy-MM-dd")]?.count ?? 0}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">総再生時間</dt>
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
            <dt className="font-medium text-muted-foreground">最も聴いた曲</dt>
            <dd className="font-semibold">Bohemian Rhapsody</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default StatisticsOfDay;
