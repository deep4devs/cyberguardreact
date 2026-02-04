import { useSecureTranslation } from '../i18n/SecureI18nProvider';

export const Footer = () => {
  const { t } = useSecureTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8" style={{ backgroundColor: '#1A2B48' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#5C7699"
                strokeWidth="2"
                className="mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-white font-bold">
                CyberGuard <span style={{ 
                  backgroundColor: '#0D1522',
                  color: '#FFFFFF',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '6px',
                  fontSize: '0.75em'
                }}>{t('security.secure')}</span>
              </span>
            </div>
          </div>
          
          <div className="text-center text-gray-400 mb-4 md:mb-0">
            <p dangerouslySetInnerHTML={{ 
              __html: t('footer.copyright', { year: currentYear }) 
            }}></p>
          </div>
          
          <div className="text-center text-gray-400">
            <p dangerouslySetInnerHTML={{ 
              __html: t('footer.confidential') 
            }}></p>
          </div>
        </div>
      </div>
    </footer>
  );
};
