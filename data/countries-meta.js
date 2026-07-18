const COUNTRIES_META = [
  {
    id: "switzerland",
    name: "Switzerland",
    flag: "🇨🇭",
    tagline: "Alpine lakes & global peace monuments.",
    coverImage: "assets/images/switzerland/lake_geneva.webp",
    path: "/countries/switzerland/"
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    tagline: "From soaring alpine glaciers to historical landmarks.",
    coverImage: "assets/images/france/france_hero.webp",
    path: "/countries/france/"
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    tagline: "Football culture, industrial heritage, and city warmth.",
    coverImage: "assets/images/germany/city_streets.webp",
    path: "/countries/germany/"
  }
];

if (typeof window !== 'undefined') {
  window.COUNTRIES_META = COUNTRIES_META;
}
