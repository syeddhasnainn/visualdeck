import { NextRequest, NextResponse } from "next/server";

interface Env {
    AI: Ai;
  }
  
export const runtime = "edge";


export async function GET(req:NextRequest,context: {env: Env}) {

console.log('context', context.env.AI);
  const answer = await context.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    prompt: "What is the origin of the phrase 'Hello, World'",
  });
  return NextResponse.json({ answer });
}
