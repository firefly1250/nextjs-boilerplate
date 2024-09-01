import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const data = await sql`
      SELECT
        m.id,
        m.title,
        m.artistId,
        m.artistName,
        m.thumbnailUrl,
        g.lastPlayed,
        g.count
      FROM 
        (SELECT
            videoId,
            MAX(date) as lastPlayed,
            COUNT(*) as count
        FROM history
        GROUP BY videoId
        ) g
      JOIN music m
        ON g.videoId = m.id;
    `;
    const history = data.rows;
    return new Response(JSON.stringify(history, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error(e);
    return new Response();
  }
}
