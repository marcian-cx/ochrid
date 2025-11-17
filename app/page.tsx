"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTodayKey } from "@/utils/date";
import Loading from "@/components/Loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/readings/${getTodayKey()}`);
  }, [router]);

  return <Loading />;
}

