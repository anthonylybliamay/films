export type FilmTranslation = {
  title?: string;
  description?: string;
  director?: string;
  producer?: string;
};

// Mapping by English title (API returns English titles). Traductions françaises des titres et descriptions.
export const filmTranslations: Record<string, FilmTranslation> = {
  "Castle in the Sky": {
    title: "Le Château dans le ciel",
    description:
      "Sheeta, une orpheline, hérite d'un cristal mystérieux qui la relie à la cité flottante légendaire de Laputa. Avec l'aide du débrouillard Pazu et d'une bande de pirates du ciel, elle tente de retrouver les ruines de cette civilisation tout en échappant à Muska, qui veut utiliser la science de Laputa pour régner sur le monde.",
  },
  "Grave of the Fireflies": {
    title: "Le Tombeau des lucioles",
    description:
      "À la fin de la Seconde Guerre mondiale, un garçon et sa sœur, orphelins après le bombardement de Tokyo, luttent pour survivre dans la campagne japonaise, affrontant la faim, la maladie et l'indifférence.",
  },
  "My Neighbor Totoro": {
    title: "Mon Voisin Totoro",
    description:
      "Deux sœurs s'installent à la campagne pour être proches de leur mère hospitalisée et découvrent que les arbres sont habités par des esprits, dont le bienveillant Totoro. Lorsque la plus jeune se perd, la plus âgée demande l'aide des esprits pour la retrouver.",
  },
  "Kiki's Delivery Service": {
    title: "Kiki la petite sorcière",
    description:
      "Kiki, une jeune sorcière en année d'émancipation, a du mal à s'adapter à une nouvelle communauté tout en gagnant sa vie en livrant des colis par les airs.",
  },
  "Only Yesterday": {
    title: "Souvenirs goutte à goutte",
    description:
      "En 1982, Taeko, 27 ans et célibataire, retourne chez sa famille à la campagne et, au fil du voyage, se remémore son enfance et les rêves d'autrefois, tout en se confrontant à son présent.",
  },
  "Porco Rosso": {
    title: "Porco Rosso",
    description:
      "Ancien as de l'aviation, devenu chasseur de primes dans l'Adriatique, Porco Rosso vit maudit avec une tête de cochon. Le film suit ses aventures entre piraterie aérienne et nostalgie d'un monde d'honneur.",
  },
  "Pom Poko": {
    title: "Pom Poko",
    description:
      "Alors que l'urbanisation grignote leur habitat, des tanukis (raccoons) mènent une lutte désespérée pour arrêter les travaux et préserver leur foyer, usant de métamorphoses et de ruses.",
  },
  "Whisper of the Heart": {
    title: "Si tu tends l'oreille",
    description:
      "Shizuku, amoureuse des livres et de l'écriture, découvre qu'un mystérieux lecteur a emprunté les mêmes ouvrages qu'elle. En rencontrant Seiji, elle est poussée à trouver sa voie entre écriture et rêves d'avenir.",
  },
  "Princess Mononoke": {
    title: "Princesse Mononoké",
    description:
      "Ashitaka, prince d'un clan en déclin, est maudit par un dieu sanglier et part à l'ouest pour trouver un remède. Il se retrouve au cœur d'un conflit entre San, protectrice de la forêt, et Lady Eboshi, qui industrialise la région ; Ashitaka cherche un équilibre.",
  },
  "My Neighbors the Yamadas": {
    title: "Mes voisins les Yamada",
    description:
      "Portrait en épisodes d'une famille japonaise ordinaire, mêlant humour et émotions, qui montre comment les Yamada gèrent les petits conflits et les joies du quotidien.",
  },
  "Spirited Away": {
    title: "Le Voyage de Chihiro",
    description:
      "Chihiro, une fillette de dix ans, se perd avec ses parents dans un monde étrange gouverné par des créatures et des esprits. Ses parents sont transformés en cochons et elle doit naviguer dans ce monde pour les sauver et retrouver sa vie.",
  },
  "The Cat Returns": {
    title: "Le Royaume des chats",
    description:
      "Haru sauve un chat étrange et se retrouve entraînée dans le royaume des chats, où sa bonne action lui attire des cadeaux… et une demande de mariage surprenante, la conduisant dans un voyage inattendu.",
  },
  "Howl's Moving Castle": {
    title: "Le Château ambulant",
    description:
      "Sophie est transformée en vieille femme par une sorcière et trouve refuge auprès du magicien Howl et de son château ambulant : une quête pour briser la malédiction et affronter des forces mystérieuses.",
  },
  "Tales from Earthsea": {
    title: "Les Contes de Terremer",
    description:
      "Le royaume est troublé par des phénomènes étranges et l'apparition de dragons. Ged, un magicien errant, enquête et rencontre le prince Arren, confronté à ses propres peurs et à des forces obscures.",
  },
  "Ponyo": {
    title: "Ponyo sur la falaise",
    description:
      "Sosuke, un garçon de cinq ans, découvre une poisson rouge nommée Ponyo qui se révèle être la fille d'un sorcier et d'une déesse de la mer. Ponyo souhaite devenir humaine, provoquant des déséquilibres que les deux enfants devront réparer.",
  },
  "Arrietty": {
    title: "Arrietty, le petit monde des chapardeurs",
    description:
      "Arrietty, une adolescente minuscule de quatorze ans, vit en secret avec sa famille, se construisant un foyer à partir d'objets « empruntés » aux habitants humains de la maison. Cependant, la vie des Clock bascule lorsqu'un jeune garçon découvre Arrietty.",
  },
  "From Up on Poppy Hill": {
    title: "La Colline aux coquelicots",
    description:
      "En 1963 à Yokohama, Umi, une jeune fille de seize ans, élève un drapeau chaque matin en mémoire des marins.  Shun, un garçon de dix-sept ans, aperçoit toujours ce pavillon depuis la mer lorsqu'il se rend à l'école en remorqueur. Peu à peu, un lien se tisse entre eux, mais une épreuve soudaine les confronte. Malgré tout, ils persévèrent, sans fuir les difficultés de la vie.",
  },
  "The Wind Rises": {
    title: "Le Vent se lève",
    description:
      "L'ingénieur Jiro Horikoshi nourrit une passion pour l'aviation et conçoit des avions remarquables, au prix de doutes personnels et des conséquences historiques liées à son œuvre.",
  },
  "The Tale of the Princess Kaguya": {
    title: "Le Conte de la princesse Kaguya",
    description:
      "Un coupeur de bambou découvre une petite fille lumineuse dans une tige de bambou et l'élève comme sa fille. La jeune Princesse Kaguya grandit et attire l'attention du monde, révélant sa nature divine.",
  },
  "When Marnie Was There": {
    title: "Souvenirs de Marnie",
    description:
      "Anna, placée chez des parents d'accueil en bord de mer, découvre un manoir abandonné et y rencontre Marnie, une mystérieuse amie d'été qui l'aide à comprendre ses origines.",
  },
  "The Red Turtle": {
    title: "La Tortue rouge",
    description:
      "Un homme, emporté par une tempête, se réveille sur une plage. Il découvre qu'il se trouve sur une île déserte regorgeant d'eau douce, de fruits et d'une dense forêt de bambous. Il construit un radeau de bambou et tente de prendre la mer, mais celui-ci est détruit par un monstre invisible, le forçant à retourner sur l'île. Il se retrouve ensuite face à une tortue rouge géante qui le fixe du regard et le contraint à retourner sur l'île.",
  },
  "Earwig and the Witch": {
    title: "Aya et la sorcière",
    description:
      "Une orpheline nommée Aya est adoptée par une sorcière et découvre une maison étrange remplie de mystères et de magie.",
  },
};

export function translateFilmByTitle(originalTitle: string, field: FilmTranslation): FilmTranslation {
  const found = filmTranslations[originalTitle];
  if (!found) return field;
  return {
    title: found.title ?? field.title,
    description: found.description ?? field.description,
    director: found.director ?? field.director,
    producer: found.producer ?? field.producer,
  };
}
