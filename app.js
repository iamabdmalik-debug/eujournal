document.addEventListener('DOMContentLoaded', () => {
  // Check if data.js was loaded successfully
  if (typeof TRAVEL_DATA === 'undefined') {
    console.error('TRAVEL_DATA is not defined. Make sure data.js is loaded.');
    return;
  }

  // --- DOM Elements ---
  const chapterList = document.getElementById('chapter-list');
  const contentContainer = document.getElementById('content-container');
  const themeToggle = document.getElementById('theme-toggle');
  const mainHeader = document.getElementById('main-header');
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption-text');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next-btn');

  // --- Multi-Country DOM Elements ---
  const countrySelectionView = document.getElementById('country-selection-view');
  const countryGrid = document.getElementById('country-grid');
  const citySelectionView = document.getElementById('city-selection-view');
  const cityGrid = document.getElementById('city-grid');
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
  let activeCountryId = null; // Starts null to show country selection screen
  let activeCityId = null;
  let activeChapterId = null;
  let currentGallery = [];
  let currentImageIndex = 0;
  let supabase = null;
  let currentUser = null;
  let isLoginSkipped = false;

  // --- Helper functions for Image Optimization ---
  function getWebpUrl(url) {
    if (!url) return '';
    if (url.includes('assets/images/')) {
      return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return url;
  }

  function getThumbnailUrl(url) {
    if (!url) return '';
    if (url.includes('assets/images/') && !url.includes('_thumb.')) {
      return url.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '_thumb.webp');
    }
    return url;
  }

  // --- Initialize Application ---
  initApp();

  function initApp() {
    setupTheme();
    setupSupabase();
    renderCountryGrid();
    setupEventListeners();
    handleRouting(); // Process URL routing on load
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
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
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
    authOverlay.classList.add('hidden');
    loginBtn.style.display = 'none';
    userEmailText.textContent = user.email;
    userControls.style.display = 'flex';
    clearAuthMessage();
  }

  function handleUserUnauthenticated() {
    if (isLoginSkipped) {
      authOverlay.classList.add('hidden');
    } else {
      authOverlay.classList.remove('hidden');
    }
    userControls.style.display = 'none';
    loginBtn.style.display = 'flex';
    userEmailText.textContent = '';
  }

  function disableAuthInputs() {
    const inputs = authOverlay.querySelectorAll('input, button[type="submit"]');
    inputs.forEach(el => el.disabled = true);
  }

  function showAuthMessage(msg, type) {
    authMessage.textContent = msg;
    authMessage.className = `auth-message ${type}`;
  }

  function clearAuthMessage() {
    authMessage.textContent = '';
    authMessage.className = 'auth-message';
  }

  // --- View Switching Control ---
  function updateViewVisibility() {
    if (!currentUser && !isLoginSkipped) {
      // Unauthenticated and not skipped: show country selector in background, show auth overlay
      countrySelectionView.style.display = 'block';
      citySelectionView.style.display = 'none';
      journalSection.style.display = 'none';
      backToCountriesBtn.style.display = 'none';
      statsPillGroup.style.display = 'none';
      authOverlay.classList.remove('hidden');
      return;
    }

    if (activeCountryId === null) {
      // Home / Country Selection Screen
      countrySelectionView.style.display = 'block';
      countrySelectionView.classList.add('fade-in');
      citySelectionView.style.display = 'none';
      journalSection.style.display = 'none';
      backToCountriesBtn.style.display = 'none';
      statsPillGroup.style.display = 'none';
      
      // Reset Hero to default
      heroSection.style.backgroundImage = "url('assets/images/hero_bg.webp')";
      heroTitleText.textContent = "Wander Pages";
      heroTaglineText.textContent = "Every place leaves a page.";
      heroLeadText.textContent = TRAVEL_DATA.tagline;
    } else if (activeCityId === null) {
      // City Selection Screen inside a Country
      countrySelectionView.style.display = 'none';
      citySelectionView.style.display = 'block';
      citySelectionView.classList.add('fade-in');
      journalSection.style.display = 'none';
      backToCountriesBtn.style.display = 'flex';
      backToCountriesBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Countries`;
      statsPillGroup.style.display = 'none';

      // Update Hero to match country cover image
      const country = TRAVEL_DATA.countries.find(c => c.id === activeCountryId);
      if (country && country.coverImage) {
        heroSection.style.backgroundImage = `url('${getWebpUrl(country.coverImage)}')`;
        heroTitleText.textContent = country.name;
        heroTaglineText.textContent = `${country.flag} Explore My Travels`;
        heroLeadText.textContent = country.tagline;
      }
    } else {
      // Active City Chapters View
      countrySelectionView.style.display = 'none';
      citySelectionView.style.display = 'none';
      journalSection.style.display = 'grid';
      journalSection.classList.add('fade-in');
      backToCountriesBtn.style.display = 'flex';
      backToCountriesBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Cities`;
      statsPillGroup.style.display = 'flex';
    }
  }

  // --- Render Country Selection Grid ---
  function renderCountryGrid() {
    const cardsHTML = TRAVEL_DATA.countries.map(country => {
      const thumbUrl = getThumbnailUrl(country.coverImage);
      const bgStyle = thumbUrl
        ? `background-image: url('${thumbUrl}');`
        : `background: linear-gradient(135deg, hsl(220, 25%, 18%), hsl(220, 20%, 10%));`;
      
      return `
        <div class="country-card" data-id="${country.id}">
          <div class="country-card-bg" style="${bgStyle}"></div>
          <div class="country-card-overlay"></div>
          <div class="country-card-content">
            <div class="country-card-flag">${country.flag}</div>
            <h3 class="country-card-name">${country.name}</h3>
            <p class="country-card-tagline">${country.tagline}</p>
            <button class="country-card-btn">Explore Travels <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      `;
    }).join('');
    
    countryGrid.innerHTML = cardsHTML;
  }

  // --- Render City Selection Grid ---
  function renderCityGrid() {
    cityGrid.innerHTML = '';
    const country = TRAVEL_DATA.countries.find(c => c.id === activeCountryId);
    if (!country) return;

    const citiesHTML = country.cities.map(city => {
      const thumbUrl = getThumbnailUrl(city.heroImage);
      const bgStyle = thumbUrl
        ? `background-image: url('${thumbUrl}');`
        : `background: linear-gradient(135deg, hsl(220, 25%, 18%), hsl(220, 20%, 10%));`;

      return `
        <div class="city-card" data-id="${city.id}">
          <div class="city-card-bg" style="${bgStyle}"></div>
          <div class="city-card-overlay"></div>
          <div class="city-card-content">
            <h3 class="city-card-name">${city.name}</h3>
            <p class="city-card-tagline">${city.travelDate} • ${city.duration}</p>
            <button class="city-card-btn">Explore Travels <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      `;
    }).join('');

    cityGrid.innerHTML = citiesHTML;
  }

  // --- Select Country and Trigger Transition ---
  function selectCountry(countryId, updateHash = true) {
    const country = TRAVEL_DATA.countries.find(c => c.id === countryId);
    if (!country) return;

    activeCountryId = countryId;
    activeCityId = null;

    renderCityGrid();

    if (updateHash) {
      window.location.hash = `/countries/${countryId}`;
    }

    // Apply fade out animation to Country selection
    countrySelectionView.classList.add('fade-out');
    
    setTimeout(() => {
      countrySelectionView.classList.remove('fade-out');
      
      if (country.coverImage) {
        heroSection.style.backgroundImage = `url('${getWebpUrl(country.coverImage)}')`;
      } else {
        heroSection.style.backgroundImage = 'none';
        heroSection.style.background = 'linear-gradient(135deg, hsl(220, 30%, 12%), hsl(240, 25%, 8%))';
      }
      heroTitleText.textContent = country.name;
      heroTaglineText.textContent = `${country.flag} My Journeys`;
      heroLeadText.textContent = country.tagline;

      updateViewVisibility();
      
      // Smooth scroll down to main content
      document.getElementById('main-content-anchor').scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  // --- Select City and Trigger Transition ---
  function selectCity(cityId, updateHash = true) {
    const country = TRAVEL_DATA.countries.find(c => c.id === activeCountryId);
    if (!country) return;

    const city = country.cities.find(c => c.id === cityId);
    if (!city) return;

    activeCityId = cityId;

    if (updateHash) {
      window.location.hash = `/countries/${activeCountryId}/${cityId}`;
    }

    // Set first chapter active
    if (city.chapters && city.chapters.length > 0) {
      activeChapterId = city.chapters[0].id;
    } else {
      activeChapterId = null;
    }

    citySelectionView.classList.add('fade-out');
    
    setTimeout(() => {
      citySelectionView.classList.remove('fade-out');

      // Update Hero to match city
      if (city.heroImage) {
        heroSection.style.backgroundImage = `url('${getWebpUrl(city.heroImage)}')`;
      } else {
        heroSection.style.backgroundImage = 'none';
        heroSection.style.background = 'linear-gradient(135deg, hsl(220, 30%, 12%), hsl(240, 25%, 8%))';
      }
      heroTitleText.textContent = city.name;
      heroTaglineText.textContent = `${country.flag} ${city.name} Travelogue`;
      heroLeadText.textContent = city.introduction;

      // Update Header Stats
      statCountry.innerHTML = `<i class="fa-solid fa-earth-americas"></i> ${country.name}`;
      statCity.innerHTML = `<i class="fa-solid fa-city"></i> ${city.name}`;
      statDays.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${city.duration}`;

      renderSidebar();
      if (activeChapterId) {
        loadChapter(activeChapterId, false);
      }

      updateViewVisibility();
      
      // Smooth scroll down to main content
      document.getElementById('main-content-anchor').scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  function showCountrySelection(updateHash = true) {
    activeCountryId = null;
    activeCityId = null;
    activeChapterId = null;

    if (updateHash) {
      window.location.hash = '/';
    }

    updateViewVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        // Auto-subscribe user to updates
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
      isLoginSkipped = false;
      activeCountryId = null;
      activeCityId = null;
      activeChapterId = null;
    } catch (err) {
      console.error("Sign out failure:", err.message);
    }
  }

  // --- Render Sidebar based on active city ---
  function renderSidebar() {
    const country = TRAVEL_DATA.countries.find(c => c.id === activeCountryId);
    const city = country ? country.cities.find(c => c.id === activeCityId) : null;
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

  // --- Switch Chapter (with transition) ---
  function switchChapter(chapterId) {
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

  // --- Load and Render Chapter Content ---
  function loadChapter(chapterId, scrollToContent = false) {
    const country = TRAVEL_DATA.countries.find(c => c.id === activeCountryId);
    const city = country ? country.cities.find(c => c.id === activeCityId) : null;
    if (!city) return;

    const chapter = city.chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    currentGallery = chapter.gallery || [];

    let galleryHTML = '';
    if (currentGallery.length > 0) {
      const galleryItems = currentGallery.map((img, index) => {
        if (img.url) {
          return `
            <div class="gallery-card" data-index="${index}">
              <img src="${getThumbnailUrl(img.url)}" alt="${img.caption}" loading="lazy">
              <div class="gallery-overlay">
                <span class="gallery-caption">${img.caption}</span>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="gallery-card placeholder">
              <i class="fa-regular fa-image placeholder-icon"></i>
              <span class="placeholder-caption">${img.caption}</span>
            </div>
          `;
        }
      }).join('');

      galleryHTML = `
        <h3 class="gallery-section-title"><i class="fa-solid fa-images"></i> Pictures from the Spot</h3>
        <div class="gallery-grid">${galleryItems}</div>
      `;
    }

    // Dynamic headers (Hero Photo & Intro) - render only if available
    let cityHeaderHTML = '';
    if (city.heroImage || city.introduction) {
      const heroPhotoHTML = city.heroImage ? `
        <div class="city-header-hero">
          <img src="${getWebpUrl(city.heroImage)}" alt="${city.name} Hero Photo" loading="eager">
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

    // Reflective details at bottom
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
    
    // Previous & Next City Navigation
    let navHTML = '';
    const cityIndex = country.cities.findIndex(c => c.id === city.id);
    const prevCity = cityIndex > 0 ? country.cities[cityIndex - 1] : null;
    const nextCity = cityIndex < country.cities.length - 1 ? country.cities[cityIndex + 1] : null;
    
    let prevLink = prevCity ? `<a href="#/countries/${activeCountryId}/${prevCity.id}" class="city-nav-link"><i class="fa-solid fa-arrow-left-long"></i> Previous City: ${prevCity.name}</a>` : '<div></div>';
    let nextLink = nextCity ? `<a href="#/countries/${activeCountryId}/${nextCity.id}" class="city-nav-link">Next City: ${nextCity.name} <i class="fa-solid fa-arrow-right-long"></i></a>` : '<div></div>';
    
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
          <button class="btn-secondary-outline" id="btn-back-country"><i class="fa-solid fa-map-location-dot"></i> Back to ${country.name} Cities</button>
          <button class="btn-secondary-outline" id="btn-back-countries"><i class="fa-solid fa-earth-americas"></i> Back to All Countries</button>
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
        
        <div class="chapter-body">
          <p class="journal-text">${chapter.journal}</p>
        </div>
        
        ${galleryHTML}
        
        ${reflectionsHTML}
      </div>
    `;

    contentContainer.innerHTML = htmlContent;

    // Bind listeners for dynamic action buttons
    const btnBackCountry = contentContainer.querySelector('#btn-back-country');
    const btnBackCountries = contentContainer.querySelector('#btn-back-countries');
    
    if (btnBackCountry) {
      btnBackCountry.addEventListener('click', () => {
        activeCityId = null;
        activeChapterId = null;
        window.location.hash = `/countries/${activeCountryId}`;
        updateViewVisibility();
      });
    }
    
    if (btnBackCountries) {
      btnBackCountries.addEventListener('click', () => {
        showCountrySelection(true);
      });
    }

    setTimeout(() => {
      const newContent = contentContainer.querySelector('.chapter-content');
      if (newContent) {
        newContent.style.opacity = '1';
        newContent.style.transform = 'translateY(0)';
      }
    }, 50);

    const cards = contentContainer.querySelectorAll('.gallery-card:not(.placeholder)');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        openLightbox(index);
      });
    });

    if (scrollToContent && window.innerWidth <= 1024) {
      contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // --- Lightbox Functions ---
  function openLightbox(index) {
    if (currentGallery.length === 0) return;
    currentImageIndex = index;
    updateLightboxImage();
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
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
    const item = currentGallery[currentImageIndex];
    if (!item) return;
    
    lightboxImg.style.opacity = '0.5';
    lightboxImg.src = getWebpUrl(item.url);
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = '1';
    };
  }

  // --- Client-Side Routing ---
  function handleRouting() {
    let path = window.location.hash.replace(/^#/, '');
    
    if (!path && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      path = window.location.pathname;
    }

    if (!path || path === '/' || path === '/index.html') {
      showCountrySelection(false);
      return;
    }

    const parts = path.split('/').filter(Boolean); // e.g. ["countries", "switzerland", "geneva"]
    
    if (parts[0] === 'countries') {
      const countryId = parts[1];
      const cityId = parts[2];
      
      if (countryId) {
        const country = TRAVEL_DATA.countries.find(c => c.id === countryId);
        if (country) {
          activeCountryId = countryId;
          renderCityGrid();
          
          if (cityId) {
            const city = country.cities.find(c => c.id === cityId);
            if (city) {
              activeCityId = cityId;
              
              if (city.chapters && city.chapters.length > 0) {
                activeChapterId = city.chapters[0].id;
              } else {
                activeChapterId = null;
              }
              
              // Load Hero elements
              if (city.heroImage) {
                heroSection.style.backgroundImage = `url('${getWebpUrl(city.heroImage)}')`;
              }
              heroTitleText.textContent = city.name;
              heroTaglineText.textContent = `${country.flag} ${city.name} Travelogue`;
              heroLeadText.textContent = city.introduction;

              // Stats
              statCountry.innerHTML = `<i class="fa-solid fa-earth-americas"></i> ${country.name}`;
              statCity.innerHTML = `<i class="fa-solid fa-city"></i> ${city.name}`;
              statDays.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${city.duration}`;

              renderSidebar();
              if (activeChapterId) {
                loadChapter(activeChapterId, false);
              }
            } else {
              activeCityId = null;
            }
          } else {
            activeCityId = null;
            
            // Hero details for Country Selection
            if (country.coverImage) {
              heroSection.style.backgroundImage = `url('${getWebpUrl(country.coverImage)}')`;
            }
            heroTitleText.textContent = country.name;
            heroTaglineText.textContent = `${country.flag} Explore My Travels`;
            heroLeadText.textContent = country.tagline;
          }
          updateViewVisibility();
        } else {
          showCountrySelection(false);
        }
      } else {
        showCountrySelection(false);
      }
    } else {
      showCountrySelection(false);
    }
  }

  // --- Listeners Setup ---
  function setupEventListeners() {
    // Theme Switcher
    themeToggle.addEventListener('click', toggleTheme);

    // Back to Countries/Cities Button
    backToCountriesBtn.addEventListener('click', () => {
      if (activeCityId !== null) {
        activeCityId = null;
        activeChapterId = null;
        window.location.hash = `/countries/${activeCountryId}`;
        updateViewVisibility();
      } else if (activeCountryId !== null) {
        showCountrySelection(true);
      }
    });

    headerLogoHome.addEventListener('click', (e) => {
      e.preventDefault();
      if (activeCountryId !== null || activeCityId !== null) {
        showCountrySelection(true);
      }
    });

    // Hashchange listener for SPA routing
    window.addEventListener('hashchange', handleRouting);

    // Event delegation for sidebar chapters selection
    chapterList.addEventListener('click', (e) => {
      const button = e.target.closest('.chapter-btn');
      if (button) {
        const chapterId = button.dataset.id;
        if (activeChapterId !== chapterId) {
          switchChapter(chapterId);
        }
      }
    });

    // Event delegation for country card selection
    countryGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.country-card');
      if (card) {
        selectCountry(card.dataset.id);
      }
    });

    // Event delegation for city card selection
    cityGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.city-card');
      if (card) {
        selectCity(card.dataset.id);
      }
    });

    // Close Auth overlay to skip login
    authCloseBtn.addEventListener('click', () => {
      isLoginSkipped = true;
      authOverlay.classList.add('hidden');
      updateViewVisibility();
    });

    // Show Auth overlay when clicking Sign In header button
    loginBtn.addEventListener('click', () => {
      isLoginSkipped = false;
      authOverlay.classList.remove('hidden');
      clearAuthMessage();
    });

    // Auth Form Tab Toggling
    tabSignin.addEventListener('click', () => {
      tabSignin.classList.add('active');
      tabSignup.classList.remove('active');
      signinForm.classList.add('active');
      signupForm.classList.remove('active');
      clearAuthMessage();
    });

    tabSignup.addEventListener('click', () => {
      tabSignup.classList.add('active');
      tabSignin.classList.remove('active');
      signupForm.classList.add('active');
      signinForm.classList.remove('active');
      clearAuthMessage();
    });

    // Form Submissions
    signinForm.addEventListener('submit', handleSignIn);
    signupForm.addEventListener('submit', handleSignUp);

    // Logout
    logoutBtn.addEventListener('click', handleSignOut);

    // Header Scroll Indicator
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    });

    // Lightbox Close
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Lightbox Nav
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      nextImage();
    });
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      prevImage();
    });

    // Keyboard Nav for Lightbox
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
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
