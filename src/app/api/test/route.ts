import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";


export async function GET(request: NextRequest) {
  const userQuery = request.nextUrl.searchParams.get("query") || ""
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
