const TRAVEL_DATA = {
  title: "Wander Pages",
  tagline: "Stories collected along the way.",
  countries: [
    {
      id: "switzerland",
      name: "Switzerland",
      flag: "🇨🇭",
      tagline: "Alpine lakes & global peace monuments.",
      coverImage: "assets/images/lake_geneva.webp",
      cities: [
        {
          id: "geneva",
          name: "Geneva",
          countryName: "Switzerland",
          travelDate: "July 10 - July 16, 2026",
          duration: "7 Days",
          heroImage: "assets/images/lake_geneva.webp",
          introduction: "Geneva is a city of peace and stunning alpine backdrops. Home to major international organizations and the majestic Lake Geneva, it offers a unique blend of global cooperation, Swiss precision, and lakeside beauty.",
          favoriteMemory: "Watching the massive Jet d'Eau shoot water 140 meters high as the sunset cast a fleeting rainbow across the harbor.",
          experiences: [
            "Palais des Nations lined with world flags",
            "The monumental 12-meter high Broken Chair",
            "Walking cobblestone alleyways of Vieille Ville (Old Town)",
            "Strolling along the lively harbor and taking in mountain views"
          ],
          lessons: "Even in a world of high-level diplomacy and global politics, local community, quiet parks, and beautiful nature are what truly define a place.",
          chapters: [
            {
              id: "un-broken-chair",
              title: "UN & The Broken Chair",
              subtitle: "Palais des Nations & Symbol of Peace",
              date: "Day 1 - July 10",
              gallery: [
                { url: "assets/images/un_building.webp", caption: "The imposing Palais des Nations lined with world flags" },
                { url: "assets/images/un_broken_chair.webp", caption: "The 12-meter high Broken Chair standing tall in Place des Nations" }
              ],
              journal: "Standing in front of the Palais des Nations was a surreal experience. The long avenue lined with colorful flags of all member nations speaks to the hope of international cooperation. Directly opposite the gates stands the Broken Chair—a monumental sculpture by Daniel Berset. With its shattered leg, it stands as a silent, powerful protest against landmines and cluster bombs. Seeing people from all over the world gather under its shadow makes you realize the sheer scale of global history concentrated in this square."
            },
            {
              id: "jet-deau",
              title: "Jet d'Eau",
              subtitle: "The Geneva Fountain",
              date: "Day 3 - July 12",
              gallery: [
                { url: "assets/images/jet_deau_close.webp", caption: "Up close with the massive Jet d'Eau rising over the lake" },
                { url: "assets/images/lake_geneva.webp", caption: "Sunset colors casting over Lake Geneva and the harbor" }
              ],
              journal: "You can see the Jet d'Eau from almost anywhere along the lakefront, but standing right next to the pier is something else entirely. The fountain shoots 500 liters of water per second into the sky at speeds of 200 km/h. When the wind shifts, a cool, refreshing mist covers the walkway. As the sun set, the light caught the water column, creating a fleeting rainbow that arched over the harbor. It is the defining symbol of Geneva's energy—constant, powerful, and majestic."
            },
            {
              id: "city-vibe",
              title: "Exploring the City Vibe",
              subtitle: "Old Town, Lakesides, & Hidden Gems",
              date: "Day 5 - July 14",
              gallery: [
                { url: "assets/images/old_town.webp", caption: "Quaint historic architecture in Geneva's Old Town" },
                { url: "assets/images/city_vibe.webp", caption: "Geneva's lively streets lined with Swiss watch boutiques and cafes" }
              ],
              journal: "Beyond the global organizations and the lakefront, Geneva has a deeply historic heart. The Old Town, or Vieille Ville, is a maze of cobblestone streets climbing up towards St. Pierre Cathedral. I spent hours simply getting lost in the alleyways, stopping at a small cafe for a warm espresso, and watching locals buy fresh pastries. The city is clean, efficient, yet relaxed. In the evenings, the lakeside promenades fill up with street performers, joggers, and travelers taking in the cool breeze from the Alps. There's a distinct blend of Swiss precision and French joie de vivre here."
            }
          ]
        }
      ]
    },
    {
      id: "france",
      name: "France",
      flag: "🇫🇷",
      tagline: "From soaring alpine glaciers to historical landmarks.",
      coverImage: "assets/images/france_hero.webp",
      cities: [
        {
          id: "paris",
          name: "Paris",
          countryName: "France",
          travelDate: "July 17 - July 19, 2026",
          duration: "3 Days",
          heroImage: "assets/images/paris_eiffel.webp",
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
                { url: "assets/images/paris_eiffel.webp", caption: "The Eiffel Tower standing tall over the Champ de Mars in the afternoon" },
                { url: "assets/images/paris_louvre.webp", caption: "The glass pyramid of the Louvre glowing beautifully at dusk" }
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
          heroImage: "assets/images/france_hero.webp",
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
                { url: "assets/images/france_hero.webp", caption: "The steep cable car ascending towards Aiguille du Midi" },
                { url: "assets/images/city_streets.webp", caption: "Panoramic views of the Mont Blanc peaks covered in pristine snow" }
              ],
              journal: "Taking the cable car from the valley floor of Chamonix to the top of Aiguille du Midi (3,842 meters) was breathtaking. Stepping out onto the viewing platforms, the air was thin, cold, and crisp. The dramatic jagged spires of the Alps stood tall under the brilliant sun, with massive glaciers spilling down between them. Looking at the majestic peaks of the Mont Blanc massif, it felt like being on top of the world. Exploring Chamonix afterward was delightful, filled with the energy of mountaineers and local chalet cafes."
            }
          ]
        }
      ]
    },
    {
      id: "germany",
      name: "Germany",
      flag: "🇩🇪",
      tagline: "Football culture, industrial heritage, and city warmth.",
      coverImage: "assets/images/city_streets.webp",
      cities: [
        {
          id: "dortmund",
          name: "Dortmund",
          countryName: "Germany",
          travelDate: "July 22 - July 24, 2026",
          duration: "3 Days",
          heroImage: "assets/images/city_streets.webp",
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
                { url: "assets/images/city_streets.webp", caption: "The lively streets and squares of central Dortmund" },
                { url: "assets/images/city_streets.webp", caption: "Local cafes and the city atmosphere" }
              ],
              journal: "Dortmund surprised me. Most people associate it with football and industry, but walking through the city reveals a warm, unpretentious character that is very hard not to like. The city center is lively, with pedestrian zones packed with local shops, street food stalls, and people just going about their day. The famous Westfalenpark offered a quiet escape — a large green park with a beautiful rose garden and views across the city. There is an honesty to Dortmund that feels refreshing after visiting the more heavily touristed European capitals. It was a wonderful final stop."
            }
          ]
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.TRAVEL_DATA = TRAVEL_DATA;
}
