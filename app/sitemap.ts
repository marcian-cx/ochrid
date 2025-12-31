import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ochrid.com";
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prayers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/censorship`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const readingPages: MetadataRoute.Sitemap = [];
  
  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, "0");
    for (let day = 1; day <= daysInMonth[month - 1]; day++) {
      const dayStr = day.toString().padStart(2, "0");
      readingPages.push({
        url: `${baseUrl}/readings/${monthStr}-${dayStr}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.9,
      });
    }
  }

  return [...staticPages, ...readingPages];
}

