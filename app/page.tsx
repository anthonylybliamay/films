'use client'
import { useEffect } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const { language } = useLanguage();
    const { isAuthenticated } = useAuth();
    const t = translations[language];

    useEffect(() => {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-transparent text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-10 px-6 py-16 sm:px-8">
        <div className="space-y-8 rounded-[2.5rem] border border-[#d99f8b] bg-[#fff7f1] p-10 shadow-[0_30px_120px_rgba(133,76,58,0.12)] paper-panel">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a23825]">{t.studio}</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              {t.Accroche}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#7d5a4e]">
              {t.anouncement}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.1fr_auto] sm:items-center">
            <div className="space-y-3 rounded-[2rem] border border-[#d99f8b] bg-[#fff3ea] p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">{t.ambiance}</p>
              <p className="text-lg text-[#7d5a4e]">{t.design}</p>
            </div>
            <Link
              href={isAuthenticated ? "/films" : "/login"}
              className="inline-flex items-center justify-center rounded-full bg-[#d94d33] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#b33e2a]"
            >
              {isAuthenticated ? t.explorerFilms : t.connexion}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
