const COUNTRY_DATA = {
  id: "switzerland",
  name: "Switzerland",
  flag: "🇨🇭",
  tagline: "Alpine lakes & global peace monuments.",
  coverImage: "assets/images/switzerland/lake_geneva.webp",
  cities: [
    {
      id: "geneva",
      name: "Geneva",
      countryName: "Switzerland",
      travelDate: "July 10 - July 16, 2026",
      duration: "7 Days",
      heroImage: "assets/images/switzerland/lake_geneva.webp",
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
            { url: "assets/images/switzerland/un_building.webp", caption: "The imposing Palais des Nations lined with world flags" },
            { url: "assets/images/switzerland/un_broken_chair.webp", caption: "The 12-meter high Broken Chair standing tall in Place des Nations" }
          ],
          journal: "Standing in front of the Palais des Nations was a surreal experience. The long avenue lined with colorful flags of all member nations speaks to the hope of international cooperation. Directly opposite the gates stands the Broken Chair—a monumental sculpture by Daniel Berset. With its shattered leg, it stands as a silent, powerful protest against landmines and cluster bombs. Seeing people from all over the world gather under its shadow makes you realize the sheer scale of global history concentrated in this square."
        },
        {
          id: "jet-deau",
          title: "Jet d'Eau",
          subtitle: "The Geneva Fountain",
          date: "Day 3 - July 12",
          gallery: [
            { url: "assets/images/switzerland/jet_deau_close.webp", caption: "Up close with the massive Jet d'Eau rising over the lake" },
            { url: "assets/images/switzerland/lake_geneva.webp", caption: "Sunset colors casting over Lake Geneva and the harbor" }
          ],
          journal: "You can see the Jet d'Eau from almost anywhere along the lakefront, but standing right next to the pier is something else entirely. The fountain shoots 500 liters of water per second into the sky at speeds of 200 km/h. When the wind shifts, a cool, refreshing mist covers the walkway. As the sun set, the light caught the water column, creating a fleeting rainbow that arched over the harbor. It is the defining symbol of Geneva's energy—constant, powerful, and majestic."
        },
        {
          id: "city-vibe",
          title: "Exploring the City Vibe",
          subtitle: "Old Town, Lakesides, & Hidden Gems",
          date: "Day 5 - July 14",
          gallery: [
            { url: "assets/images/switzerland/old_town.webp", caption: "Quaint historic architecture in Geneva's Old Town" },
            { url: "assets/images/switzerland/city_vibe.webp", caption: "Geneva's lively streets lined with Swiss watch boutiques and cafes" }
          ],
          journal: "Beyond the global organizations and the lakefront, Geneva has a deeply historic heart. The Old Town, or Vieille Ville, is a maze of cobblestone streets climbing up towards St. Pierre Cathedral. I spent hours simply getting lost in the alleyways, stopping at a small cafe for a warm espresso, and watching locals buy fresh pastries. The city is clean, efficient, yet relaxed. In the evenings, the lakeside promenades fill up with street performers, joggers, and travelers taking in the cool breeze from the Alps. There's a distinct blend of Swiss precision and French joie de vivre here."
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.COUNTRY_DATA = COUNTRY_DATA;
}
