"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getFilms } from "@/lib/ghibli";
import type { Film } from "@/lib/ghibli";

const CACHE_KEY = "ghibliFilmsCache";
const CACHE_TTL = 1000 * 60 * 60; // 1 heure

type FilmCache = {
  timestamp: number;
  films: Film[];
};

function getCachedFilms(): FilmCache | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const cached = JSON.parse(raw) as FilmCache;
    if (!cached?.timestamp || !Array.isArray(cached?.films)) return null;

    return cached;
  } catch {
    return null;
  }
}

function saveCachedFilms(films: Film[]) {
  if (typeof window === "undefined") return;

  const cache: FilmCache = {
    timestamp: Date.now(),
    films,
  };

  window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function isReloadNavigation() {
  if (typeof window === "undefined") return false;

  const entries = performance.getEntriesByType("navigation");
  if (entries.length > 0) {
    return (entries[0] as PerformanceNavigationTiming).type === "reload";
  }

  return (performance as unknown as { navigation?: { type?: number } })?.navigation?.type === 1;
}

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimerRef = useRef<number | null>(null);

  const scheduleRefresh = (timestamp: number) => {
    if (refreshTimerRef.current) {
      window.clearTimeout(refreshTimerRef.current);
    }

    const delay = Math.max(0, CACHE_TTL - (Date.now() - timestamp));
    refreshTimerRef.current = window.setTimeout(() => {
      fetchFilms(true);
    }, delay);
  };

  const fetchFilms = async (force = false) => {
    try {
      if (!force) {
        const cache = getCachedFilms();
        if (cache) {
          const elapsed = Date.now() - cache.timestamp;
          const isFresh = elapsed < CACHE_TTL;

          setFilms(cache.films);
          setIsLoading(false);
          scheduleRefresh(cache.timestamp);

          if (isFresh && !isReloadNavigation()) {
            return;
          }
        }
      }

      setIsLoading(true);
      const data = await getFilms();
      setFilms(data);
      saveCachedFilms(data);
      scheduleRefresh(Date.now());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms(isReloadNavigation());

    return () => {
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    film.original_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    film.original_title_romanised.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8">
        <header className="space-y-4 rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] p-8 paper-panel">
          <p className="text-sm uppercase tracking-[0.35em] text-[#a23524]">Catalogue Ghibli</p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Découvrez l'univers magique de Studio Ghibli
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[#7d5a4e]">
              Une application immersive qui récupère les films depuis l'API Ghibli et vous invite à explorer chaque fiche.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[#7d5a4e]">
            <span>{films.length} films disponibles</span>
            <span className="text-[#d94d33]">•</span>
            <span>Actualisé automatiquement toutes les heures</span>
          </div>
          
          <div className="mt-6">
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-6 py-3 text-slate-900 placeholder-[#a23524] outline-none transition focus:border-[#d94d33] focus:ring-2 focus:ring-[#d94d33]/20"
            />
            {searchTerm && (
              <p className="mt-3 text-sm text-[#7d5a4e]">
                {filteredFilms.length} résultat{filteredFilms.length > 1 ? "s" : ""} pour "<strong>{searchTerm}</strong>"
              </p>
            )}
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-[#7d5a4e]">Chargement des films...</p>
          </div>
        ) : filteredFilms.length > 0 ? (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredFilms.map((film) => (
            <Link
              key={film.id}
              href={`/films/${film.id}`}
              className="group overflow-hidden rounded-[2rem] border border-[#d99f8b] bg-white shadow-[0_20px_80px_rgba(133,76,58,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d94d33]"
            >
              <div
                className="relative h-64 overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(rgba(255,245,241,0.6), rgba(255,245,241,0.95)), url('${film.movie_banner}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <p className="inline-flex items-center rounded-full bg-[#fff3ea] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#a23524] shadow-lg shadow-[rgba(133,76,58,0.08)]">
                    {film.release_date}
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-slate-950 transition group-hover:text-[#d94d33]">
                    {film.title}
                  </h2>
                  <p className="text-sm text-[#7d5a4e]">{film.original_title_romanised}</p>
                </div>
                <p className="text-sm leading-6 text-[#7d5a4e] line-clamp-4">{film.description}</p>
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-[#7d5a4e]">
                  <span>{film.director}</span>
                  <span>{film.running_time} min</span>
                </div>
              </div>
            </Link>
          ))}
          </section>
        ) : (
          <div className="rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] p-12 text-center">
            <p className="text-lg text-[#7d5a4e]">
              Aucun film ne correspond à votre recherche "<strong>{searchTerm}</strong>".
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 inline-flex items-center rounded-full bg-[#d94d33] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#b33e2a]"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
