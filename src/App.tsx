import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Play, X, Star, Info, ChevronRight, ChevronLeft, Menu, Globe, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { movies } from './data';
import { Movie, Category } from './types';

type Language = 'ru' | 'en' | 'uz';

const translations = {
  ru: {
    language: 'Язык',
    home: 'Главная',
    action: 'Боевик',
    comedy: 'Комедия',
    drama: 'Драма',
    sciFi: 'Фантастика',
    searchPlaceholder: 'Названия, люди, жанры',
    featured: 'Рекомендуемое',
    play: 'Смотреть',
    moreInfo: 'Подробнее',
    trending: 'Сейчас в тренде',
    exploreAll: 'Смотреть все',
    searchResults: 'Результаты поиска для',
    noMovies: 'Фильмы не найдены.',
    clearFilters: 'Сбросить фильтры',
    match: 'Совпадение',
    cast: 'В ролях',
    genres: 'Жанры',
    movieIs: 'Этот фильм:',
    exciting: 'Захватывающий, Эмоциональный, Шедевр',
    login: 'Войти',
    register: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    submit: 'Подтвердить',
    noAccount: 'Нет аккаунта?',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    signIn: 'Авторизация',
    signUp: 'Создать аккаунт',
    footer: {
      audio: 'Аудиодескрипция',
      help: 'Центр поддержки',
      gift: 'Подарочные карты',
      media: 'Медиацентр',
      investor: 'Для инвесторов',
      jobs: 'Вакансии',
      terms: 'Условия использования',
      privacy: 'Конфиденциальность',
      legal: 'Юридические уведомления',
      cookies: 'Настройки файлов cookie',
      corporate: 'Корпоративная информация',
      contact: 'Связаться с нами',
      copyright: '© 2026 MATRIUZON, Inc. Создано для развлечения.'
    }
  },
  en: {
    language: 'Language',
    home: 'Home',
    action: 'Action',
    comedy: 'Comedy',
    drama: 'Drama',
    sciFi: 'Sci-Fi',
    searchPlaceholder: 'Titles, people, genres',
    featured: 'Featured Movie',
    play: 'Play',
    moreInfo: 'More Info',
    trending: 'Trending Now',
    exploreAll: 'Explore All',
    searchResults: 'Search results for',
    noMovies: 'No movies found matching your criteria.',
    clearFilters: 'Clear all filters',
    match: 'Match',
    cast: 'Cast',
    genres: 'Genres',
    movieIs: 'This movie is:',
    exciting: 'Exciting, Emotional, Masterpiece',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    submit: 'Submit',
    noAccount: 'No account?',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    footer: {
      audio: 'Audio Description',
      help: 'Help Center',
      gift: 'Gift Cards',
      media: 'Media Center',
      investor: 'Investor Relations',
      jobs: 'Jobs',
      terms: 'Terms of Use',
      privacy: 'Privacy',
      legal: 'Legal Notices',
      cookies: 'Cookie Preferences',
      corporate: 'Corporate Information',
      contact: 'Contact Us',
      copyright: '© 2026 MATRIUZON, Inc. Built for entertainment.'
    }
  },
  uz: {
    language: 'Til',
    home: 'Bosh sahifa',
    action: 'Jangari',
    comedy: 'Komediya',
    drama: 'Drama',
    sciFi: 'Fantastika',
    searchPlaceholder: 'Nomlar, odamlar, janrlar',
    featured: 'Tavsiya etiladi',
    play: 'Koʻrish',
    moreInfo: 'Batafsil',
    trending: 'Hozir trendda',
    exploreAll: 'Hammasini koʻrish',
    searchResults: 'Qidiruv natijalari:',
    noMovies: 'Filmlar topilmadi.',
    clearFilters: 'Filtrlarni tozalash',
    match: 'Moslik',
    cast: 'Rollarda',
    genres: 'Janrlar',
    movieIs: 'Ushbu film:',
    exciting: 'Hayajonli, hissiyotli, durdona',
    login: 'Kirish',
    register: 'Roʻyxatdan oʻtish',
    email: 'Elektron pochta',
    password: 'Parol',
    submit: 'Tasdiqlash',
    noAccount: 'Hisobingiz yoʻqmi?',
    alreadyHaveAccount: 'Hisobingiz bormi?',
    signIn: 'Kirish',
    signUp: 'Roʻyxatdan oʻtish',
    footer: {
      audio: 'Audio tavsif',
      help: 'Yordam markazi',
      gift: 'Sovgʻa kartalari',
      media: 'Media markazi',
      investor: 'Investorlar uchun',
      jobs: 'Boʻsh ish oʻrinlari',
      terms: 'Foydalanish shartlari',
      privacy: 'Maxfiylik',
      legal: 'Yuridik bildirishnomalar',
      cookies: 'Cookie sozlamalari',
      corporate: 'Korporativ maʼlumotlar',
      contact: 'Biz bilan bogʻlanish',
      copyright: '© 2026 MATRIUZON, Inc. Koʻngilochar uchun yaratilgan.'
    }
  }
};

const categoryMap: Record<Category, { ru: string; en: string; uz: string }> = {
  'Action': { ru: 'Боевик', en: 'Action', uz: 'Jangari' },
  'Comedy': { ru: 'Комедия', en: 'Comedy', uz: 'Komediya' },
  'Drama': { ru: 'Драма', en: 'Drama', uz: 'Drama' },
  'Sci-Fi': { ru: 'Фантастика', en: 'Sci-Fi', uz: 'Fantastika' }
};

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [dbMovies, setDbMovies] = useState<Movie[]>([]);

  const allMovies = useMemo(() => {
    // Combine static movies with database movies
    const combined = [...movies];
    dbMovies.forEach(dbMovie => {
      if (!combined.find(m => m.id === dbMovie.id)) {
        combined.push(dbMovie);
      }
    });
    return combined;
  }, [dbMovies]);

  useEffect(() => {
    // Fetch user
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser({ username: data.user.username });
          setIsAuthModalOpen(false);
        }
      })
      .catch(() => {});

    // Fetch movies from DB
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mappedMovies: Movie[] = data.map((m: any) => ({
            id: `db-${m.id}`,
            title: { ru: m.title_ru, en: m.title_en, uz: m.title_uz },
            year: m.year,
            rating: parseFloat(m.rating),
            category: m.category as Category,
            description: { ru: m.description_ru, en: m.description_en, uz: m.description_uz },
            posterUrl: m.thumbnail_url || 'https://picsum.photos/seed/movie/400/600',
            backdropUrl: m.video_url || 'https://picsum.photos/seed/movie/1920/1080',
            trailerUrl: m.video_url || '',
            cast: []
          }));
          setDbMovies(mappedMovies);
        }
      })
      .catch(err => console.error('Failed to fetch movies:', err));
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const endpoint = authMode === 'login' ? '/api/login' : '/api/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setAuthError(data.error || 'Something went wrong');
        return;
      }
      
      if (authMode === 'login') {
        setUser({ email: data.username });
        setIsAuthModalOpen(false);
      } else {
        setAuthMode('login');
        setAuthError('Registration successful! Please login.');
      }
    } catch (err) {
      setAuthError('Failed to connect to server');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
  };

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const featuredMovies = allMovies.slice(0, 5);

  useEffect(() => {
    if (isPlayingTrailer || featuredMovies.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isPlayingTrailer, featuredMovies.length]);

  const nextSlide = () => {
    setIsPlayingTrailer(false);
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setIsPlayingTrailer(false);
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const t = translations[lang];
  const categories: Category[] = ['Action', 'Comedy', 'Drama', 'Sci-Fi'];

  const filteredMovies = useMemo(() => {
    return allMovies.filter(movie => {
      const title = movie.title[lang].toLowerCase();
      const matchesSearch = title.includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? movie.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, lang, allMovies]);

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
    { code: 'uz', label: 'Oʻzbekcha' }
  ];

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-red-600 selection:text-white ${
      theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'
    }`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm px-6 py-4 flex items-center justify-between transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-gradient-to-b from-white/80 to-transparent'
      }`}>
        <div className="flex items-center gap-8">
          <h1 
            className="text-3xl font-black text-red-600 tracking-tighter cursor-pointer"
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
              setSelectedMovie(null);
            }}
          >
            MATRIUZON
          </h1>
          <div className={`hidden md:flex items-center gap-6 text-sm font-medium transition-colors ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`hover:text-red-600 transition-colors ${!selectedCategory ? (theme === 'dark' ? 'text-white' : 'text-black') : ''}`}
            >
              {t.home}
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`hover:text-red-600 transition-colors ${selectedCategory === cat ? (theme === 'dark' ? 'text-white' : 'text-black') : ''}`}
              >
                {categoryMap[cat][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Switcher - Mobile (exactly between logo and right side) */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`md:hidden p-2 rounded-full transition-colors ${
            theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'
          }`}
        >
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative group hidden sm:block">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
              theme === 'dark' ? 'text-gray-400 group-focus-within:text-white' : 'text-gray-500 group-focus-within:text-black'
            }`} />
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              className={`rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50 w-40 md:w-64 transition-all ${
                theme === 'dark' ? 'bg-black/40 border border-white/10 text-white' : 'bg-gray-100 border border-black/10 text-black'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
       {/* Блок пользователя или входа */}
          {user ? (
  <div className="flex items-center gap-2 sm:gap-4">
    <div 
      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold uppercase bg-red-600 text-white transition-all shadow-lg border border-white/20"
      title={user.email || user.username}
    >
      {String(user.email || user.username || '?').trim().charAt(0).toUpperCase()}
    </div>

    <button 
      onClick={handleLogout}
      className="p-2 rounded-full hover:bg-red-600/10 text-red-600"
    >
      <LogOut className="w-5 h-5" />
    </button>
  </div>
) : (
  <button 
    onClick={() => {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    }}
    className={`p-2 rounded-full transition-colors ${
      theme === 'dark'
        ? 'text-white hover:bg-white/10'
        : 'text-black hover:bg-black/10'
    }`}
    title={t.login}
  >
    <LogIn className="w-6 h-6" />
  </button>
)}
            /* Кнопка входа для неавторизованных */
            <button 
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'
              }`}
              title={t.login}
            >
              <LogIn className="w-6 h-6" />
            </button>
          )}
          {/* Theme Switcher - Desktop */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`hidden md:flex p-2 rounded-full transition-colors ${
              theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'
            }`}
          >
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                theme === 'dark' ? 'bg-white/10 hover:bg-white/20 border-white/10 text-white' : 'bg-black/10 hover:bg-black/20 border-black/10 text-black'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden xs:inline">{t.language}: {lang.toUpperCase()}</span>
              <span className="xs:hidden">{lang.toUpperCase()}</span>
            </button>
            
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 mt-2 w-32 border rounded-lg overflow-hidden shadow-2xl ${
                    theme === 'dark' ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10'
                  }`}
                >
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        theme === 'dark' ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-700'
                      } ${lang === l.code ? 'text-red-500 font-bold' : ''}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className={`md:hidden p-2 rounded-full ${theme === 'dark' ? 'text-white' : 'text-black'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 pt-24 px-6 md:hidden ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            <div className="flex flex-col gap-6 text-2xl font-bold">
              <button onClick={() => { setSelectedCategory(null); setIsMenuOpen(false); }}>{t.home}</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => { setSelectedCategory(cat); setIsMenuOpen(false); }}>{categoryMap[cat][lang]}</button>
              ))}
              <div className={`pt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-600 text-white font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-6 h-6" /> {t.login}
                  </button>
                  <button 
                    onClick={() => {
                      setAuthMode('register');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-white/10 text-white font-bold py-4 rounded-lg text-lg border border-white/10"
                  >
                    {t.register}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-0">
        {/* Hero Carousel */}
        {!selectedCategory && !searchQuery && (
          <section 
            className="relative h-[85vh] w-full overflow-hidden bg-black"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                {isPlayingTrailer ? (
                  <div className="absolute inset-0 w-full h-full bg-black">
                    <iframe 
                      src={`${featuredMovies[currentSlide].trailerUrl}?autoplay=1&mute=0&controls=1`}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      title="Trailer"
                    />
                    <button 
                      onClick={() => setIsPlayingTrailer(false)}
                      className="absolute top-24 right-12 z-20 bg-black/50 hover:bg-black/80 p-3 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ) : (
                  <>
                    <img 
                      src={featuredMovies[currentSlide].backdropUrl} 
                      alt={featuredMovies[currentSlide].title[lang]}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    
                    <div className="absolute bottom-24 left-6 md:left-12 max-w-2xl z-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="inline-block px-2 py-1 bg-red-600 text-[10px] font-bold uppercase tracking-widest mb-4 rounded-sm">
                          {t.featured}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic text-white">
                          {featuredMovies[currentSlide].title[lang]}
                        </h2>
                        <div className="flex items-center gap-4 mb-6 text-sm font-medium text-gray-300">
                          <span className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" /> {featuredMovies[currentSlide].rating}
                          </span>
                          <span>{featuredMovies[currentSlide].year}</span>
                          <span className="border border-white/20 px-2 rounded text-xs uppercase">
                            {categoryMap[featuredMovies[currentSlide].category][lang]}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                          <button 
                            onClick={() => setIsPlayingTrailer(true)}
                            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-white/90 transition-colors"
                          >
                            <Play className="w-5 h-5 fill-current" /> {t.play}
                          </button>
                          <button 
                            onClick={() => setSelectedMovie(featuredMovies[currentSlide])}
                            className="flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-md font-bold hover:bg-white/30 transition-colors backdrop-blur-md"
                          >
                            <Info className="w-5 h-5" /> {t.moreInfo}
                          </button>
                        </div>
                        <p className="text-lg text-gray-300 line-clamp-3 leading-relaxed">
                          {featuredMovies[currentSlide].description[lang]}
                        </p>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            {!isPlayingTrailer && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/50 rounded-full transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/50 rounded-full transition-colors backdrop-blur-sm"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-8 right-12 z-20 flex gap-2">
                  {featuredMovies.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsPlayingTrailer(false);
                        setCurrentSlide(idx);
                      }}
                      className={`h-1 transition-all duration-300 rounded-full ${currentSlide === idx ? 'w-8 bg-red-600' : 'w-4 bg-white/30'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        )}
        {/* Movie Grid */}
        <section className={`px-6 md:px-12 py-12 ${(!selectedCategory && !searchQuery) ? '-mt-24 relative z-10' : 'pt-32'}`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {searchQuery ? `${t.searchResults} "${searchQuery}"` : (selectedCategory ? categoryMap[selectedCategory][lang] : t.trending)}
            </h3>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 shadow-2xl">
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Play className="w-6 h-6 fill-current text-white" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white">{t.play}</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 text-white">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" /> {movie.rating}
                    </div>
                  </div>
                  <h4 className={`font-bold text-sm line-clamp-1 group-hover:text-red-500 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>{movie.title[lang]}</h4>
                  <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{categoryMap[movie.category][lang]}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-gray-500 text-lg">{t.noMovies}</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                className="mt-4 text-red-500 font-bold hover:underline"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className={`px-6 md:px-12 py-12 border-t text-sm transition-colors ${
        theme === 'dark' ? 'border-white/5 text-gray-500' : 'border-black/5 text-gray-600'
      }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col gap-3">
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.audio}</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.help}</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.gift}</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.media}</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.investor}</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.jobs}</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.terms}</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.privacy}</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.legal}</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.cookies}</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.corporate}</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>{t.footer.contact}</a>
          </div>
        </div>
        <p className="text-xs">{t.footer.copyright}</p>
      </footer>

      {/* Movie Details Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#141414] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMovie(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <iframe 
                  src={`${selectedMovie.trailerUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${selectedMovie.trailerUrl.split('/').pop()}`}
                  className="w-full h-full pointer-events-none"
                  allow="autoplay; encrypted-media"
                  title="Trailer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12">
                  <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
                    {selectedMovie.title[lang]}
                  </h2>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-white/90 transition-colors">
                      <Play className="w-5 h-5 fill-current" /> {t.play}
                    </button>
                    <button className="p-3 border-2 border-white/20 rounded-full hover:bg-white/10 transition-colors">
                      <Star className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-12 grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-6 text-sm font-bold">
                    <span className="text-green-500">98% {t.match}</span>
                    <span className="text-gray-400">{selectedMovie.year}</span>
                    <span className="border border-gray-600 px-2 rounded text-[10px]">HD</span>
                    <span className="border border-gray-600 px-2 rounded text-[10px]">5.1</span>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {selectedMovie.description[lang]}
                  </p>
                </div>
                <div>
                  <div className="mb-6">
                    <span className="text-gray-500 text-sm block mb-1">{t.cast}:</span>
                    <p className="text-sm text-gray-300">{selectedMovie.cast.join(', ')}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-gray-500 text-sm block mb-1">{t.genres}:</span>
                    <p className="text-sm text-gray-300">{categoryMap[selectedMovie.category][lang]}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block mb-1">{t.movieIs}</span>
                    <p className="text-sm text-gray-300">{t.exciting}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => {
              // Only allow closing if user is logged in or if we don't want to force it
              // But the user said "show registration first", so maybe they want to force it?
              // I'll allow closing for now but keep it open by default.
              setIsAuthModalOpen(false);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-md rounded-2xl p-8 shadow-2xl relative border ${
                theme === 'dark' ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-black/10 text-black'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsAuthModalOpen(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-3xl font-black mb-8 tracking-tight">
                {authMode === 'login' ? t.signIn : t.signUp}
              </h2>

              <form className="space-y-4" onSubmit={handleAuthSubmit}>
                {authError && (
                  <p className="text-red-500 text-xs font-bold text-center">{authError}</p>
                )}
                <div>
  <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${
    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
  }`}>
    Email
  </label>

  <input 
    type="email"
    required
    value={authForm.email}
    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50 ${
      theme === 'dark'
        ? 'bg-white/5 border-white/10 text-white'
        : 'bg-gray-50 border-black/10 text-black'
    }`}
    placeholder="example@gmail.com"
  />
</div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {t.password}
                  </label>
                  <input 
                    type="password" 
                    required
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                  {t.submit}
                </button>
              </form>

              <div className={`mt-8 pt-6 border-t text-center ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                <p className="text-sm text-gray-500">
                  {authMode === 'login' ? t.noAccount : t.alreadyHaveAccount}{' '}
                  <button 
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className={`font-bold hover:underline ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                  >
                    {authMode === 'login' ? t.register : t.login}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
