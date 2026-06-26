'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

type PersonalNoteFieldProps = {
  filmId: string;
};

export default function PersonalNoteField({ filmId }: PersonalNoteFieldProps) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];

  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setNote("");
      setMessage(null);
      return;
    }

    const loadNote = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(`/api/personal-notes?filmId=${filmId}`, {
          headers: {
            "x-user-id": user.id,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNote(data.note ?? "");
        }
      } catch (error) {
        console.error("Error loading personal note:", error);
      } finally {
        setIsFetching(false);
      }
    };

    loadNote();
  }, [filmId, user?.id]);

  const handleSave = async () => {
    if (!user) {
      setMessage(t.loginToSaveNote);
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/personal-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ filmId, note }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save personal note");
      }

      setNote(data.note ?? note);
      setMessage(t.noteSaved);
    } catch (error) {
      console.error("Error saving personal note:", error);
      setMessage(error instanceof Error ? error.message : "Unable to save note");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-[#e3c4b5] bg-[#fffaf6] p-4">
      <label htmlFor={`personal-note-${filmId}`} className="text-sm font-semibold text-slate-950">
        {t.personalNote}
      </label>

      <textarea
        id={`personal-note-${filmId}`}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        disabled={!user || isFetching || isLoading}
        placeholder={t.personalNotePlaceholder}
        rows={4}
        className="mt-3 w-full rounded-2xl border border-[#d9b7a6] bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#d94d33] focus:ring-2 focus:ring-[#f4c9ba] disabled:cursor-not-allowed disabled:opacity-70"
      />

      {user ? (
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading || isFetching}
          className="mt-3 rounded-full bg-[#d94d33] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b33e2a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "..." : t.saveNote}
        </button>
      ) : (
        <p className="mt-3 text-sm text-[#7d5a4e]">{t.loginToSaveNote}</p>
      )}

      {message ? (
        <p className="mt-3 text-sm text-[#a23524]">{message}</p>
      ) : null}
    </div>
  );
}
