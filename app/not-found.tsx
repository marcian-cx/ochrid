import Link from "next/link";
import { getTodayKey } from "@/utils/date";

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl mb-4">404</h1>
      <p className="text-xl mb-8">This page could not be found.</p>
      <Link 
        href={`/readings/${getTodayKey()}`}
        className="btn inline-block border border-burgundy/30 text-burgundy px-8 py-3 font-semibold rounded hover:border-gold hover:text-gold hover:bg-burgundy/5 transition-all"
      >
        Return to Today's Reading
      </Link>
    </div>
  );
}

