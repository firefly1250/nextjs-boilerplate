import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: Request) {
  try {
    const data = await sql`SELECT * FROM music`;
    const history = data.rows;
    return new Response(JSON.stringify(history), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error(e);
    return new Response();
  }
}
