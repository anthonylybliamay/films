"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getFilm } from "@/lib/ghibli";
import type { Film } from "@/lib/ghibli";
import { useLanguage } from "@/context/LanguageContext";
import { trailers } from "@/lib/trailers";
import { translations } from "@/lib/translations";

type FilmProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function FilmDetailPage({ params }: FilmProps) {
  const { id } = use(params);
  const { language } = useLanguage();
  const [film, setFilm] = useState<Film | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const trailerId = trailers[id];
  const t = translations[language];

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getFilm(id, language)
      .then((f) => {
        if (!mounted) return;
        setFilm(f);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setFilm(null);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id, language]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-transparent text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="space-y-4 rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] p-10 paper-panel">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a23524]">{t.filmLoading}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!film) {
    return (
      <main className="min-h-screen bg-transparent text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="space-y-4 rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] p-10 paper-panel">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a23524]">{t.filmNotFound}</p>
            <h1 className="text-3xl font-semibold text-slate-950">{t.filmNotFoundMessage}</h1>
            <p className="max-w-2xl text-[#7d5a4e]">
              {t.VerifyConnexion}
            </p>
            <Link
              href="/films"
              className="inline-flex rounded-full bg-[#d94d33] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b33e2a]"
            >
              {t.GoBackToList}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <Link href="/films" className="inline-flex items-center gap-2 text-sm text-[#a23524] transition hover:text-[#d94d33]">
          {t.BackToCatalog}
        </Link>

        <section className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] overflow-hidden border border-[#d99f8b] bg-[#fff7f1] shadow-[0_20px_80px_rgba(133,76,58,0.12)] paper-panel">
            <div className="relative h-[420px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(255,245,241,0.7), rgba(255,245,241,0.95)), url('${film.movie_banner}')` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#fff7f1]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-sm uppercase tracking-[0.35em] text-[#a23524]">{film.release_date} · {film.running_time} min</p>
                <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">{film.title}</h1>
                <p className="mt-1 text-sm text-[#7d5a4e]">{film.original_title_romanised}</p>
              </div>
            </div>

            <div className="space-y-6 p-8">
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-950">{t.Synopsis}</h2>
                <p className="leading-7 text-[#7d5a4e]">{film.description}</p>
              </div>
              {trailerId && (
                <section className="mt-12">
                  <h2 className="mb-4 text-2xl font-semibold text-slate-950">
                    {t.trailer}
                  </h2>

                  <div className="overflow-hidden rounded-3xl border border-slate-800">
                    <iframe
                      className="aspect-video w-full"
                      src={`https://www.youtube.com/embed/${trailerId}`}
                      title={`${film.title} Trailer`}
                      allowFullScreen
                    />
                  </div>
                </section>
              )}
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">{t.director}</p>
                  <p className="mt-2 text-lg font-medium text-slate-950">{film.director}</p>
                </div>
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">{t.producer}</p>
                  <p className="mt-2 text-lg font-medium text-slate-950">{film.producer}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">{t.rt_score}</p>
                  <p className="mt-2 text-lg font-semibold text-[#d94d33]">{film.rt_score}%</p>
                </div>
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">{t.release_date}</p>
                  <p className="mt-2 text-lg font-medium text-slate-950">{film.release_date}</p>
                </div>
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">{t.running_time}</p>
                  <p className="mt-2 text-lg font-medium text-slate-950">{film.running_time} min</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] p-8 paper-panel">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-950">{t.filmDetails}</h2>
              <p className="text-sm leading-6 text-[#7d5a4e]">
                {t.filmDetailsMessage}
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#7d5a4e]">
              <div className="rounded-3xl bg-[#fff3ea] p-5 accent-pill">
                <p className="font-semibold text-slate-950">{t.original_title}</p>
                <p className="mt-2 text-slate-700">{film.original_title}</p>
              </div>
              <div className="rounded-3xl bg-[#fff3ea] p-5">
                <p className="font-semibold text-slate-950">{t.api_url}</p>
                <p className="mt-2 break-all text-[#d94d33]">{film.url}</p>
              </div>
              <div className="rounded-3xl bg-[#fff3ea] p-5">
                <p className="font-semibold text-slate-950">{t.characters}</p>
                <p className="mt-2 text-[#7d5a4e]">{film.people.length || "N/A"}</p>
              </div>
              <div className="rounded-3xl bg-[#fff3ea] p-5">
                <p className="font-semibold text-slate-950">{t.locations}</p>
                <p className="mt-2 text-[#7d5a4e]">{film.locations.length || "N/A"}</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
