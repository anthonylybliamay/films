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
const TRANSLATION_API = "https://api.mymemory.translated.net/get";

// Cache pour les traductions pour éviter les appels répétés
const translationCache: Record<string, string> = {};

async function translateText(text: string): Promise<string> {
  if (!text || text.length === 0) return text;
  
  // Vérifier le cache
  if (translationCache[text]) {
    return translationCache[text];
  }

  try {
    // Limiter à 500 caractères pour l'API MyMemory
    const MAX_CHARS = 500;
    
    // Si le texte est court, le traduire directement
    if (text.length <= MAX_CHARS) {
      const controller = new AbortController();
      
      try {
        const params = new URLSearchParams({
          q: text,
          langpair: "en|fr",
        });
        
        const response = await fetch(`${TRANSLATION_API}?${params}`, {
          next: { revalidate: 604800 },
          signal: controller.signal,
        });
        
        
        if (!response.ok) return text;
        
        const data = await response.json() as { responseData?: { translatedText?: string } };
        const translated = data.responseData?.translatedText || text;
        
        translationCache[text] = translated;
        return translated;
      } catch (error) {
        return text;
      }
    }
    
    // Pour les textes longs, diviser en chunks
    const chunks = [];
    let currentChunk = "";
    const sentences = text.split(". ");
    
    for (const sentence of sentences) {
      const testChunk = currentChunk ? currentChunk + ". " + sentence : sentence;
      
      if (testChunk.length <= MAX_CHARS) {
        currentChunk = testChunk;
      } else {
        if (currentChunk) chunks.push(currentChunk + ".");
        currentChunk = sentence;
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    
    // Traduire chaque chunk séquentiellement avec délai pour éviter de surcharger l'API
    const translatedChunks = [];
    for (const chunk of chunks) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      try {
        const params = new URLSearchParams({
          q: chunk,
          langpair: "en|fr",
        });
        
        const response = await fetch(`${TRANSLATION_API}?${params}`, {
          next: { revalidate: 604800 },
          signal: controller.signal,
        });
        
        clearTimeout(timeout);
        
        if (response.ok) {
          const data = await response.json() as { responseData?: { translatedText?: string } };
          translatedChunks.push(data.responseData?.translatedText || chunk);
        } else {
          translatedChunks.push(chunk);
        }
      } catch (error) {
        clearTimeout(timeout);
        translatedChunks.push(chunk);
      }
      
      // Petit délai entre les chunks pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const translated = translatedChunks.join(" ").trim();
    translationCache[text] = translated;
    return translated;
  } catch {
    // En cas d'erreur, retourner le texte original
    return text;
  }
}

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
  const films = await fetchGhibli<Film[]>("/films");
  
  // Traduire chaque film séquentiellement pour éviter de surcharger l'API
  const translatedFilms = [];
  for (const film of films) {
    const translated = {
      ...film,
      title: await translateText(film.title),
      description: await translateText(film.description),
    };
    translatedFilms.push(translated);
    // Petit délai entre les films pour ne pas surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return translatedFilms.sort((a, b) => Number(b.release_date) - Number(a.release_date));
}

export async function getFilm(id: string): Promise<Film | null> {
  try {
    const film = await fetchGhibli<Film>(`/films/${id}`);
    
    // Traduire les champs principaux
    return {
      ...film,
      title: await translateText(film.title),
      description: await translateText(film.description),
      director: await translateText(film.director),
      producer: await translateText(film.producer),
    };
  } catch {
    return null;
  }
}
