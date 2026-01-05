"use client";

import Link from "next/link";
import { getTodayKey } from "@/utils/date";

type TodayLinkProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TodayLink({ children, className }: TodayLinkProps) {
  const todayKey = getTodayKey();
  
  return (
    <Link href={`/readings/${todayKey}`} className={className}>
      {children}
    </Link>
  );
}

