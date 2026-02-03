import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const views = await redis.incr("portfolio-views");
    return NextResponse.json({ views });
  } catch (err) {
    console.error("Redis error:", err);
    return NextResponse.json({ views: 0 });
  }
}
