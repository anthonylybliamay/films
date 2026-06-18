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
      "À la fin de la Seconde Guerre mondiale, un garçon et sa sœur, orphelins après le bombardement de Tokyo luttent pour survivre dans la campagne japonaise, affrontant la faim, la maladie et l'indifférence.",
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
      "Nous sommes en 1982 et Taeko a 27 ans, elle est célibataire et a vécu toute sa vie à Tokyo. Elle décide de rendre visite à sa famille à la campagne, et alors que le train voyage dans la nuit, des souvenirs de sa jeunesse remontent à la surface : les premiers frémissements immatures de la romance, le début de la puberté et les frustrations des mathématiques et des garçons. À la gare, elle rencontre le jeune agriculteur Toshio, et les rencontres avec lui commencent à la reconnecter à des désirs oubliés. Dans des alternances lyriques entre le présent et le passé, Taeko contemple l'arc de sa vie et se demande si elle a été fidèle aux rêves de son enfance.",
  },
  "Porco Rosso": {
    title: "Porco Rosso",
    description:
      "Porco Rosso, connu au Japon sous le nom de Crimson Pig (Kurenai no Buta), est le sixième long métrage d'animation de Hayao Miyazaki, sorti en 1992. On y découvre un as de l'aviation italien de la Première Guerre mondiale, devenu chasseur de primes indépendant, traquant les « pirates de l'air » en mer Adriatique. Victime d'une malédiction, sa tête a pris celle d'un cochon. Autrefois appelé Marco Pagot, il est désormais connu dans le monde entier sous le nom de « Porco Rosso », qui signifie « Cochon Rouge » en italien.",
  },
  "Pom Poko": {
    title: "Pom Poko",
    description:
      "À mesure que le développement des villes humaines empiète sur l'habitat des forêts et des prairies de la population de ratons laveurs, les ratons laveurs se retrouvent confrontés à une possibilité très réelle d'extinction. En réponse, les tanukis se lancent dans une lutte désespérée pour arrêter la construction et préserver leur maison.",
  },
  "Whisper of the Heart": {
    title: "Si tu tends l'oreille",
    description:
      "Shizuku mène une vie simple, rythmée par sa passion pour les histoires et l'écriture. Un jour, elle remarque que tous les livres de la bibliothèque ont été empruntés par la même personne : Seiji Amasawa. Intriguée, elle rencontre un garçon de son âge qu'elle trouve exaspérant, mais découvre avec stupeur qu'il est son « Prince des Livres ». En apprenant à le connaître, elle comprend qu'il lisait tous ces livres uniquement pour se rapprocher d'elle. Seiji rêve de devenir luthier en Italie, et ce sont ses aspirations qui font prendre conscience à Shizuku de l'absence de repères dans sa vie. Sachant que son talent réside dans l'écriture, elle le met à l'épreuve en écrivant une histoire sur Baron, une statuette de chat ayant appartenu au grand-père de Seiji.",
  },
  "Princess Mononoke": {
    title: "Princesse Mononoké",
    description:
      "Ashitaka, prince de la tribu aïnoue en voie de disparition, est maudit par un dieu sanglier démoniaque et doit entreprendre un voyage vers l'ouest pour trouver un remède. Il se retrouve au cœur d'un conflit entre San, protectrice de la forêt, et Lady Eboshi, qui industrialise la région ; Ashitaka doit trouver un moyen de rétablir l'équilibre dans ce conflit.",
  },
  "My Neighbors the Yamadas": {
    title: "Mes voisins les Yamada",
    description:
      "Portrait en épisodes d'une famille japonaise ordinaire, mêlant humour et émotions, qui montre comment les Yamada gèrent les petits conflits et les joies du quotidien.",
  },
  "Spirited Away": {
    title: "Le Voyage de Chihiro",
    description:
      "Le Voyage de Chihiro est un film d'animation japonais oscarisé qui raconte l'histoire d'une fillette de dix ans qui s'éloigne de ses parents et se retrouve dans un monde peuplé d'animaux étranges et monstrueux. Ses parents ont été transformés en cochons, ainsi que d'autres personnes, dans un bain public rempli de ces créatures. Reverra-t-elle un jour le monde tel qu'il était ?",
  },
  "The Cat Returns": {
    title: "Le Royaume des chats",
    description:
      "Haru, une écolière lassée de sa routine, sauve la vie d'un chat hors du commun et son monde bascule soudainement. Le Roi des Chats la récompense de sa bonne action en la comblant de présents, dont une demande en mariage pour le moins surprenante à son fils ! Haru se lance alors dans un voyage inattendu au Royaume des Chats, où s'ouvre à elle un monde complètement différent.",
  },
  "Howl's Moving Castle": {
    title: "Le Château ambulant",
    description:
      "Sophie est transformée en vieille femme par une sorcière et trouve refuge auprès du magicien Howl et de son château ambulant : c'est le début d'une quête pour briser la malédiction et affronter des forces mystérieuses.",
  },
  "Tales from Earthsea": {
    title: "Les Contes de Terremer",
    description:
      "Un phénomène étrange s'est abattu sur le royaume. Le chaos s'installe. Les gens se comportent bizarrement… Plus étrange encore, ils commencent à apercevoir des dragons, créatures qui ne devraient pas se trouver dans le monde des humains. Face à ces événements étranges, Ged, un magicien errant, enquête sur leur origine. Au cours de son périple, il rencontre le prince Arren, un jeune adolescent confronté à ses propres peurs et à des forces obscures.",
  },
  "Ponyo": {
    title: "Ponyo sur la falaise",
    description:
      "Sosuke, un garçon de cinq ans, découvre une poisson rouge nommée Ponyo qui se révèle être la fille d'un sorcier et d'une déesse de la mer.Ponyo utilise la magie de son père pour se transformer en jeune fille et tombe rapidement amoureuse de Sosuke. Cependant, l'usage d'une telle sorcellerie provoque un dangereux déséquilibre dans le monde. Alors que la lune se rapproche inexorablement de la Terre et que le père de Ponyo déchaîne les vagues de l'océan pour retrouver sa fille, les deux enfants se lancent dans l'aventure de leur vie pour sauver le monde et réaliser le rêve de Ponyo : devenir humaine.",
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
