
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import DOMPurify from 'dompurify';

// Security-hardened translation function
const secureT = (key: string, options: any = {}) => {
  let translation = i18n.t(key, options);
  
  // Sanitize all translations to prevent XSS
  if (typeof translation === 'string') {
    translation = DOMPurify.sanitize(translation, {
      ALLOWED_TAGS: [], // No HTML allowed in translations by default
      FORBID_ATTR: ['style', 'onerror', 'onload', 'src', 'href']
    });
  }
  
  return translation;
};

// Language resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.nist': 'NIST Framework',
      'nav.iso': 'ISO 27001 Resources',
      'nav.services': 'Cybersecurity Services',
      'nav.about': 'About Us',
      'nav.contact': 'Contact',
      'nav.logout': 'Secure Logout',
      
      // NIST Submenu
      'nav.nist.identify': 'Identify',
      'nav.nist.protect': 'Protect',
      'nav.nist.detect': 'Detect',
      'nav.nist.respond': 'Respond',
      'nav.nist.recover': 'Recover',
      
      // ISO Submenu
      'nav.iso.policy': 'Security Policy',
      'nav.iso.org': 'Organization of ISMS',
      'nav.iso.human': 'Human Resource Security',
      'nav.iso.asset': 'Asset Management',
      'nav.iso.access': 'Access Control',
      
      // Services
      'nav.services.risk': 'Risk Assessment',
      'nav.services.audit': 'Security Auditing',
      'nav.services.pentest': 'Penetration Testing',
      'nav.services.training': 'Security Training',
      'nav.services.incident': 'Incident Response',
      
      // General
      'security.secure': 'SECURE',
      'app.title': 'CyberGuard - Advanced Cybersecurity Services'
    }
  },
  es: {
    translation: {
      // Navigation
      'nav.home': 'Inicio',
      'nav.nist': 'Marco NIST',
      'nav.iso': 'Recursos ISO 27001',
      'nav.services': 'Servicios de Ciberseguridad',
      'nav.about': 'Sobre Nosotros',
      'nav.contact': 'Contacto',
      'nav.logout': 'Cerrar Sesión Segura',
      
      // NIST Submenu
      'nav.nist.identify': 'Identificar',
      'nav.nist.protect': 'Proteger',
      'nav.nist.detect': 'Detectar',
      'nav.nist.respond': 'Responder',
      'nav.nist.recover': 'Recuperar',
      
      // ISO Submenu
      'nav.iso.policy': 'Política de Seguridad',
      'nav.iso.org': 'Organización del SGSI',
      'nav.iso.human': 'Seguridad de Recursos Humanos',
      'nav.iso.asset': 'Gestión de Activos',
      'nav.iso.access': 'Control de Acceso',
      
      // Services
      'nav.services.risk': 'Evaluación de Riesgos',
      'nav.services.audit': 'Auditoría de Seguridad',
      'nav.services.pentest': 'Pentesting',
      'nav.services.training': 'Capacitación en Seguridad',
      'nav.services.incident': 'Respuesta a Incidentes',
      
      // General
      'security.secure': 'SEGURO',
      'app.title': 'CyberGuard - Servicios Avanzados de Ciberseguridad'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
      format: (value, format) => {
        if (format === 'secure') {
          return DOMPurify.sanitize(value.toString());
        }
        return value;
      }
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export { i18n, secureT };

// At the bottom of the file


