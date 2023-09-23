import boards from "./data.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(boards.boards, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
