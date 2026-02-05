import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const hasVisited = (await cookieStore).get("visited");

    if (!hasVisited) {
      await redis.incr("portfolio-views");

      const res = NextResponse.json({
        views: await redis.get<number>("portfolio-views"),
      });

      res.cookies.set("visited", "1", {
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return res;
    }

    const views = await redis.get<number>("portfolio-views");
    return NextResponse.json({ views: views ?? 0 });
  } catch (err) {
    console.error("Redis error:", err);
    return NextResponse.json({ views: 0 });
  }
}
