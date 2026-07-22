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
      heroImage: "assets/images/france/paris_hero.jpeg",
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
          id: "eiffel-tower",
          title: "Eiffel Tower",
          subtitle: "The iconic symbol of Paris",
          date: "Day 10 - July 19",
          gallery: [
            {
              url: "assets/images/france/paris_hero.jpeg",
              caption: "The Eiffel Tower standing tall over the Champ de Mars in the afternoon",
              title: "Eiffel Tower Afternoon",
              description: "The Eiffel Tower stands tall over the green lawns of Champ de Mars in the afternoon. Walking along the Seine, seeing the tower in person is a sensation that photographs cannot fully capture.",
              location: "Champ de Mars • July 19"
            }
          ],
          journal: "Seeing the Eiffel Tower in person is a sensation that photos cannot capture—especially as the sun begins to set and the tower starts to glitter with thousands of lights. Walking through the Champ de Mars to get a closer view was a highlight of my day."
        },
        {
          id: "louvre",
          title: "Louvre",
          subtitle: "A blend of history and modern art",
          date: "Day 10 - July 19",
          gallery: [
            {
              url: "assets/images/france/paris_louvre.webp",
              caption: "The glass pyramid of the Louvre glowing beautifully at dusk",
              title: "Louvre Glass Pyramid",
              description: "The modern glass pyramid of the Louvre Palace glows beautifully at dusk. It stands in striking, elegant contrast to the surrounding historic French palace architecture.",
              location: "Louvre Palace • July 19"
            }
          ],
          journal: "Exploring the area around the Louvre Palace, where the historic French architecture blends seamlessly with the modern glass pyramids. Sitting by the Louvre pyramids at dusk as the glass structure glowed beautifully against the night sky was an unforgettable experience."
        },
        {
          id: "arc-de-triomphe-notre-dame",
          title: "Arc de Triomphe & Notre-Dame",
          subtitle: "Stunning historic monuments of Paris",
          date: "Day 11 - July 20",
          gallery: [],
          journal: "A historic walk to see the grand Arc de Triomphe standing proudly at the end of the Champs-Élysées, followed by a visit to the historic Notre-Dame cathedral along the Seine. (Journal entry placeholder to be expanded later.)"
        },
        {
          id: "city-vibes",
          title: "City Vibes",
          subtitle: "Sipping espresso and exploring alleyways",
          date: "Day 11 - July 20",
          gallery: [
            {
              url: "assets/images/france/hero2.jpeg",
              caption: "A view of the lively streets and cafes in central Paris",
              title: "Parisian Cafe Vibe",
              description: "Sipping espresso and enjoying fresh croissants at a traditional corner cafe. The lively streets and beautiful architecture capture the true romantic spirit of Paris.",
              location: "Paris Center • July 20"
            }
          ],
          journal: "Sipping on espresso and enjoying a fresh croissant at a traditional corner cafe was the perfect way to soak in the romantic and bustling atmosphere of the French capital. Walking through the local neighborhoods and admiring the architecture captures the true spirit of Paris."
        },
        {
          id: "river-seine",
          title: "River Seine",
          subtitle: "A scenic walk along the historic river",
          date: "Day 12 - July 21",
          gallery: [
            {
              url: "assets/images/france/paris_hero.jpeg",
              caption: "A scenic walking path along the River Seine overlooking the bridges",
              title: "Lakeside Seine Walk",
              description: "Walking along the banks of the Seine, watching the boats pass by under the historic bridges of Paris. The river provides a pathway through the heart of the city's greatest wonders.",
              location: "River Seine • July 21"
            }
          ],
          journal: "Walking along the banks of the Seine, watching the boats pass by under the historic bridges of Paris. The river provides a peaceful pathway through the heart of the city's greatest wonders."
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
