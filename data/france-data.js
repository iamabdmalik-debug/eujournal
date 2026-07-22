const COUNTRY_DATA = {
  id: "france",
  name: "France",
  flag: "🇫🇷",
  tagline: "From soaring alpine glaciers to historical landmarks.",
  coverImage: "assets/images/france/hero.jpeg",
  cities: [
    {
      id: "paris",
      name: "Paris",
      countryName: "France",
      travelDate: "July 17 - July 19, 2026",
      duration: "3 Days",
      heroImage: "assets/images/france/paris_eiffel.webp",
      introduction: "Paris is a city of pure history, art, and grand architecture. Walking along the Seine and exploring its monumental landmarks offers an unforgettable cultural experience.",
      favoriteMemory: "Sitting by the Louvre pyramids at dusk as the glass structure glowed beautifully against the night sky.",
      experiences: [
        "Watching the Eiffel Tower sparkle on the hour",
        "Visiting the Louvre museum and its glass pyramid at dusk",
        "Sipping espresso with fresh croissants at a traditional corner cafe"
      ],
      lessons: "Art and history are alive here. Taking the time to slowly walk through historic avenues connects you to centuries of human creativity.",
      chapters: [
        {
          id: "paris-landmarks",
          title: "Paris: Eiffel & Louvre",
          subtitle: "Iconic monuments and cultural walks",
          date: "Day 10 - July 19",
          gallery: [
            { url: "assets/images/france/paris_eiffel.webp", caption: "The Eiffel Tower standing tall over the Champ de Mars in the afternoon" },
            { url: "assets/images/france/paris_louvre.webp", caption: "The glass pyramid of the Louvre glowing beautifully at dusk" }
          ],
          journal: "Paris is a city of pure history and grandeur. Seeing the Eiffel Tower in person is a sensation that photos cannot capture—especially as the sun begins to set and the tower starts to glitter with thousands of lights. Walking along the Seine led us to the Louvre Palace, where the historic French architecture blends seamlessly with the modern glass pyramids. Sitting at a traditional cafe on the corner, sipping on espresso and enjoying a fresh croissant, was the perfect way to soak in the romantic and bustling atmosphere of the French capital."
        }
      ]
    },
    {
      id: "chamonix",
      name: "Chamonix",
      countryName: "France",
      travelDate: "July 20 - July 21, 2026",
      duration: "2 Days",
      heroImage: "assets/images/france/hero.jpeg",
      introduction: "Nestled at the base of the Mont Blanc massif, Chamonix is a high-altitude wonderland of soaring peaks, crisp air, and dramatic alpine views.",
      favoriteMemory: "Taking the vertical cable car up to the peak of Aiguille du Midi and standing at 3,842 meters.",
      experiences: [
        "Riding the cable car to Aiguille du Midi",
        "Enjoying panoramic views of the Mont Blanc massif covered in pristine snow",
        "Exploring the mountain town atmosphere and local chalet cafes"
      ],
      lessons: "Standing high up in the mountains teaches us how small we are in comparison to the ancient and powerful forces of nature.",
      chapters: [
        {
          id: "chamonix-midi",
          title: "Chamonix & Aiguille du Midi",
          subtitle: "Scaling the peaks of the Mont Blanc massif",
          date: "Day 8 - July 17",
          gallery: [
            { url: "assets/images/france/hero.jpeg", caption: "The steep cable car ascending towards Aiguille du Midi" },
            { url: "assets/images/france/city_streets.webp", caption: "Panoramic views of the Mont Blanc peaks covered in pristine snow" }
          ],
          journal: "Taking the cable car from the valley floor of Chamonix to the top of Aiguille du Midi (3,842 meters) was breathtaking. Stepping out onto the viewing platforms, the air was thin, cold, and crisp. The dramatic jagged spires of the Alps stood tall under the brilliant sun, with massive glaciers spilling down between them. Looking at the majestic peaks of the Mont Blanc massif, it felt like being on top of the world. Exploring Chamonix afterward was delightful, filled with the energy of mountaineers and local chalet cafes."
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.COUNTRY_DATA = COUNTRY_DATA;
}
