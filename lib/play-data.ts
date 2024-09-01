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

export const generateSongStats = () => {
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
