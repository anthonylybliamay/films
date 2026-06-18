'use client'

import Link from "next/link";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] p-10 paper-panel shadow-[0_20px_80px_rgba(133,76,58,0.12)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#a23524]">404</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl text-slate-950">{t.NotFound}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#7d5a4e]">
            {t.Error}
          </p>
          <Link
            href="/films"
            className="mt-8 inline-flex rounded-full bg-[#d94d33] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b33e2a]"
          >
            {t.GoBackToFilmList}
          </Link>
        </div>
      </div>
    </main>
  );
}
