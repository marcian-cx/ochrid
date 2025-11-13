import Link from "next/link";
import { getTodayKey } from "@/utils/date";

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl mb-4">404</h1>
      <p className="text-xl mb-8">This page could not be found.</p>
      <Link 
        href={`/${getTodayKey()}`}
        className="inline-block bg-burgundy text-parchment px-6 py-3 rounded hover:bg-gold transition-colors"
      >
        Return to Today's Reading
      </Link>
    </div>
  );
}

