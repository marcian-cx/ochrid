const JULIAN_OFFSET_DAYS = 13;

export function getTodayKey(): string {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

export function getJulianDateKey(gregorianDateKey: string): string {
  const [month, day] = gregorianDateKey.split("-").map(Number);
  const date = new Date(2024, month - 1, day);
  date.setDate(date.getDate() - JULIAN_OFFSET_DAYS);
  
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

export function getNextDate(currentDate: string): string {
  const [month, day] = currentDate.split("-").map(Number);
  const date = new Date(2024, month - 1, day);
  date.setDate(date.getDate() + 1);
  
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

export function getPrevDate(currentDate: string): string {
  const [month, day] = currentDate.split("-").map(Number);
  const date = new Date(2024, month - 1, day);
  date.setDate(date.getDate() - 1);
  
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

export function formatDateDisplay(dateKey: string): string {
  const [month, day] = dateKey.split("-").map(Number);
  const date = new Date(2024, month - 1, day);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return `${monthNames[date.getMonth()]} ${date.getDate()}`;
}

export function formatJulianGregorianDisplay(gregorianDateKey: string): string {
  const julianDateKey = getJulianDateKey(gregorianDateKey);
  const julianDisplay = formatDateDisplay(julianDateKey);
  const gregorianDisplay = formatDateDisplay(gregorianDateKey);
  
  return `${julianDisplay} / ${gregorianDisplay}`;
}

