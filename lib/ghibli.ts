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
      const params = new URLSearchParams({
        q: text,
        langpair: "en|fr",
      });
      
      const response = await fetch(`${TRANSLATION_API}?${params}`, {
        next: { revalidate: 604800 },
      });
      
      if (!response.ok) return text;
      
      const data = await response.json() as { responseData?: { translatedText?: string } };
      const translated = data.responseData?.translatedText || text;
      
      translationCache[text] = translated;
      return translated;
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
    
    // Traduire chaque chunk
    const translatedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        const params = new URLSearchParams({
          q: chunk,
          langpair: "en|fr",
        });
        
        const response = await fetch(`${TRANSLATION_API}?${params}`, {
          next: { revalidate: 604800 },
        });
        
        if (!response.ok) return chunk;
        
        const data = await response.json() as { responseData?: { translatedText?: string } };
        return data.responseData?.translatedText || chunk;
      })
    );
    
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
  
  // Traduire chaque film
  const translatedFilms = await Promise.all(
    films.map(async (film) => ({
      ...film,
      title: await translateText(film.title),
      description: await translateText(film.description),
    }))
  );
  
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
