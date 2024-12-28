"use client";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SearchMatch {
  metadata: {
    img_url: string;
  };
}

export default function Home() {
  const [userQuery, setUserQuery] = useState("");
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!userQuery.trim()) return;

    setIsLoading(true);
    setMatches([]);

    try {
      const res = await fetch(`/api/test`, {
        method: "POST",
        body: JSON.stringify({ userQuery }),
      });
      const data = await res.json();
      setMatches(data.matches.matches);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
      setUserQuery("");
    }
  };

  return (
    <main className="bg-black">
      <div className="max-w-7xl px-12 mx-auto flex flex-col items-center justify-between min-h-screen">
        <div className="text-white overflow-auto">
          <div className="grid grid-cols-2 gap-2">
          {matches.map((match, index)=> (
            <div>
              <Image alt="search" src={match.metadata.img_url} width={1000} height={1000}/>
            </div>
            
          ))}
          </div>
        </div>
        <div className="fixed bottom-0 mb-4">
          <input
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for movie frames..."
            type="text"
            className="bg-white/10 min-w-[600px] backdrop-blur-lg border border-white/10 rounded-3xl p-4 text-white placeholder-white outline-none w-full shadow-lg shadow-black/20"
          />
        </div>
      </div>
    </main>
  );
}
