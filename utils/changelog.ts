import { readdir, readFile } from "fs/promises";
import { join } from "path";

export type ChangelogEntry = {
  version: string;
  content: string;
};

export async function getLatestChangelog(): Promise<ChangelogEntry | null> {
  try {
    const changesDir = join(process.cwd(), "data", "changes");
    const files = await readdir(changesDir);
    
    // Filter for markdown files and parse version numbers
    const versionFiles = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const match = file.match(/^(\d+)_(\d+)\.md$/);
        if (!match) return null;
        return {
          filename: file,
          major: parseInt(match[1], 10),
          minor: parseInt(match[2], 10),
        };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);

    if (versionFiles.length === 0) return null;

    // Sort by version (major.minor) descending
    versionFiles.sort((a, b) => {
      if (a.major !== b.major) return b.major - a.major;
      return b.minor - a.minor;
    });

    const latest = versionFiles[0];
    const filePath = join(changesDir, latest.filename);
    const content = await readFile(filePath, "utf-8");

    return {
      version: `${latest.major}.${latest.minor}`,
      content,
    };
  } catch (error) {
    console.error("Error reading changelog:", error);
    return null;
  }
}



