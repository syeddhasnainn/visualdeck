import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const { query } = await request.json() as any || { query: "" };
  const { env } = await getCloudflareContext();
  const queryVector = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
    text: query,
  });

  let matches = await env.VECTORIZE.query(queryVector.data[0], {
    topK: 10,
    returnValues: false,
    returnMetadata: "all"
  })

  return NextResponse.json({ matches });
}
