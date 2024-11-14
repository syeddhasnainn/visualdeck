"use client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setMatches([]);
    const res = await fetch(`/api/test`, {
      method: "POST",
      body: JSON.stringify({ query })
    });
    const data = await res.json() as any;
    const m = data.matches.matches;
    setMatches(m);
    setLoading(false);
    setQuery("");
  };

  return (
    <div>
      <div>
        <div className="mx-auto max-w-[90%]">
          <input onKeyDown={(e) => e.key === "Enter" && handleSearch()} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a frame" className="w-full outline-none border border-gray-600 rounded-xl p-2 bg-transparent my-8" type="text" />
          {loading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl">
              {matches.map((m: any) => (
                <div key={m}>
                  <Image className="w-full" src={m.metadata.img_url} alt="image" width={500} height={500} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
