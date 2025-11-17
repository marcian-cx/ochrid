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

  // Parse the markdown content
  const lines = content.split("\n");
  const title = lines[0].replace(/^#\s*/, "").trim();
  const bulletPoints = lines
    .slice(1)
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace(/^-\s*/, "").trim());

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/20 z-40 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-black rounded-md shadow-2xl max-w-md w-full mx-auto">
          <div className="px-6 pt-2 pb-1">
            <h2 className="text-2xl font-bold text-white border-b border-gold pb-1">{title}</h2>
          </div>

          <div className="px-6">
            <ul className="space-y-3">
              {bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white">
                  <span className="text-white mt-1">✦</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 pb-4 flex justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-1.5 bg-black text-white border border-white rounded hover:bg-white hover:text-black transition-colors text-sm"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

