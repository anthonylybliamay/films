import Link from "next/link";
import { getFilms } from "@/lib/ghibli";

export default async function FilmsPage() {
  const films = await getFilms();

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
            <span>Actualisé toutes les 2 minutes</span>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {films.map((film) => (
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
      </div>
    </main>
  );
}
