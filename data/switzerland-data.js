const COUNTRY_DATA = {
  id: "switzerland",
  name: "Switzerland",
  flag: "🇨🇭",
  tagline: "Alpine lakes & global peace monuments.",
  coverImage: "assets/images/switzerland/lake_geneva_steamship.jpg",
  cities: [
    {
      id: "geneva",
      name: "Geneva",
      countryName: "Switzerland",
      travelDate: "July 10 - July 16, 2026",
      duration: "7 Days",
      heroImage: "assets/images/switzerland/lake_geneva_steamship.jpg",
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
            { 
              url: "assets/images/switzerland/broken_chair_dusk.jpg", 
              caption: "The monumental Broken Chair standing tall under a deep blue twilight sky",
              title: "The Broken Chair",
              description: "Opposite the United Nations gates stands the Broken Chair—a monumental wood sculpture by Daniel Berset with a shattered leg. It stands as a silent, powerful protest against landmines and cluster bombs, reflecting Place des Nations' peacekeeping heritage.",
              location: "Place des Nations • July 10"
            },
            { 
              url: "assets/images/switzerland/un_flag.jpeg", 
              caption: "The United Nations Palais des Nations flags blowing in the breeze",
              title: "UN Palais des Nations",
              description: "Standing in front of the Palais des Nations is a profound experience. The long avenue lined with colorful flags of member nations speaks to the hope of global cooperation, representing Geneva's peacekeeping legacy.",
              location: "Palais des Nations • July 10"
            }
          ],
          journal: "Standing in front of the Palais des Nations was a surreal experience. The long avenue lined with colorful flags of all member nations speaks to the hope of international cooperation. Directly opposite the gates stands the Broken Chair—a monumental sculpture by Daniel Berset. With its shattered leg, it stands as a silent, powerful protest against landmines and cluster bombs. Seeing people from all over the world gather under its shadow makes you realize the sheer scale of global history concentrated in this square."
        },
        {
          id: "jet-deau",
          title: "Jet d'Eau",
          subtitle: "The Geneva Fountain",
          date: "Day 3 - July 12",
          gallery: [
            { 
              url: "assets/images/switzerland/jet_deau_rainbow.jpg", 
              caption: "A spectacular rainbow forming in the mist of the Jet d'Eau fountain",
              title: "Fountain and Rainbow",
              description: "The iconic Jet d'Eau shoots water 140 meters high into the sky over Lake Geneva. When the evening sun catches the water mist, a fleeting rainbow arches beautifully over the harbor, creating a magical lakeside view.",
              location: "Lake Geneva • July 12"
            },
            { 
              url: "assets/images/switzerland/lake_geneva_steamship.jpg", 
              caption: "A classic Swiss paddle steamer cruising past the massive Jet d'Eau column",
              title: "Lakeside Paddle Steamer",
              description: "A classic Swiss paddle steamer cruises past the towering water column of the Jet d'Eau. The historical steamship, flying the Swiss flag, represents Geneva's rich maritime heritage on the lake.",
              location: "Lake Geneva • July 12"
            },
            { 
              url: "assets/images/switzerland/lake_geneva_boat_video.mp4", 
              caption: "Cruising on the crystal-clear water of Lake Geneva",
              title: "Cruising Lake Geneva",
              description: "A peaceful boat ride across the crystal-clear waters of Lake Geneva offers refreshing alpine breezes. The cruise highlights the majestic mountain reflections and scenic shores of Geneva's harbor.",
              location: "Lake Geneva • July 12"
            },
            { 
              url: "assets/images/switzerland/lake_geneva_sunset_jura.jpg", 
              caption: "Wide panoramic view of Lake Geneva at sunset, looking towards the Jura Mountains",
              title: "Sunset over the Jura",
              description: "A wide, panoramic view of Lake Geneva at sunset, with the silhouette of the Jura Mountains in the distance. The golden hues reflecting on the water capture the calm, peaceful alpine atmosphere.",
              location: "Lake Geneva • July 12"
            },
            { 
              url: "assets/images/switzerland/geneva_marina_sunset.jpg", 
              caption: "Sailboats and yachts docked at the marina during a colorful sunset",
              title: "Evening by Lake Geneva",
              description: "Dozens of local sailboats and yachts docked at the Geneva marina silhouetted against a brilliant sunset sky, reflecting the quiet evening lakeside charm.",
              location: "Lake Geneva • July 12"
            },
            { 
              url: "assets/images/switzerland/sweet_spot.jpeg", 
              caption: "Sampling delicious local Italian gelato alongside the Jet d'Eau",
              title: "Sweet spot",
              description: "Sampling some infamous local Italian gelato from a shop right alongside the Jet d'Eau. Enjoying colorful scoops of sweet treats is the perfect lakeside reward after a long day of walking.",
              location: "Lake Geneva • July 12"
            },
            { 
              url: "assets/images/switzerland/jet_deau_night.jpg", 
              caption: "The Jet d'Eau fountain illuminated in white and purple at night",
              title: "Jet d'Eau at Night",
              description: "The Jet d'Eau illuminated in brilliant white against the night sky, throwing a giant column of water that glows alongside the city's harbor lights.",
              location: "Lake Geneva • July 12"
            }
          ],
          journal: "You can see the Jet d'Eau from almost anywhere along the lakefront, but standing right next to the pier is something else entirely. The fountain shoots 500 liters of water per second into the sky at speeds of 200 km/h. When the wind shifts, a cool, refreshing mist covers the walkway. As the sun set, the light caught the water column, creating a fleeting rainbow that arched over the harbor. It is the defining symbol of Geneva's energy—constant, powerful, and majestic."
        },
        {
          id: "city-vibe",
          title: "Exploring the City Vibe",
          subtitle: "Old Town, Lakesides, & Hidden Gems",
          date: "Day 5 - July 14",
          gallery: [
            { 
              url: "assets/images/switzerland/geneva_cathedral_aerial.jpg", 
              caption: "Aerial view looking over the St. Pierre Cathedral tower and Old Town roofs",
              title: "St. Pierre Cathedral View",
              description: "An aerial view overlooking the rooftops of Geneva's historic Old Town, centered around the green-roofed spire of St. Pierre Cathedral. The historic district climbs uphill, offering panoramic views of the city below.",
              location: "Vieille Ville • July 14"
            },
            { 
              url: "assets/images/switzerland/old_town_apartment_street.jpg", 
              caption: "A quiet, historic cobblestone street lined with traditional window-shuttered apartments",
              title: "Alleyways of Old Town",
              description: "A quiet, narrow cobblestone alleyway lined with traditional window-shuttered apartments. Walking these historic paths transports you through centuries of Geneva's residential heritage.",
              location: "Vieille Ville • July 14"
            },
            { 
              url: "assets/images/switzerland/old_town_lantern.jpg", 
              caption: "A warm glowing street lantern casting light on historic stone walls in the Old Town at dusk",
              title: "Vieille Ville Lanterns",
              description: "A warm street lantern glows on a stone building wall in the Old Town at dusk. The soft golden light highlights the quiet, atmospheric charm of Geneva's historic heart.",
              location: "Vieille Ville • July 14"
            },
            { 
              url: "assets/images/switzerland/flower_clock_night.jpg", 
              caption: "The famous Flower Clock (L'horloge fleurie) glowing in the Jardin Anglais at night",
              title: "The Flower Clock",
              description: "Geneva's famous Flower Clock (L'horloge fleurie) illuminated in the Jardin Anglais at night. This beautiful living monument of thousands of seasonal flowers celebrates the city's legendary history of Swiss watchmaking.",
              location: "Jardin Anglais • July 14"
            },
            { 
              url: "assets/images/switzerland/geneva_bike_ride_day.jpg", 
              caption: "Exploring Geneva's wide streets and crosswalks on a rental bike by day",
              title: "Cycling Through Geneva",
              description: "Renting a local bike is the perfect way to explore Geneva's wide streets, clock towers, and tram crossings. Navigating through the city on two wheels lets you experience the local lifestyle first-hand.",
              location: "Geneva Center • July 14"
            },
            { 
              url: "assets/images/switzerland/geneva_street_towers.jpg", 
              caption: "Geneva's traditional street views and towers under a partly cloudy sky",
              title: "Streets of Geneva",
              description: "A view down a street in central Geneva with traditional clock towers and tram tracks overhead. The classic architecture and busy crosswalks represent the daily rhythm of this vibrant Swiss city.",
              location: "Geneva Center • July 14"
            },
            { 
              url: "assets/images/switzerland/mont_blanc_bridge_night.jpg", 
              caption: "Stunning night view of the Mont-Blanc Bridge lights, captured from the top of the Ferris Wheel",
              title: "Geneva After Dark",
              description: "A spectacular night view looking down at the Mont-Blanc Bridge lights, captured from the top of the Geneva Ferris Wheel alongside the lake.",
              location: "Lake Geneva • July 14"
            },
            { 
              url: "assets/images/switzerland/geneva_bike_ride_night.jpg", 
              caption: "Cycling through Geneva streets at night with green lights ahead",
              title: "Night Cycling Route",
              description: "Cycling through the peaceful, lit-up streets of Geneva at night. The green traffic lights guide a quiet ride back along the urban bike lanes.",
              location: "Geneva Center • July 14"
            },
            { 
              url: "assets/images/switzerland/lakefront_bike_ride_sunset.jpg", 
              caption: "Catching a gorgeous sunset during a bike ride along the lakefront promenade",
              title: "Sunset Lakefront Ride",
              description: "Catching the sunset on a bike ride along the Geneva lakefront promenade. Pedaling with views of the orange sky and families relaxing on the grass is a perfect evening highlight.",
              location: "Lake Geneva • July 14"
            },
            { 
              url: "assets/images/switzerland/geneva_airport_sunset.jpg", 
              caption: "Arriving at Geneva GVA station under a soft orange sunset sky",
              title: "GVA Station Sunset",
              description: "Arriving at the Geneva GVA airport station under a soft orange sunset sky, marking the beginning of a fresh Swiss exploration.",
              location: "GVA Station • July 14"
            }
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
