import * as muse from "libmuse";
import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import { kv } from "@vercel/kv";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: Request) {
  try {
    const token = (await kv.get("token")) as muse.Token;

    muse.setup({ auth: { token } });

    const history = await muse.get_history();

    const promises: Promise<QueryResult<QueryResultRow>>[] = [];

    const today = format(new Date(), "yyyy-MM-dd", { locale: ja });

    for (const category of history.categories) {
      if (category.title !== "Today") continue;

      for (const item of category.items) {
        promises.push(
          sql`
        INSERT INTO music (
          id,
          title,
          artistId ,
          artistName,
          albumId ,
          albumName ,
          durationSeconds,
          thumbnailUrl
        )
        VALUES (
          ${item.videoId},
          ${item.title},
          ${item.artists[0].id},
          ${item.artists[0].name},
          ${item.album?.id},
          ${item.album?.name},
          ${item.duration_seconds},
          ${item.thumbnails[item.thumbnails.length - 1].url}
        )
        ON CONFLICT (id) DO NOTHING;
        `
        );
        promises.push(
          sql`
        INSERT INTO history (
          videoId,
          date
        )
        VALUES (
          ${item.videoId},
          ${today}
        )
        ON CONFLICT (videoId, date) DO NOTHING;
        `
        );
      }
    }

    Promise.all(promises);
    return new Response();
  } catch (e: any) {
    console.error(e);
    return new Response();
  }
}
