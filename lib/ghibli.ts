export type Film = {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  image: string;
  movie_banner: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
};

const API_BASE = "https://ghibliapi.vercel.app";

import { translateFilmByTitle } from "./ghibliTranslations";

// Cache pour les traductions pour éviter les appels répétés

async function fetchGhibli<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error("Échec de la requête vers l'API Ghibli");
  }

  return response.json();
}

export async function getFilms(language: "fr" | "en" = "en"): Promise<Film[]> {
  const films = await fetchGhibli<Film[]>("/films");

  if (language === "fr") {
    return films.map((f) => {
      const tr = translateFilmByTitle(f.title, {
        title: f.title,
        description: f.description,
        director: f.director,
        producer: f.producer,
      });

      return {
        ...f,
        title: tr.title ?? f.title,
        description: tr.description ?? f.description,
        director: tr.director ?? f.director,
        producer: tr.producer ?? f.producer,
      } as Film;
    });
  }

  return films;
}

export async function getFilm(id: string, language: "fr" | "en" = "en"): Promise<Film | null> {
  try {
    const film = await fetchGhibli<Film>(`/films/${id}`);

    if (language === "fr") {
      const tr = translateFilmByTitle(film.title, {
        title: film.title,
        description: film.description,
        director: film.director,
        producer: film.producer,
      });

      return {
        ...film,
        title: tr.title ?? film.title,
        description: tr.description ?? film.description,
        director: tr.director ?? film.director,
        producer: tr.producer ?? film.producer,
      } as Film;
    }

    return film;
  } catch {
    return null;
  }
}

export async function getPeople(urls: string[]) {
  const validUrls = urls.filter(
    (url) =>
      url &&
      url !== "https://ghibliapi.vercel.app/people/"
  );

  if (validUrls.length === 0) {
    return [];
  }

  return Promise.all(
    validUrls.map(async (url) => {
      const res = await fetch(url);

      return res.json();
    })
  );
}
