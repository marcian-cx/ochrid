import { readFile } from "fs/promises";
import { join } from "path";
import PrayersClient from "./PrayersClient";

type SubPrayer = {
  title?: string;
  prayer: string;
};

type SimplePrayer = {
  title?: string;
  prayer: string;
};

type NestedPrayer = {
  title: string;
  prayers: SubPrayer[];
};

type Prayer = SimplePrayer | NestedPrayer;

async function getPrayers() {
  try {
    const morningPath = join(process.cwd(), 'data', 'prayers', 'morning_prayers.json');
    const eveningPath = join(process.cwd(), 'data', 'prayers', 'evening_prayers.json');
    
    const morningData = await readFile(morningPath, 'utf-8');
    const eveningData = await readFile(eveningPath, 'utf-8');
    
    const morning: Prayer[] = JSON.parse(morningData);
    const evening: Prayer[] = JSON.parse(eveningData);
    
    return { morning, evening };
  } catch (error) {
    console.error('Error reading prayer files:', error);
    return { morning: [], evening: [] };
  }
}

export const metadata = {
  title: "Orthodox Morning and Evening Prayers",
  description: "Traditional Orthodox Christian morning and evening prayers. Part of the Prologue from Ochrid daily companion by St. Nikolai Velimirović.",
  keywords: [
    "Orthodox prayers",
    "Orthodox morning prayers",
    "Orthodox evening prayers",
    "Eastern Orthodox prayers",
    "Christian daily prayers",
  ],
  openGraph: {
    title: "Orthodox Morning and Evening Prayers",
    description: "Traditional Orthodox Christian morning and evening prayers from the Prologue from Ochrid.",
    url: "https://ochrid.com/prayers",
  },
  alternates: {
    canonical: "https://ochrid.com/prayers",
  },
};

export default async function PrayersPage() {
  const { morning, evening } = await getPrayers();
  
  return <PrayersClient prayers={{ morning, evening }} />;
}
