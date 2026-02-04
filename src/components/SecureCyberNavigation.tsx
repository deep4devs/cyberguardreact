import { useState, useEffect, useRef } from 'react';
import { useSecureTranslation } from '../i18n/SecureI18nProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './navigation.css'; // Critical: import the CSS

export const SecureCyberNavigation = () => {
  const { t, language } = useSecureTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mainMenuRef = useRef<HTMLUListElement>(null);

  // Security hardening: Prevent clickjacking
  useEffect(() => {
    if (window.self !== window.top) {
      console.error('Security: Attempted to load in iframe - terminating');
      document.documentElement.innerHTML = '';
      window.location.href = 'about:blank';
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns when clicking elsewhere
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (mainMenuRef.current && !mainMenuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Sanitize navigation paths
  const safeNavigate = (path: string) => {
    // Basic path sanitization
    const cleanPath = DOMPurify.sanitize(path, {
      ALLOWED_URI_REGEXP: /^(\/|https:\/\/yourdomain\.com)/
    });
    
    // Validate path format
    if (!/^[a-zA-Z0-9\-/_]+$/.test(cleanPath)) {
      console.error('Security: Invalid navigation path attempted', cleanPath);
      return;
    }
    
    navigate(cleanPath);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Toggle dropdown menus securely
  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  // Language toggle handler
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  // NIST Framework menu items
  const nistItems = [
    { path: '/nist/identify', label: t('nav.nist.identify') },
    { path: '/nist/protect', label: t('nav.nist.protect') },
    { path: '/nist/detect', label: t('nav.nist.detect') },
    { path: '/nist/respond', label: t('nav.nist.respond') },
    { path: '/nist/recover', label: t('nav.nist.recover') }
  ];

  // ISO 27001 menu items
  const isoItems = [
    { path: '/iso/policy', label: t('nav.iso.policy') },
    { path: '/iso/organization', label: t('nav.iso.org') },
    { path: '/iso/human-resources', label: t('nav.iso.human') },
    { path: '/iso/asset-management', label: t('nav.iso.asset') },
    { path: '/iso/access-control', label: t('nav.iso.access') }
  ];

  // Services menu items
  const servicesItems = [
    { path: '/services/risk-assessment', label: t('nav.services.risk') },
    { path: '/services/audit', label: t('nav.services.audit') },
    { path: '/services/pentest', label: t('nav.services.pentest') },
    { path: '/services/training', label: t('nav.services.training') },
    { path: '/services/incident-response', label: t('nav.services.incident') }
  ];

  return (
    <nav 
      className="cyber-navigation"
      aria-label={t('nav.main_menu')}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
          <div className="flex justify-between items-center">
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                safeNavigate('/');
              }}
              className="flex items-center"
              style={{ color: '#FFFFFF' }}
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#5C7699"
                strokeWidth="2"
                className="mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-xl font-bold">
                CyberGuard <span style={{ 
                  backgroundColor: '#0D1522',
                  color: '#FFFFFF',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '6px',
                  fontSize: '0.75em'
                }}>{t('security.secure')}</span>
              </span>
            </a>
            
            {/* Mobile menu button */}
            <button
              ref={mobileMenuRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C7699]"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              style={{ color: '#FFFFFF' }}
            >
              <span className="sr-only">{isMobileMenuOpen ? t('nav.close') : t('nav.open_menu')}</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul 
            ref={mainMenuRef}
            className="hidden md:flex md:items-center space-y-0 space-x-8"
            style={{ color: '#FFFFFF' }}
          >
            <li className="cyber-nav-item">
              <button
                onClick={() => safeNavigate('/')}
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                style={{
                  color: location.pathname === '/' ? '#5C7699' : 'inherit',
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal'
                }}
              >
                {t('nav.home')}
              </button>
            </li>

            {/* NIST Framework Dropdown */}
            <li className="cyber-nav-item relative">
              <button
                onClick={() => toggleDropdown('desktop-nist')}
                className="nav-link flex items-center"
                aria-expanded={activeDropdown === 'desktop-nist'}
                aria-haspopup="true"
                style={{ 
                  color: activeDropdown === 'desktop-nist' ? '#5C7699' : 'inherit',
                  fontWeight: activeDropdown === 'desktop-nist' ? 'bold' : 'normal'
                }}
              >
                {t('nav.nist')}
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'desktop-nist' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50"
                  style={{ 
                    border: '1px solid #2D4A77',
                    boxShadow: '0 4px 6px rgba(13, 21, 34, 0.1)'
                  }}
                  role="menu"
                >
                  {nistItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => safeNavigate(item.path)}
                      className="block w-full text-left px-4 py-2 hover:bg-[#2D4A77] hover:text-white transition-colors"
                      role="menuitem"
                      style={{ 
                        color: location.pathname === item.path ? '#1A2B48' : 'inherit',
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* ISO 27001 Dropdown */}
            <li className="cyber-nav-item relative">
              <button
                onClick={() => toggleDropdown('desktop-iso')}
                className="nav-link flex items-center"
                aria-expanded={activeDropdown === 'desktop-iso'}
                aria-haspopup="true"
                style={{ 
                  color: activeDropdown === 'desktop-iso' ? '#5C7699' : 'inherit',
                  fontWeight: activeDropdown === 'desktop-iso' ? 'bold' : 'normal'
                }}
              >
                {t('nav.iso')}
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'desktop-iso' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50"
                  style={{ 
                    border: '1px solid #2D4A77',
                    boxShadow: '0 4px 6px rgba(13, 21, 34, 0.1)'
                  }}
                  role="menu"
                >
                  {isoItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => safeNavigate(item.path)}
                      className="block w-full text-left px-4 py-2 hover:bg-[#2D4A77] hover:text-white transition-colors"
                      role="menuitem"
                      style={{ 
                        color: location.pathname === item.path ? '#1A2B48' : 'inherit',
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* Services Dropdown */}
            <li className="cyber-nav-item relative">
              <button
                onClick={() => toggleDropdown('desktop-services')}
                className="nav-link flex items-center"
                aria-expanded={activeDropdown === 'desktop-services'}
                aria-haspopup="true"
                style={{ 
                  color: activeDropdown === 'desktop-services' ? '#5C7699' : 'inherit',
                  fontWeight: activeDropdown === 'desktop-services' ? 'bold' : 'normal'
                }}
              >
                {t('nav.services')}
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'desktop-services' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50"
                  style={{ 
                    border: '1px solid #2D4A77',
                    boxShadow: '0 4px 6px rgba(13, 21, 34, 0.1)'
                  }}
                  role="menu"
                >
                  {servicesItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => safeNavigate(item.path)}
                      className="block w-full text-left px-4 py-2 hover:bg-[#2D4A77] hover:text-white transition-colors"
                      role="menuitem"
                      style={{ 
                        color: location.pathname === item.path ? '#1A2B48' : 'inherit',
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </li>

            <li className="cyber-nav-item">
              <button
                onClick={() => safeNavigate('/about')}
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                style={{ 
                  color: location.pathname === '/about' ? '#5C7699' : 'inherit',
                  fontWeight: location.pathname === '/about' ? 'bold' : 'normal'
                }}
              >
                {t('nav.about')}
              </button>
            </li>

            <li className="cyber-nav-item">
              <button
                onClick={() => safeNavigate('/contact')}
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                style={{ 
                  color: location.pathname === '/contact' ? '#5C7699' : 'inherit',
                  fontWeight: location.pathname === '/contact' ? 'bold' : 'normal'
                }}
              >
                {t('nav.contact')}
              </button>
            </li>

            <li className="cyber-nav-item">
              <button
                onClick={() => safeNavigate('/logout')}
                className="logout-button px-4 py-2 rounded-md transition-colors"
                style={{ 
                  backgroundColor: '#0D1522',
                  color: '#FFFFFF'
                }}
              >
                {t('nav.logout')}
              </button>
            </li>

            {/* Language Toggle */}
            <li className="cyber-nav-item">
              <button
                onClick={toggleLanguage}
                className="language-toggle px-3 py-1 rounded transition-colors"
                style={{ 
                  backgroundColor: '#2D4A77',
                  color: '#FFFFFF'
                }}
                aria-label={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              >
                {language === 'en' ? 'ES' : 'EN'}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu" 
          ref={mobileMenuRef}
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={t('nav.close')}
            style={{ color: '#FFFFFF' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <ul className="mobile-menu-items" style={{ color: '#FFFFFF' }}>
            <li className="mobile-nav-item">
              <button 
                onClick={() => safeNavigate('/')}
                className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                style={{ 
                  color: location.pathname === '/' ? '#5C7699' : 'inherit',
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal'
                }}
              >
                {t('nav.home')}
              </button>
            </li>
            
            {/* NIST Framework Mobile */}
            <li className="mobile-nav-item nist-framework">
              <button 
                className="mobile-dropdown-toggle"
                onClick={() => toggleDropdown('mobile-nist')}
                style={{ 
                  color: activeDropdown === 'mobile-nist' ? '#5C7699' : 'inherit',
                  fontWeight: activeDropdown === 'mobile-nist' ? 'bold' : 'normal'
                }}
              >
                <div className="flex justify-between items-center">
                  <span>{t('nav.nist')}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'mobile-nist' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </div>
              </button>
              
              {activeDropdown === 'mobile-nist' && (
                <ul className="mobile-submenu" style={{ backgroundColor: '#2D4A77' }}>
                  {nistItems.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => safeNavigate(item.path)}
                        className="mobile-submenu-item"
                        style={{ 
                          color: location.pathname === item.path ? '#5C7699' : 'inherit',
                          fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            
            {/* ISO 27001 Mobile */}
            <li className="mobile-nav-item iso-framework">
              <button 
                className="mobile-dropdown-toggle"
                onClick={() => toggleDropdown('mobile-iso')}
                style={{ 
                  color: activeDropdown === 'mobile-iso' ? '#5C7699' : 'inherit',
                  fontWeight: activeDropdown === 'mobile-iso' ? 'bold' : 'normal'
                }}
              >
                <div className="flex justify-between items-center">
                  <span>{t('nav.iso')}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'mobile-iso' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </div>
              </button>
              
              {activeDropdown === 'mobile-iso' && (
                <ul className="mobile-submenu" style={{ backgroundColor: '#2D4A77' }}>
                  {isoItems.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => safeNavigate(item.path)}
                        className="mobile-submenu-item"
                        style={{ 
                          color: location.pathname === item.path ? '#5C7699' : 'inherit',
                          fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            
            {/* Services Mobile */}
            <li className="mobile-nav-item services">
              <button 
                className="mobile-dropdown-toggle"
                onClick={() => toggleDropdown('mobile-services')}
                style={{ 
                  color: activeDropdown === 'mobile-services' ? '#5C7699' : 'inherit',
                  fontWeight: activeDropdown === 'mobile-services' ? 'bold' : 'normal'
                }}
              >
                <div className="flex justify-between items-center">
                  <span>{t('nav.services')}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'mobile-services' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </div>
              </button>
              
              {activeDropdown === 'mobile-services' && (
                <ul className="mobile-submenu" style={{ backgroundColor: '#2D4A77' }}>
                  {servicesItems.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => safeNavigate(item.path)}
                        className="mobile-submenu-item"
                        style={{ 
                          color: location.pathname === item.path ? '#5C7699' : 'inherit',
                          fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            
            <li className="mobile-nav-item">
              <button 
                onClick={() => safeNavigate('/about')}
                className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                style={{ 
                  color: location.pathname === '/about' ? '#5C7699' : 'inherit',
                  fontWeight: location.pathname === '/about' ? 'bold' : 'normal'
                }}
              >
                {t('nav.about')}
              </button>
            </li>
            
            <li className="mobile-nav-item">
              <button 
                onClick={() => safeNavigate('/contact')}
                className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                style={{ 
                  color: location.pathname === '/contact' ? '#5C7699' : 'inherit',
                  fontWeight: location.pathname === '/contact' ? 'bold' : 'normal'
                }}
              >
                {t('nav.contact')}
              </button>
            </li>
            
            <li className="mobile-nav-item">
              <button
                onClick={() => safeNavigate('/logout')}
                className="mobile-logout"
                style={{ 
                  backgroundColor: '#0D1522',
                  color: '#FFFFFF'
                }}
              >
                {t('nav.logout')}
              </button>
            </li>
            
            {/* Language Toggle Mobile */}
            <li className="mobile-nav-item">
              <button
                onClick={toggleLanguage}
                className="mobile-language-toggle"
                style={{ 
                  backgroundColor: '#2D4A77',
                  color: '#FFFFFF'
                }}
              >
                {language === 'en' ? 'Español' : 'English'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
