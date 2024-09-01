import { sql } from "@vercel/postgres";

(async () => {
  await sql`
    DROP TABLE IF EXISTS history;
  `;

  await sql`
    DROP TABLE IF EXISTS music;
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS history (
      id SERIAL PRIMARY KEY,
      videoId VARCHAR(20) NOT NULL,
      date DATE NOT NULL,
      createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (videoId, date)
    );
    `;

  await sql`
    CREATE TABLE IF NOT EXISTS music (
      id VARCHAR(20) PRIMARY KEY,
      title VARCHAR(256) NOT NULL,
      artistId VARCHAR(30),
      artistName VARCHAR(256),
      albumId VARCHAR(30),
      albumName VARCHAR(256),
      durationSeconds INT NOT NULL,
      thumbnailUrl VARCHAR(256) NOT NULL
    );
    `;
})();
