"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTodayKey } from "@/utils/date";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${getTodayKey()}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy"></div>
        <p className="mt-4 text-burgundy">Loading today's reading...</p>
      </div>
    </div>
  );
}

