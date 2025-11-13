export type FastingLevel = 
  | "No Fast"
  | "Fast Free"
  | "Xerophagy"
  | "Strict Fast"
  | "Wine & Oil"
  | "Fish Allowed"
  | "Caviar Allowed";

export type Reading = {
  display: string;
  short: string;
  source: string;
  passage: Array<{
    verse: string;
    content: string;
  }>;
};

export type Story = {
  title: string;
  story: string;
  icon?: string;
  feast_name?: string;
  feast_level?: number;
};

export type OrthocalDay = {
  date: string;
  year: number;
  month: number;
  day: number;
  day_of_year: number;
  summary_title: string;
  fast_level: number;
  fast_level_desc: FastingLevel;
  fast_exception: number;
  fast_exception_desc: string;
  commemorations: string[];
  abbreviated_reading_indices: number[];
  readings: Reading[];
  stories: Story[];
};

const ORTHOCAL_BASE_URL = "https://orthocal.info/api/gregorian";

export async function fetchOrthocalDay(
  year?: number,
  month?: number,
  day?: number
): Promise<OrthocalDay | null> {
  try {
    let url = ORTHOCAL_BASE_URL;
    
    if (year && month && day) {
      url = `${ORTHOCAL_BASE_URL}/${year}/${month}/${day}/`;
    } else {
      url = `${ORTHOCAL_BASE_URL}/`;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error(`Orthocal API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data as OrthocalDay;
  } catch (error) {
    console.error("Error fetching Orthocal data:", error);
    return null;
  }
}

export async function fetchOrthocalToday(): Promise<OrthocalDay | null> {
  return fetchOrthocalDay();
}

export async function fetchOrthocalByDate(dateKey: string): Promise<OrthocalDay | null> {
  const [month, day] = dateKey.split("-").map(Number);
  const year = new Date().getFullYear();
  return fetchOrthocalDay(year, month, day);
}

export function getFastingColor(fastLevel: number): string {
  switch (fastLevel) {
    case 0:
      return "#4ade80";
    case 1:
      return "#86efac";
    case 2:
      return "#fbbf24";
    case 3:
      return "#fb923c";
    case 4:
      return "#ef4444";
    default:
      return "#94a3b8";
  }
}

export function getFastingEmoji(fastLevel: number): string {
  switch (fastLevel) {
    case 0:
      return "🍽️";
    case 1:
      return "🥗";
    case 2:
      return "🐟";
    case 3:
      return "🫒";
    case 4:
      return "🍞";
    default:
      return "📅";
  }
}

