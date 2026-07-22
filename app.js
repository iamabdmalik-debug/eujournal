document.addEventListener('DOMContentLoaded', () => {
  // Check if COUNTRY_DATA is loaded (present on country subpages)
  const isCountryPage = (typeof COUNTRY_DATA !== 'undefined');

  // --- DOM Elements ---
  const chapterList = document.getElementById('chapter-list');
  const contentContainer = document.getElementById('content-container');
  const themeToggle = document.getElementById('theme-toggle');
  const mainHeader = document.getElementById('main-header');
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxCaption = document.getElementById('lightbox-caption-text');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next-btn');

  // --- Multi-Country DOM Elements ---
  const countrySelectionView = document.getElementById('country-selection-view');
  const countryGrid = document.getElementById('country-grid');
  const citySelectionView = document.getElementById('city-selector-view');
  const journalSection = document.getElementById('journal-section');
  const backToCountriesBtn = document.getElementById('back-to-countries-btn');
  const headerLogoHome = document.getElementById('header-logo-home');

  // --- Hero Section DOM Elements ---
  const heroSection = document.getElementById('hero-section');
  const heroTitleText = document.getElementById('hero-title-text');
  const heroTaglineText = document.getElementById('hero-tagline-text');
  const heroLeadText = document.getElementById('hero-lead-text');

  // --- Stats Badges DOM Elements ---
  const statsPillGroup = document.getElementById('stats-pill-group');
  const statCountry = document.getElementById('stat-country');
  const statCity = document.getElementById('stat-city');
  const statDays = document.getElementById('stat-days');

  // --- Auth & Profile DOM Elements ---
  const authOverlay = document.getElementById('auth-overlay');
  const tabSignin = document.getElementById('tab-signin');
  const tabSignup = document.getElementById('tab-signup');
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  const authMessage = document.getElementById('auth-message');
  const userControls = document.getElementById('user-controls');
  const userEmailText = document.getElementById('user-email');
  const logoutBtn = document.getElementById('logout-btn');
  const authCloseBtn = document.getElementById('auth-close-btn');
  const loginBtn = document.getElementById('login-btn');

  // --- State Variables ---
  let activeCityId = null;
  let activeChapterId = null;
  let currentGallery = [];
  let currentImageIndex = 0;
  let supabase = null;
  let currentUser = null;
  
  // Transition state lock to prevent overlapping animations
  let isTransitioning = false;

  // Single shared modal Seen persistence logic
  let isLoginSkipped = true; // Default to true (blocks auto-flashing on load/navigate)

  // --- Helper functions for Image Optimization ---
  function getWebpUrl(url) {
    if (!url) return '';
    let processed = url;
    const isNewUpload = processed.includes('lake_geneva_steamship') || 
                        processed.includes('broken_chair_dusk') || 
                        processed.includes('jet_deau_rainbow') || 
                        processed.includes('geneva_street_towers') || 
                        processed.includes('geneva_cathedral_aerial') || 
                        processed.includes('old_town_lantern') || 
                        processed.includes('jet_deau_night') || 
                        processed.includes('mont_blanc_bridge_night') || 
                        processed.includes('flower_clock_night') || 
                        processed.includes('geneva_bike_ride_day') || 
                        processed.includes('old_town_apartment_street') || 
                        processed.includes('lakefront_bike_ride_sunset') || 
                        processed.includes('geneva_marina_sunset') || 
                        processed.includes('lake_geneva_sunset_jura') || 
                        processed.includes('geneva_gelato_shop') || 
                        processed.includes('geneva_bike_ride_night') || 
                        processed.includes('itu_un_complex_dusk') || 
                        processed.includes('geneva_airport_sunset') ||
                        processed.endsWith('.mp4');

    if (processed.includes('assets/images/') && !isNewUpload) {
      processed = processed.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    if (processed.startsWith('assets/')) {
      processed = '/' + processed;
    }
    return processed;
  }

  function getThumbnailUrl(url) {
    if (!url) return '';
    let processed = url;
    const isNewUpload = processed.includes('lake_geneva_steamship') || 
                        processed.includes('broken_chair_dusk') || 
                        processed.includes('jet_deau_rainbow') || 
                        processed.includes('geneva_street_towers') || 
                        processed.includes('geneva_cathedral_aerial') || 
                        processed.includes('old_town_lantern') || 
                        processed.includes('jet_deau_night') || 
                        processed.includes('mont_blanc_bridge_night') || 
                        processed.includes('flower_clock_night') || 
                        processed.includes('geneva_bike_ride_day') || 
                        processed.includes('old_town_apartment_street') || 
                        processed.includes('lakefront_bike_ride_sunset') || 
                        processed.includes('geneva_marina_sunset') || 
                        processed.includes('lake_geneva_sunset_jura') || 
                        processed.includes('geneva_gelato_shop') || 
                        processed.includes('geneva_bike_ride_night') || 
                        processed.includes('itu_un_complex_dusk') || 
                        processed.includes('geneva_airport_sunset') ||
                        processed.endsWith('.mp4');

    if (processed.includes('assets/images/') && !processed.includes('_thumb.') && !isNewUpload) {
      processed = processed.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '_thumb.webp');
    }
    if (processed.startsWith('assets/')) {
      processed = '/' + processed;
    }
    return processed;
  }

  // --- Initialize Application ---
  initApp();

  function initApp() {
    setupTheme();
    setupSupabase();
    setupEventListeners();
    setupFirstVisitPrompt(); // Handle first visit popup checks on page lifecycle
    
    if (isCountryPage) {
      setupCountryPage();
    } else {
      updateViewVisibility();
    }
  }

  // --- Theme Logic ---
  function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  // --- First Visit Prompt Logic ---
  function setupFirstVisitPrompt() {
    // Detect if we are on the homepage (/ or /index.html)
    const isHomepage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' || 
                       window.location.pathname.endsWith('/index.html') || 
                       window.location.pathname === '';

    if (isHomepage && localStorage.getItem('wanderPagesSignInPromptSeen') !== 'true') {
      // Save key immediately BEFORE opening the modal to block double triggers
      localStorage.setItem('wanderPagesSignInPromptSeen', 'true');
      isLoginSkipped = false;
      
      // Delay modal display slightly for smoother first render (300ms)
      setTimeout(() => {
        // If user logged in during delay, don't open
        if (currentUser) return;
        
        if (authOverlay) {
          authOverlay.classList.remove('hidden');
          document.body.classList.add('modal-open');
          document.body.style.overflow = 'hidden';
        }
      }, 300);
    }
  }

  // --- Supabase Setup ---
  function setupSupabase() {
    const { url, anonKey } = window.SUPABASE_CONFIG || {};
    
    if (url && anonKey && url !== "YOUR_SUPABASE_PROJECT_URL" && anonKey !== "YOUR_SUPABASE_ANON_KEY") {
      try {
        supabase = window.supabase.createClient(url, anonKey);
        
        supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            currentUser = session.user;
            handleUserAuthenticated(session.user);
          } else {
            currentUser = null;
            handleUserUnauthenticated();
          }
          updateViewVisibility();
        });
      } catch (err) {
        console.error("Failed to initialize Supabase client:", err);
        showAuthMessage("Supabase Initialization Error: Check console for details.", "error");
      }
    } else {
      showAuthMessage("Connection keys missing. Please configure your project URL and Anon Key in 'config.js' to enable authentication.", "error");
      disableAuthInputs();
    }
  }

  // --- Auth UI Management ---
  function handleUserAuthenticated(user) {
    closeAuthModal();
    if (loginBtn) loginBtn.style.display = 'none';
    if (userEmailText) userEmailText.textContent = user.email;
    if (userControls) userControls.style.display = 'flex';
    clearAuthMessage();
  }

  function handleUserUnauthenticated() {
    if (authOverlay) {
      if (isLoginSkipped) {
        authOverlay.classList.add('hidden');
      } else {
        authOverlay.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        localStorage.setItem('wanderPagesSignInPromptSeen', 'true');
      }
    }
    if (userControls) userControls.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'flex';
    if (userEmailText) userEmailText.textContent = '';
  }

  // Fully cleanup and close the authentication modal
  function closeAuthModal() {
    isLoginSkipped = true;
    localStorage.setItem('wanderPagesSignInPromptSeen', 'true');
    if (authOverlay) authOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    if (loginBtn) loginBtn.focus();
    updateViewVisibility();
  }

  function disableAuthInputs() {
    if (!authOverlay) return;
    const inputs = authOverlay.querySelectorAll('input, button[type="submit"]');
    inputs.forEach(el => el.disabled = true);
  }

  function showAuthMessage(msg, type) {
    if (!authMessage) return;
    authMessage.textContent = msg;
    authMessage.className = `auth-message ${type}`;
  }

  function clearAuthMessage() {
    if (!authMessage) return;
    authMessage.textContent = '';
    authMessage.className = 'auth-message';
  }

  // --- View Switching Control ---
  function updateViewVisibility() {
    if (!currentUser && !isLoginSkipped) {
      if (countrySelectionView) countrySelectionView.style.display = 'block';
      if (citySelectionView) citySelectionView.style.display = 'none';
      if (journalSection) journalSection.style.display = 'none';
      if (backToCountriesBtn) backToCountriesBtn.style.display = 'none';
      if (statsPillGroup) statsPillGroup.style.display = 'none';
      if (authOverlay) authOverlay.classList.remove('hidden');
      return;
    }

    if (authOverlay) authOverlay.classList.add('hidden');

    if (!isCountryPage) {
      // Homepage: show country grid
      if (countrySelectionView) countrySelectionView.style.display = 'block';
      if (citySelectionView) citySelectionView.style.display = 'none';
      if (journalSection) journalSection.style.display = 'none';
      if (backToCountriesBtn) backToCountriesBtn.style.display = 'none';
      if (statsPillGroup) statsPillGroup.style.display = 'none';
    } else {
      // Country subpage
      if (countrySelectionView) countrySelectionView.style.display = 'none';
      
      // Correctly reveal the active views without overlapping
      if (activeCityId !== null) {
        if (journalSection) journalSection.style.display = 'block';
        if (citySelectionView) citySelectionView.style.display = 'block'; // Keep selection cards visible at top
        if (statsPillGroup) statsPillGroup.style.display = 'flex';
      } else {
        if (journalSection) journalSection.style.display = 'none';
        if (citySelectionView) citySelectionView.style.display = 'block';
        if (statsPillGroup) statsPillGroup.style.display = 'none';
      }
    }
  }

  // --- Country Page Setup ---
  function setupCountryPage() {
    if (!isCountryPage) return;

    // Set Hero Background & text
    if (COUNTRY_DATA.coverImage) {
      heroSection.style.backgroundImage = `url('${getWebpUrl(COUNTRY_DATA.coverImage)}')`;
    }
    heroTitleText.textContent = COUNTRY_DATA.name;
    heroTaglineText.textContent = `Stories collected along the way.`;
    heroLeadText.textContent = COUNTRY_DATA.tagline;

    // Render city selectors
    renderCitySelectors();

    // If multiple cities, show selectors but hide journal layout first
    if (COUNTRY_DATA.cities.length > 1) {
      citySelectionView.style.display = 'block';
      journalSection.style.display = 'none';
      statsPillGroup.style.display = 'none';
    }
  }

  // --- Render City Selection Cards (France Layout) ---
  function renderCitySelectors() {
    if (!citySelectionView) return;

    if (COUNTRY_DATA.cities.length <= 1) {
      // Auto-select city and skip rendering tabs
      citySelectionView.style.display = 'none';
      selectCity(COUNTRY_DATA.cities[0].id);
      return;
    }

    citySelectionView.style.display = 'block';
    
    // Create large side-by-side selection cards
    citySelectionView.innerHTML = `
      <div class="city-cards-container">
        ${COUNTRY_DATA.cities.map(city => {
          const thumbUrl = getThumbnailUrl(city.heroImage);
          const desc = city.id === 'paris' 
            ? "The city of light, art, fashion, and historic monumental walks." 
            : "High-altitude wonderland of soaring peaks and the Mont Blanc massif.";
          
          return `
            <div class="city-selection-card ${city.id === activeCityId ? 'active' : ''}" data-id="${city.id}" tabindex="0" role="button" aria-pressed="${city.id === activeCityId ? 'true' : 'false'}" aria-label="Explore travels in ${city.name}">
              <div class="city-selection-card-bg" style="background-image: url('${thumbUrl}');"></div>
              <div class="city-selection-card-overlay"></div>
              <div class="city-selection-card-content">
                <h3 class="city-selection-card-title">${city.name}</h3>
                <p class="city-selection-card-desc">${desc}</p>
                <button class="city-selection-card-btn" tabindex="-1">Explore Travels <i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    const cards = citySelectionView.querySelectorAll('.city-selection-card');
    cards.forEach(card => {
      // Click selection
      card.addEventListener('click', () => {
        selectCity(card.dataset.id);
      });
      
      // Accessibility key support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCity(card.dataset.id);
        }
      });
    });
  }

  // --- Select City with Transition and Scroll ---
  function selectCity(cityId) {
    if (activeCityId === cityId) return; // Prevent re-rendering active city
    if (isTransitioning) return; // Block double-clicks

    const city = COUNTRY_DATA.cities.find(c => c.id === cityId);
    if (!city) return;

    // Highlight active card
    if (citySelectionView) {
      const cards = citySelectionView.querySelectorAll('.city-selection-card');
      cards.forEach(c => {
        if (c.dataset.id === cityId) {
          c.classList.add('active');
          c.setAttribute('aria-pressed', 'true');
        } else {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        }
      });
    }

    activeCityId = cityId;

    if (city.chapters && city.chapters.length > 0) {
      activeChapterId = city.chapters[0].id;
    } else {
      activeChapterId = null;
    }

    const layoutGrid = journalSection.querySelector('.main-layout');

    // If journalSection is currently hidden (first-time selection)
    if (journalSection.style.display === 'none' || !journalSection.style.display) {
      renderSelectedCityContent(city);
    } else {
      // A transition is already active, let's fade out, switch, and fade in
      isTransitioning = true;

      if (layoutGrid) {
        layoutGrid.style.transition = 'opacity 180ms cubic-bezier(0.22, 1, 0.36, 1), transform 180ms cubic-bezier(0.22, 1, 0.36, 1)';
        layoutGrid.style.opacity = '0';
        layoutGrid.style.transform = 'translateY(10px)';

        setTimeout(() => {
          renderSelectedCityContent(city);

          // Force browser reflow layout check
          layoutGrid.offsetHeight;

          layoutGrid.style.transition = 'opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 280ms cubic-bezier(0.22, 1, 0.36, 1)';
          layoutGrid.style.opacity = '1';
          layoutGrid.style.transform = 'translateY(0)';

          setTimeout(() => {
            isTransitioning = false;
          }, 280);
        }, 180);
      } else {
        renderSelectedCityContent(city);
      }
    }
  }

  // Render content elements and scroll
  function renderSelectedCityContent(city) {
    // Update Hero to match city details
    if (city.heroImage) {
      heroSection.style.backgroundImage = `url('${getWebpUrl(city.heroImage)}')`;
    }
    heroTitleText.textContent = city.name;
    heroTaglineText.textContent = `${COUNTRY_DATA.flag} ${city.name} Travelogue`;
    heroLeadText.textContent = city.introduction;

    // Stats
    statCountry.innerHTML = `<i class="fa-solid fa-earth-americas"></i> ${COUNTRY_DATA.name}`;
    statCity.innerHTML = `<i class="fa-solid fa-city"></i> ${city.name}`;
    statDays.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${city.duration}`;
    statsPillGroup.style.display = 'flex';

    // Show content container
    journalSection.style.display = 'block';
    journalSection.classList.add('fade-in');

    renderSidebar();
    if (activeChapterId) {
      loadChapter(activeChapterId, false);
    }

    // Smoothly scroll down to the beginning of the selected city section
    journalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // --- Auth Form Submissions ---
  async function handleSignIn(e) {
    e.preventDefault();
    if (!supabase) return;

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    showAuthMessage("Signing in...", "success");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
    } catch (err) {
      showAuthMessage(err.message, "error");
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (!supabase) return;

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    showAuthMessage("Creating account...", "success");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw error;

      if (data && data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ 
            id: data.user.id, 
            email: data.user.email, 
            subscribed_to_updates: true 
          });

        if (profileError) {
          console.warn("Could not insert subscription settings on signup:", profileError.message);
        }

        if (data.session) {
          showAuthMessage("Account created successfully!", "success");
        } else {
          showAuthMessage("Registration successful! Please check your email inbox to confirm your account.", "success");
        }
      }
    } catch (err) {
      showAuthMessage(err.message, "error");
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      isLoginSkipped = true;
      activeCityId = null;
      activeChapterId = null;
    } catch (err) {
      console.error("Sign out failure:", err.message);
    }
  }

  // --- Render Chapters Sidebar ---
  function renderSidebar() {
    if (!chapterList) return;
    const city = COUNTRY_DATA.cities.find(c => c.id === activeCityId);
    if (!city) {
      chapterList.innerHTML = '';
      return;
    }

    const itemsHTML = city.chapters.map((chapter) => {
      let iconHTML = '<i class="fa-solid fa-circle"></i>';
      if (chapter.id.includes('un')) iconHTML = '<i class="fa-solid fa-building-ngo"></i>';
      else if (chapter.id.includes('jet')) iconHTML = '<i class="fa-solid fa-water"></i>';
      else if (chapter.id.includes('vibe') || chapter.id.includes('streets')) iconHTML = '<i class="fa-solid fa-camera-retro"></i>';
      else if (chapter.id.includes('chamonix') || chapter.id.includes('midi')) iconHTML = '<i class="fa-solid fa-mountain"></i>';
      else if (chapter.id.includes('paris') || chapter.id.includes('eiffel')) iconHTML = '<i class="fa-solid fa-monument"></i>';

      return `
        <li class="chapter-nav-item">
          <button class="chapter-btn ${chapter.id === activeChapterId ? 'active' : ''}" data-id="${chapter.id}">
            <span style="display: flex; align-items: center; gap: 8px;">
              ${iconHTML}
              <span>${chapter.title}</span>
            </span>
            <span class="btn-subtitle">${chapter.subtitle}</span>
          </button>
        </li>
      `;
    }).join('');

    chapterList.innerHTML = itemsHTML;
  }

  // --- Switch Chapter ---
  function switchChapter(chapterId) {
    if (!chapterList) return;
    const buttons = chapterList.querySelectorAll('.chapter-btn');
    buttons.forEach(btn => {
      if (btn.dataset.id === chapterId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    activeChapterId = chapterId;

    const content = contentContainer.querySelector('.chapter-content');
    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateY(15px)';
      
      setTimeout(() => {
        loadChapter(chapterId, true);
      }, 300);
    } else {
      loadChapter(chapterId, true);
    }
  }

  // --- Load and Render Chapter ---
  function loadChapter(chapterId, scrollToContent = false) {
    if (!contentContainer) return;
    
    // Render a lightweight loading spinner while parsing/switching chapters
    contentContainer.innerHTML = `
      <div class="chapter-content-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; gap: 16px; color: var(--text-muted);">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i>
        <p style="font-family: 'Inter', sans-serif; font-size: 0.95rem;">Loading travel details...</p>
      </div>
    `;

    // Static metadata mapping for integrating photos into story blocks with descriptions
    const IMAGE_STORY_META = {
      // --- Switzerland: Place des Nations & Broken Chair ---
      'broken_chair_dusk.jpg': {
        title: "The Broken Chair",
        desc: "Opposite the United Nations gates stands the Broken Chair—a monumental wood sculpture by Daniel Berset with a shattered leg. It stands as a silent, powerful protest against landmines and cluster bombs, symbolizing Place des Nations' historical role in international peace efforts.",
        meta: "Place des Nations • July 10"
      },
      'itu_un_complex_dusk.jpg': {
        title: "UN Palais des Nations",
        desc: "Standing in front of the Palais des Nations is a profound experience. The long avenue lined with colorful flags of member nations speaks to the hope of global cooperation, while the glowing office windows at dusk represent the constant work of peace diplomacy.",
        meta: "Palais des Nations • July 10"
      },

      // --- Switzerland: Jet d'Eau ---
      'jet_deau_rainbow.jpg': {
        title: "Fountain and Rainbow",
        desc: "The iconic Jet d'Eau shoots water 140 meters high into the sky over Lake Geneva. When the evening sun catches the water mist, a fleeting rainbow arches beautifully over the harbor, creating a magical lakeside view.",
        meta: "Lake Geneva • July 12"
      },
      'lake_geneva_steamship.jpg': {
        title: "Lakeside Paddle Steamer",
        desc: "A classic Swiss paddle steamer cruises past the towering water column of the Jet d'Eau. The historical steamship, flying the Swiss flag, represents Geneva's rich maritime heritage on the lake.",
        meta: "Lake Geneva • July 12"
      },
      'lake_geneva_boat_video.mp4': {
        title: "Cruising Lake Geneva",
        desc: "A peaceful boat ride across the crystal-clear waters of Lake Geneva offers refreshing alpine breezes. The cruise highlights the majestic mountain reflections and scenic shores of Geneva's harbor.",
        meta: "Lake Geneva • July 12"
      },
      'lake_geneva_sunset_jura.jpg': {
        title: "Sunset over the Jura",
        desc: "A wide, panoramic view of Lake Geneva at sunset, with the silhouette of the Jura Mountains in the distance. The golden hues reflecting on the water capture the calm, peaceful alpine atmosphere.",
        meta: "Lake Geneva • July 12"
      },
      'geneva_marina_sunset.jpg': {
        title: "Sunset over the Marina",
        desc: "Dozens of local sailboats and yachts docked at the Geneva marina silhouetted against a brilliant sunset sky, reflecting the quiet evening lakeside charm.",
        meta: "Lake Geneva • July 12"
      },
      'geneva_gelato_shop.jpg': {
        title: "Lakeside Gelato Treat",
        desc: "Sampling some infamous local Italian gelato from a shop right alongside the Jet d'Eau. Enjoying colorful scoops of sweet treats is a perfect way to relax during a sunny day of lakeside walking.",
        meta: "Lake Geneva • July 12"
      },
      'jet_deau_night.jpg': {
        title: "Jet d'Eau at Night",
        desc: "The Jet d'Eau illuminated in brilliant white against the night sky, throwing a giant column of water that glows alongside the city's harbor lights.",
        meta: "Lake Geneva • July 12"
      },

      // --- Switzerland: City Vibe ---
      'geneva_cathedral_aerial.jpg': {
        title: "St. Pierre Cathedral View",
        desc: "An aerial view overlooking the rooftops of Geneva's historic Old Town, centered around the green-roofed spire of St. Pierre Cathedral. The historic district climbs uphill, offering panoramic views of the city below.",
        meta: "Vieille Ville • July 14"
      },
      'old_town_apartment_street.jpg': {
        title: "Alleyways of Old Town",
        desc: "A quiet, narrow cobblestone alleyway lined with traditional window-shuttered apartments. Walking these historic paths transports you through centuries of Geneva's residential heritage.",
        meta: "Vieille Ville • July 14"
      },
      'old_town_lantern.jpg': {
        title: "Vieille Ville Lanterns",
        desc: "A warm street lantern glows on a stone building wall in the Old Town at dusk. The soft golden light highlights the quiet, atmospheric charm of Geneva's historic heart.",
        meta: "Vieille Ville • July 14"
      },
      'flower_clock_night.jpg': {
        title: "The Flower Clock",
        desc: "Geneva's famous Flower Clock (L'horloge fleurie) illuminated in the Jardin Anglais at night. This beautiful living monument of thousands of seasonal flowers celebrates the city's legendary history of Swiss watchmaking.",
        meta: "Jardin Anglais • July 14"
      },
      'geneva_bike_ride_day.jpg': {
        title: "Exploring by Bike",
        desc: "Renting a local bike to explore Geneva's wide streets, clock towers, and tram crossings. Navigating through the city on two wheels is the perfect way to feel the local speed and energy.",
        meta: "Geneva Center • July 14"
      },
      'geneva_street_towers.jpg': {
        title: "Geneva Streets and Architecture",
        desc: "A view down a street in central Geneva with traditional clock towers and tram tracks overhead, representing the daily rhythm and architectural heritage of the city.",
        meta: "Geneva Center • July 14"
      },
      'mont_blanc_bridge_night.jpg': {
        title: "View from the Ferris Wheel",
        desc: "A spectacular night view looking down at the Mont-Blanc Bridge lights, captured from the top of the Geneva Ferris Wheel alongside the lake.",
        meta: "Lake Geneva • July 14"
      },
      'geneva_bike_ride_night.jpg': {
        title: "Night Cycling Route",
        desc: "Cycling through the peaceful, lit-up streets of Geneva at night. The green traffic lights guide a quiet ride back along the urban bike lanes.",
        meta: "Geneva Center • July 14"
      },
      'lakefront_bike_ride_sunset.jpg': {
        title: "Sunset Lakefront Ride",
        desc: "Catching the sunset on a bike ride along the Geneva lakefront promenade. Pedaling with views of the orange sky and families relaxing on the grass is a perfect evening highlight.",
        meta: "Lake Geneva • July 14"
      },
      'geneva_airport_sunset.jpg': {
        title: "GVA Station Sunset",
        desc: "Arriving at the Geneva GVA airport station under a soft orange sunset sky, marking the beginning of a fresh Swiss exploration.",
        meta: "GVA Station • July 14"
      },

      // --- France: Paris ---
      'paris_eiffel.webp': {
        title: "Eiffel Tower Afternoon",
        desc: "The Eiffel Tower stands tall over the green lawns of Champ de Mars in the afternoon. Walking along the Seine, seeing the tower in person is a sensation that photographs cannot fully capture.",
        meta: "Champ de Mars • July 19"
      },
      'paris_louvre.webp': {
        title: "Louvre Glass Pyramid",
        desc: "The modern glass pyramid of the Louvre Palace glows beautifully at dusk. It stands in striking, elegant contrast to the surrounding historic French palace architecture.",
        meta: "Louvre Palace • July 19"
      },

      // --- France: Chamonix ---
      'france_hero.webp': {
        title: "Aiguille du Midi Cable Car",
        desc: "The steep cable car ascends from the Chamonix valley floor towards the towering heights of Aiguille du Midi at 3,842 meters. The dramatic ride rises high above pine trees and craggy rock faces.",
        meta: "Chamonix Valley • July 17"
      },
      'city_streets.webp': {
        title: "Snowy Mont Blanc Peaks",
        desc: "Panoramic views of the majestic Mont Blanc peaks covered in pristine, ancient snow. Looking at the vast spires standing tall under the sun, it truly feels like standing on top of the world.",
        meta: "Mont Blanc Massif • July 17"
      },

      // --- Germany: Dortmund ---
      'city_streets.webp_dortmund_0': {
        title: "Lively Dortmund Squares",
        desc: "Walking through central Dortmund pedestrian zones reveals a warm and authentic character. Street boutiques and cafes are filled with locals enjoying their day in the Ruhr region.",
        meta: "Dortmund Center • July 22"
      },
      'city_streets.webp_dortmund_1': {
        title: "Local Cafes and Vibe",
        desc: "Relaxing at an outdoor cafe in central Dortmund offers an honest glimpse into the city's welcoming community style. It was a wonderful final stop on the journey.",
        meta: "Westfalenpark • July 22"
      }
    };

    function getImageStoryMeta(url, caption, index, cityId) {
      const filename = url.substring(url.lastIndexOf('/') + 1);
      
      // Handle Dortmund city_streets.webp duplicates
      if (filename === 'city_streets.webp' && cityId === 'dortmund') {
        const key = `city_streets.webp_dortmund_${index}`;
        if (IMAGE_STORY_META[key]) return IMAGE_STORY_META[key];
      }
      
      if (IMAGE_STORY_META[filename]) {
        return IMAGE_STORY_META[filename];
      }
      
      return {
        title: caption || "Travel Capture",
        desc: "A beautiful perspective captured along the way during my European travel journey.",
        meta: ""
      };
    }

    try {
      const city = COUNTRY_DATA.cities.find(c => c.id === activeCityId);
      if (!city) throw new Error(`City with ID "${activeCityId}" not found in country data.`);

      const chapter = city.chapters.find(c => c.id === chapterId);
      if (!chapter) throw new Error(`Chapter with ID "${chapterId}" not found in city "${city.name}".`);

      currentGallery = chapter.gallery || [];

      // Divide gallery into Story Blocks (first 2-4 items) and compact bottom gallery (remaining items)
      let storyBlocksItems = [];
      let extraGalleryItems = [];

      if (currentGallery.length <= 4) {
        storyBlocksItems = currentGallery;
        extraGalleryItems = [];
      } else {
        storyBlocksItems = currentGallery.slice(0, 4);
        extraGalleryItems = currentGallery.slice(4);
      }

      // 1. Alternating Image-and-Text Story Blocks HTML
      let storyBlocksHTML = '';
      if (storyBlocksItems.length > 0) {
        storyBlocksHTML = `
          <div class="story-blocks-container">
            ${storyBlocksItems.map((img, index) => {
              const isVideo = img.url.endsWith('.mp4');
              const meta = getImageStoryMeta(img.url, img.caption, index, city.id);
              
              const mediaTag = isVideo 
                ? `<video src="${getWebpUrl(img.url)}" muted loop playsinline class="story-block-image" style="width:100%; height:100%; object-fit:cover;"></video>` 
                : `<img src="${getWebpUrl(img.url)}" alt="${img.caption}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" class="story-block-image" width="600" height="340">`;
              
              const playIconHTML = isVideo ? `<div class="gallery-play-icon" style="z-index: 5;"><i class="fa-solid fa-play"></i></div>` : '';
              
              return `
                <div class="story-block">
                  <div class="story-block-image-wrapper gallery-card ${isVideo ? 'video-card' : ''}" data-index="${index}">
                    ${mediaTag}
                    ${playIconHTML}
                  </div>
                  <div class="story-block-content">
                    ${meta.meta ? `<div class="story-block-metadata"><i class="fa-regular fa-calendar"></i> ${meta.meta}</div>` : ''}
                    <h3 class="story-block-title">${meta.title}</h3>
                    <p class="story-block-desc">${meta.desc}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // 2. Full Journal Text Block HTML (Preserves the full written stories beautifully)
      const journalFullStoryHTML = `
        <div class="journal-full-story">
          <h4 class="journal-full-story-title"><i class="fa-solid fa-book-open"></i> Full Journal Entry</h4>
          <p class="journal-text">${chapter.journal}</p>
        </div>
      `;

      // 3. Compact "More from [City]" Bottom Gallery HTML
      let extraGalleryHTML = '';
      if (extraGalleryItems.length > 0) {
        const extraItems = extraGalleryItems.map((img, index) => {
          const actualIndex = index + 4; // Map back to actual index in currentGallery
          const isVideo = img.url.endsWith('.mp4');
          
          if (isVideo) {
            return `
              <div class="extra-gallery-card gallery-card video-card" data-index="${actualIndex}">
                <video src="${getWebpUrl(img.url)}" muted loop playsinline class="gallery-video-preview"></video>
                <div class="gallery-play-icon"><i class="fa-solid fa-play"></i></div>
                <div class="gallery-overlay">
                  <span class="gallery-caption">${img.caption}</span>
                </div>
              </div>
            `;
          } else {
            return `
              <div class="extra-gallery-card gallery-card" data-index="${actualIndex}">
                <img src="${getThumbnailUrl(img.url)}" alt="${img.caption}" loading="lazy" decoding="async" width="200" height="150">
                <div class="gallery-overlay">
                  <span class="gallery-caption">${img.caption}</span>
                </div>
              </div>
            `;
          }
        }).join('');

        extraGalleryHTML = `
          <div class="extra-gallery-section">
            <h3 class="extra-gallery-title"><i class="fa-solid fa-images"></i> More from ${city.name}</h3>
            <div class="extra-gallery-grid">
              ${extraItems}
            </div>
          </div>
        `;
      }

      // City headers (Hero banner and intro text)
      let cityHeaderHTML = '';
      if (city.heroImage || city.introduction) {
        const heroPhotoHTML = city.heroImage ? `
          <div class="city-header-hero">
            <img src="${getWebpUrl(city.heroImage)}" alt="${city.name} Hero Photo" loading="eager" width="1200" height="280">
          </div>
        ` : '';
        
        const introHTML = city.introduction ? `
          <div class="city-intro-section">
            ${city.introduction}
          </div>
        ` : '';
        
        cityHeaderHTML = `
          <div class="city-header-details">
            ${heroPhotoHTML}
            ${introHTML}
          </div>
        `;
      }

      // Reflection modules
      let reflectionsHTML = '';
      let memoryHTML = '';
      if (city.favoriteMemory) {
        memoryHTML = `
          <div class="reflection-card favorite-memory">
            <h4><i class="fa-solid fa-star"></i> Favourite Memory</h4>
            <p>${city.favoriteMemory}</p>
          </div>
        `;
      }
      
      let experiencesHTML = '';
      if (city.experiences && city.experiences.length > 0) {
        const tags = city.experiences.map(exp => `<span class="experience-tag">${exp}</span>`).join('');
        experiencesHTML = `
          <div class="reflection-card">
            <h4><i class="fa-solid fa-compass"></i> Places & Food Experienced</h4>
            <div class="experience-tags">${tags}</div>
          </div>
        `;
      }
      
      let lessonsHTML = '';
      if (city.lessons) {
        lessonsHTML = `
          <div class="reflection-card lessons-learned">
            <h4><i class="fa-solid fa-lightbulb"></i> What this journey taught me</h4>
            <p>${city.lessons}</p>
          </div>
        `;
      }
      
      // Prev / Next City Nav inside country page
      let navHTML = '';
      const cityIndex = COUNTRY_DATA.cities.findIndex(c => c.id === city.id);
      const prevCity = cityIndex > 0 ? COUNTRY_DATA.cities[cityIndex - 1] : null;
      const nextCity = cityIndex < COUNTRY_DATA.cities.length - 1 ? COUNTRY_DATA.cities[cityIndex + 1] : null;
      
      let prevLink = prevCity ? `<button class="city-nav-link" data-id="${prevCity.id}" style="background:none;border:none;cursor:pointer;"><i class="fa-solid fa-arrow-left-long"></i> Previous City: ${prevCity.name}</button>` : '<div></div>';
      let nextLink = nextCity ? `<button class="city-nav-link" data-id="${nextCity.id}" style="background:none;border:none;cursor:pointer;">Next City: ${nextCity.name} <i class="fa-solid fa-arrow-right-long"></i></button>` : '<div></div>';
      
      if (prevCity || nextCity) {
        navHTML = `
          <div class="city-navigation-footer">
            ${prevLink}
            ${nextLink}
          </div>
        `;
      }
      
      reflectionsHTML = `
        <div class="city-reflections-container">
          ${memoryHTML}
          ${experiencesHTML}
          ${lessonsHTML}
          ${navHTML}
          <div class="city-action-buttons">
            ${COUNTRY_DATA.cities.length > 1 ? `<button class="btn-secondary-outline" id="btn-back-cities-selector"><i class="fa-solid fa-map-location-dot"></i> Back to France Selectors</button>` : ''}
            <a href="/" class="btn-secondary-outline" style="text-decoration:none;"><i class="fa-solid fa-earth-americas"></i> Back to All Countries</a>
          </div>
        </div>
      `;

      const htmlContent = `
        <div class="chapter-content" style="opacity: 0; transform: translateY(15px); transition: opacity 0.4s var(--transition-bezier), transform 0.4s var(--transition-bezier);">
          ${cityHeaderHTML}
          
          <div class="chapter-header" style="margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 24px;">
            <span class="chapter-date-badge"><i class="fa-regular fa-clock"></i> ${chapter.date}</span>
            <h2 class="chapter-title-main">${chapter.title}</h2>
            <div class="chapter-subtitle-main">${chapter.subtitle}</div>
          </div>
          
          ${storyBlocksHTML}
          
          ${journalFullStoryHTML}
          
          ${reflectionsHTML}
          
          ${extraGalleryHTML}
        </div>
      `;

      // Remove loading indicator right before content insertion
      contentContainer.innerHTML = htmlContent;

      // Bind click listeners for internal city nav
      const cityNavLinks = contentContainer.querySelectorAll('.city-nav-link');
      cityNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          selectCity(link.dataset.id);
        });
      });

      const btnBackSelector = contentContainer.querySelector('#btn-back-cities-selector');
      if (btnBackSelector) {
        btnBackSelector.addEventListener('click', () => {
          activeCityId = null;
          activeChapterId = null;
          
          // Reset selector cards active classes
          if (citySelectionView) {
            const cards = citySelectionView.querySelectorAll('.city-selection-card');
            cards.forEach(c => {
              c.classList.remove('active');
              c.setAttribute('aria-pressed', 'false');
            });
          }
          
          journalSection.style.display = 'none';
          statsPillGroup.style.display = 'none';
          citySelectionView.style.display = 'block';
          citySelectionView.classList.add('fade-in');
          
          // Reset hero to country cover
          if (COUNTRY_DATA.coverImage) {
            heroSection.style.backgroundImage = `url('${getWebpUrl(COUNTRY_DATA.coverImage)}')`;
          }
          heroTitleText.textContent = COUNTRY_DATA.name;
          heroTaglineText.textContent = `Stories collected along the way.`;
          heroLeadText.textContent = COUNTRY_DATA.tagline;
        });
      }

      setTimeout(() => {
        const newContent = contentContainer.querySelector('.chapter-content');
        if (newContent) {
          newContent.style.opacity = '1';
          newContent.style.transform = 'translateY(0)';
        }

        // Premium staggered slide/fade-in transitions for story blocks
        const storyBlocks = contentContainer.querySelectorAll('.story-block');
        storyBlocks.forEach((block, idx) => {
          setTimeout(() => {
            block.classList.add('visible');
          }, idx * 100);
        });

        // Reveal the full story block right after the story blocks transition
        const fullStory = contentContainer.querySelector('.journal-full-story');
        if (fullStory) {
          setTimeout(() => {
            fullStory.classList.add('visible');
          }, storyBlocks.length * 100);
        }
      }, 50);

      const cards = contentContainer.querySelectorAll('.gallery-card:not(.placeholder)');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const index = parseInt(card.dataset.index);
          openLightbox(index);
        });
      });

      // Play video on hover in gallery
      const videoCards = contentContainer.querySelectorAll('.gallery-card.video-card');
      videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
          card.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log("Auto-play blocked:", e));
          });
          card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
          });
        }
      });

      if (scrollToContent && window.innerWidth <= 1024) {
        contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error("Error loading travel chapter:", err);
      contentContainer.innerHTML = `
        <div class="chapter-content-error" style="text-align: center; padding: 50px 30px; color: var(--text-main);">
          <i class="fa-solid fa-circle-exclamation" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 16px;"></i>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 8px;">Failed to Load Page</h3>
          <p style="font-family: 'Inter', sans-serif; font-size: 0.95rem; color: var(--text-muted); margin-bottom: 20px;">This travel chapter could not be loaded. Please try again.</p>
          <button onclick="window.location.reload()" class="btn-secondary-outline" style="margin: 0 auto;">Retry Load</button>
        </div>
      `;
    }
  }

  // --- Lightbox Functions ---
  function openLightbox(index) {
    if (!lightbox || currentGallery.length === 0) return;
    currentImageIndex = index;
    updateLightboxImage();
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox modal and restore page scroll parameters
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.src = '';
    }
  }

  function nextImage() {
    if (currentGallery.length <= 1) return;
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    updateLightboxImage();
  }

  function prevImage() {
    if (currentGallery.length <= 1) return;
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    if (!lightboxImg || !lightboxVideo) return;
    const item = currentGallery[currentImageIndex];
    if (!item) return;
    
    const isVideo = item.url.endsWith('.mp4');
    
    if (isVideo) {
      lightboxImg.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = getWebpUrl(item.url);
      if (lightboxCaption) lightboxCaption.textContent = item.caption;
      lightboxVideo.play().catch(e => console.log("Video auto-play blocked:", e));
    } else {
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
      lightboxVideo.src = '';
      
      lightboxImg.style.display = 'block';
      lightboxImg.style.opacity = '0.5';
      lightboxImg.src = getWebpUrl(item.url);
      lightboxImg.alt = item.caption;
      if (lightboxCaption) lightboxCaption.textContent = item.caption;
      
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = '1';
      };
    }
  }

  // --- Listeners Setup ---
  function setupEventListeners() {
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // Event delegation for sidebar chapters selection
    if (chapterList) {
      chapterList.addEventListener('click', (e) => {
        const button = e.target.closest('.chapter-btn');
        if (button) {
          const chapterId = button.dataset.id;
          if (activeChapterId !== chapterId) {
            switchChapter(chapterId);
          }
        }
      });
    }

    // Close Auth overlay to skip login
    if (authCloseBtn) {
      authCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeAuthModal();
      });
    }

    // Show Auth overlay when clicking Sign In header button
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        isLoginSkipped = false;
        if (authOverlay) authOverlay.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        clearAuthMessage();
      });
    }

    // Auth Form Tab Toggling
    if (tabSignin) {
      tabSignin.addEventListener('click', () => {
        tabSignin.classList.add('active');
        if (tabSignup) tabSignup.classList.remove('active');
        if (signinForm) signinForm.classList.add('active');
        if (signupForm) signupForm.classList.remove('active');
        clearAuthMessage();
      });
    }

    if (tabSignup) {
      tabSignup.addEventListener('click', () => {
        tabSignup.classList.add('active');
        if (tabSignin) tabSignin.classList.remove('active');
        if (signupForm) signupForm.classList.add('active');
        if (signinForm) signinForm.classList.remove('active');
        clearAuthMessage();
      });
    }

    // Form Submissions
    if (signinForm) signinForm.addEventListener('submit', handleSignIn);
    if (signupForm) signupForm.addEventListener('submit', handleSignUp);

    // Logout
    if (logoutBtn) logoutBtn.addEventListener('click', handleSignOut);

    // Header Scroll Indicator
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        if (mainHeader) mainHeader.classList.add('scrolled');
      } else {
        if (mainHeader) mainHeader.classList.remove('scrolled');
      }
    });

    // Lightbox Close
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

    // Lightbox Nav
    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
      });
    }
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
      });
    }

    // Keyboard Nav for Lightbox
    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    });
  }
});
