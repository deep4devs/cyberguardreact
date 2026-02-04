import { useSecureTranslation } from '../i18n/SecureI18nProvider';

export const SecurityHubInfo = () => {
  const { t } = useSecureTranslation();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ color: '#1A2B48' }}>
          {t('nav.nist')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow" 
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.nist.identify')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.nist.identify')} {t('nav.nist')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.nist.protect')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.nist.protect')} {t('nav.nist')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.nist.detect')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.nist.detect')} {t('nav.nist')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.nist.respond')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.nist.respond')} {t('nav.nist')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.nist.recover')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.nist.recover')} {t('nav.nist')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.iso')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.iso')} {t('nav.iso')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
