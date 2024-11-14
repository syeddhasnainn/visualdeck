import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: Request) {
  const { userQuery } = await request.json() as { userQuery: string };
  
  const { env } = await getCloudflareContext();
  const queryVector = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
    text: userQuery,
  });

  let matches = await env.VECTORIZE.query(queryVector.data[0], {
    topK: 10,
    returnValues: false,
    returnMetadata: "all"
  })

  return NextResponse.json({ matches });
}
