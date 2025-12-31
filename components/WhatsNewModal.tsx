"use client";

import { useEffect, useState } from "react";

type WhatsNewModalProps = {
  version: string;
  content: string;
};

export default function WhatsNewModal({ version, content }: WhatsNewModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem("lastSeenVersion");
    if (lastSeenVersion !== version) {
      setIsOpen(true);
    }
  }, [version]);

  const handleClose = () => {
    localStorage.setItem("lastSeenVersion", version);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const formatText = (text: string, idx: number) => {
    const parts: React.ReactNode[] = [];
    const combinedRegex = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    while ((match = combinedRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      if (match[1]) {
        parts.push(
          <code key={`${idx}-${keyCounter++}`} className="bg-burgundy/10 px-1.5 py-0.5 rounded text-sm font-mono">
            {match[1]}
          </code>
        );
      } else if (match[2] && match[3]) {
        parts.push(
          <a 
            key={`${idx}-${keyCounter++}`} 
            href={match[3]} 
            className="text-burgundy hover:text-gold underline transition-colors"
            onClick={handleClose}
          >
            {match[2]}
          </a>
        );
      }
      
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? <>{parts}</> : text;
  };

  const lines = content.split("\n");
  const title = lines[0].replace(/^#\s*/, "").trim();
  const bulletPoints = lines
    .slice(1)
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace(/^-\s*/, "").trim());

  return (
    <>
      <div
        className="fixed inset-0 bg-ink/20 z-40 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-parchment border border-burgundy/30 rounded-md shadow-2xl max-w-md w-full mx-auto">
          <div className="px-6 pt-2 pb-1">
            <h2 className="text-xl font-bold text-burgundy border-b border-gold pb-1 font-mono my-2">{title}</h2>
          </div>

          <div className="px-6">
            <ul className="space-y-0.5">
              {bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-baseline gap-2 text-ink">
                  <span className="text-burgundy text-xs">✦</span>
                  <span>{formatText(point, idx)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 pb-4 flex justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-1 bg-parchment text-burgundy border border-burgundy/50 rounded hover:bg-burgundy hover:text-parchment transition-colors text-sm"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

