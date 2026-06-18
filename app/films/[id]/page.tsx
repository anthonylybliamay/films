import Link from "next/link";
import { getFilm } from "@/lib/ghibli";
import { trailers } from "@/lib/trailers";

type FilmProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FilmDetailPage({ params }: FilmProps) {
  const { id } = await params;
  const film = await getFilm(id);
  const trailerId = trailers[id];

  if (!film) {
    return (
      <main className="min-h-screen bg-transparent text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="space-y-4 rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] p-10 paper-panel">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a23524]">Film introuvable</p>
            <h1 className="text-3xl font-semibold text-slate-950">Désolé, impossible de charger ce film.</h1>
            <p className="max-w-2xl text-[#7d5a4e]">
              Vérifiez votre connexion ou revenez à la page de liste pour sélectionner un autre film.
            </p>
            <Link
              href="/films"
              className="inline-flex rounded-full bg-[#d94d33] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b33e2a]"
            >
              Retour à la liste
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
          ← Retour au catalogue
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
                <h2 className="text-xl font-semibold text-slate-950">Synopsis</h2>
                <p className="leading-7 text-[#7d5a4e]">{film.description}</p>
              </div>
              {trailerId && (
                <section className="mt-12">
                  <h2 className="mb-4 text-2xl font-semibold text-white">
                    🎬 Bande-annonce
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
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">Réalisateur</p>
                  <p className="mt-2 text-lg font-medium text-slate-950">{film.director}</p>
                </div>
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">Producteur</p>
                  <p className="mt-2 text-lg font-medium text-slate-950">{film.producer}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">Score</p>
                  <p className="mt-2 text-lg font-semibold text-[#d94d33]">{film.rt_score}%</p>
                </div>
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">Date</p>
                  <p className="mt-2 text-lg font-medium text-slate-950">{film.release_date}</p>
                </div>
                <div className="rounded-3xl bg-[#fff3ea] p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7d5a4e]">Durée</p>
                  <p className="mt-2 text-lg font-medium text-slate-950">{film.running_time} min</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] p-8 paper-panel">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-950">Détails du film</h2>
              <p className="text-sm leading-6 text-[#7d5a4e]">
                Informations supplémentaires extraites directement de l'API officielle Studio Ghibli.
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#7d5a4e]">
              <div className="rounded-3xl bg-[#fff3ea] p-5 accent-pill">
                <p className="font-semibold text-slate-950">Titre original</p>
                <p className="mt-2 text-slate-700">{film.original_title}</p>
              </div>
              <div className="rounded-3xl bg-[#fff3ea] p-5">
                <p className="font-semibold text-slate-950">URL API</p>
                <p className="mt-2 break-all text-[#d94d33]">{film.url}</p>
              </div>
              <div className="rounded-3xl bg-[#fff3ea] p-5">
                <p className="font-semibold text-slate-950">Personnages</p>
                <p className="mt-2 text-[#7d5a4e]">{film.people.length || "N/A"}</p>
              </div>
              <div className="rounded-3xl bg-[#fff3ea] p-5">
                <p className="font-semibold text-slate-950">Lieux</p>
                <p className="mt-2 text-[#7d5a4e]">{film.locations.length || "N/A"}</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
