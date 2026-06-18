"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } =
    useLanguage();

  return (
    <div className="flex gap-2 rounded-lg border border-foreground/20 p-1">
      <button
        onClick={() => setLanguage("fr")}
        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
          language === "fr"
            ? "border border-[#d99f8b] bg-[#fff7f1] text-foreground"
            : "text-foreground hover:bg-[#d99f8b]/10"
        }`}
      >
        🇫🇷 FR
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 border-[#d99f8b] ${
          language === "en"
            ? "border border-[#d99f8b] bg-[#fff7f1] text-foreground"
            : "text-foreground hover:bg-[#d99f8b]/10"
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}