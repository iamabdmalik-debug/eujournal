const COUNTRY_DATA = {
  id: "switzerland",
  name: "Switzerland",
  flag: "🇨🇭",
  tagline: "Alpine lakes & global peace monuments.",
  coverImage: "assets/images/switzerland/lake_geneva_sunset_jura.jpg",
  cities: [
    {
      id: "geneva",
      name: "Geneva",
      countryName: "Switzerland",
      travelDate: "July 10 - July 16, 2026",
      duration: "7 Days",
      heroImage: "assets/images/switzerland/lake_geneva_sunset_jura.jpg",
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
            { url: "assets/images/switzerland/broken_chair_dusk.jpg", caption: "The monumental Broken Chair standing tall under a deep blue twilight sky" },
            { url: "assets/images/switzerland/itu_un_complex_dusk.jpg", caption: "The ITU and United Nations complex office windows glowing at dusk" }
          ],
          journal: "Standing in front of the Palais des Nations was a surreal experience. The long avenue lined with colorful flags of all member nations speaks to the hope of international cooperation. Directly opposite the gates stands the Broken Chair—a monumental sculpture by Daniel Berset. With its shattered leg, it stands as a silent, powerful protest against landmines and cluster bombs. Seeing people from all over the world gather under its shadow makes you realize the sheer scale of global history concentrated in this square."
        },
        {
          id: "jet-deau",
          title: "Jet d'Eau",
          subtitle: "The Geneva Fountain",
          date: "Day 3 - July 12",
          gallery: [
            { url: "assets/images/switzerland/jet_deau_rainbow.jpg", caption: "A spectacular rainbow forming in the mist of the Jet d'Eau fountain" },
            { url: "assets/images/switzerland/lake_geneva_steamship.jpg", caption: "A classic Swiss paddle steamer cruising past the massive Jet d'Eau column" },
            { url: "assets/images/switzerland/lake_geneva_boat_video.mp4", caption: "Cruising on the crystal-clear water of Lake Geneva" },
            { url: "assets/images/switzerland/lake_geneva_sunset_jura.jpg", caption: "Wide panoramic view of Lake Geneva at sunset, looking towards the Jura Mountains" },
            { url: "assets/images/switzerland/geneva_marina_sunset.jpg", caption: "Sailboats and yachts docked at the marina during a colorful sunset" },
            { url: "assets/images/switzerland/lakefront_bike_ride_sunset.jpg", caption: "Sunset ride along the lakeside promenade as locals relax on the grass" },
            { url: "assets/images/switzerland/jet_deau_night.jpg", caption: "The Jet d'Eau fountain illuminated in white and purple at night" }
          ],
          journal: "You can see the Jet d'Eau from almost anywhere along the lakefront, but standing right next to the pier is something else entirely. The fountain shoots 500 liters of water per second into the sky at speeds of 200 km/h. When the wind shifts, a cool, refreshing mist covers the walkway. As the sun set, the light caught the water column, creating a fleeting rainbow that arched over the harbor. It is the defining symbol of Geneva's energy—constant, powerful, and majestic."
        },
        {
          id: "city-vibe",
          title: "Exploring the City Vibe",
          subtitle: "Old Town, Lakesides, & Hidden Gems",
          date: "Day 5 - July 14",
          gallery: [
            { url: "assets/images/switzerland/geneva_cathedral_aerial.jpg", caption: "Aerial view looking over the St. Pierre Cathedral tower and Old Town roofs" },
            { url: "assets/images/switzerland/old_town_apartment_street.jpg", caption: "A quiet, historic cobblestone street lined with traditional window-shuttered apartments" },
            { url: "assets/images/switzerland/old_town_lantern.jpg", caption: "A warm glowing street lantern casting light on historic stone walls in the Old Town at dusk" },
            { url: "assets/images/switzerland/flower_clock_night.jpg", caption: "The famous Flower Clock (L'horloge fleurie) glowing in the Jardin Anglais at night" },
            { url: "assets/images/switzerland/geneva_gelato_shop.jpg", caption: "Sampling delicious and colorful Swiss-Italian gelato trays in a local shop" },
            { url: "assets/images/switzerland/geneva_bike_ride_day.jpg", caption: "Exploring Geneva's wide streets and crosswalks on a rental bike by day" },
            { url: "assets/images/switzerland/geneva_street_towers.jpg", caption: "Geneva's traditional street views and towers under a partly cloudy sky" },
            { url: "assets/images/switzerland/mont_blanc_bridge_night.jpg", caption: "Night view overlooking the traffic lights on Mont-Blanc Bridge" },
            { url: "assets/images/switzerland/geneva_bike_ride_night.jpg", caption: "Cycling through Geneva streets at night with green lights ahead" },
            { url: "assets/images/switzerland/geneva_airport_sunset.jpg", caption: "Arriving at Geneva GVA station under a soft orange sunset sky" }
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
