"use server";

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

export async function getFilms(): Promise<Film[]> {
  return fetchGhibli<Film[]>("/films");
}

export async function getFilm(id: string): Promise<Film | null> {
  try {
    return await fetchGhibli<Film>(`/films/${id}`);
  } catch {
    return null;
  }
}
