const COUNTRY_DATA = {
  id: "germany",
  name: "Germany",
  flag: "🇩🇪",
  tagline: "Football culture, industrial heritage, and city warmth.",
  coverImage: "assets/images/germany/city_streets.webp",
  cities: [
    {
      id: "dortmund",
      name: "Dortmund",
      countryName: "Germany",
      travelDate: "July 22 - July 24, 2026",
      duration: "3 Days",
      heroImage: "assets/images/germany/city_streets.webp",
      introduction: "Dortmund is a vibrant city in the Ruhr region, known for its industrial roots, green parks, and warm, welcoming local culture.",
      favoriteMemory: "Walking through the rose garden of Westfalenpark with views of the Florianturm in the distance.",
      experiences: [
        "Exploring central Dortmund pedestrian zones and local shops",
        "Relaxing in the expansive green space of Westfalenpark",
        "Enjoying German street food and coffee at local squares"
      ],
      lessons: "Cities with industrial histories often have the most authentic and warm community character. There is an unpretentious honesty to Dortmund.",
      chapters: [
        {
          id: "dortmund-explore",
          title: "Exploring Dortmund",
          subtitle: "City walks, culture & local vibe",
          date: "Day 13 - July 22",
          gallery: [
            { url: "assets/images/germany/city_streets.webp", caption: "The lively streets and squares of central Dortmund" },
            { url: "assets/images/germany/city_streets.webp", caption: "Local cafes and the city atmosphere" }
          ],
          journal: "Dortmund surprised me. Most people associate it with football and industry, but walking through the city reveals a warm, unpretentious character that is very hard not to like. The city center is lively, with pedestrian zones packed with local shops, street food stalls, and people just going about their day. The famous Westfalenpark offered a quiet escape — a large green park with a beautiful rose garden and views across the city. There is an honesty to Dortmund that feels refreshing after visiting the more heavily touristed European capitals. It was a wonderful final stop."
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.COUNTRY_DATA = COUNTRY_DATA;
}
