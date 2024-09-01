import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const data = await sql`SELECT * FROM history`;
    const history = data.rows;
    return new Response(JSON.stringify(history), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error(e);
    return new Response();
  }
}
