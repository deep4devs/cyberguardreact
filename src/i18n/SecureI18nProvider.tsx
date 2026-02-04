import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n, secureT } from './config';
import DOMPurify from 'dompurify';

/**
 * Security-hardened i18n provider with XSS protection
 */
export const SecureI18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Security check: validate language code format
    const lang = i18n.language;
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(lang)) {
      console.error('Security: Invalid language code detected', lang);
      i18n.changeLanguage('en');
    }
    
    // Set HTML lang attribute securely
    const cleanLang = DOMPurify.sanitize(lang, {
      ALLOWED_ATTR: [],
      FORBID_TAGS: ['*']
    });
    document.documentElement.lang = cleanLang.substring(0, 2);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

/**
 * Secure translation hook with XSS protection
 */
export const useSecureTranslation = () => {
  return {
    t: secureT,
    i18n,
    language: i18n.language.split('-')[0] // Return only base language (en/es)
  };
};
