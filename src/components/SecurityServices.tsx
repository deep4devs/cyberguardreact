import { useSecureTranslation } from '../i18n/SecureI18nProvider';

export const SecurityServices = () => {
  const { t } = useSecureTranslation();
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ color: '#1A2B48' }}>
          {t('nav.services')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.services.risk')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.services.risk')} {t('nav.services')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.services.audit')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.services.audit')} {t('nav.services')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.services.pentest')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.services.pentest')} {t('nav.services')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.services.training')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.services.training')} {t('nav.services')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
               style={{ borderColor: '#2D4A77' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1A2B48' }}>
              {t('nav.services.incident')}
            </h3>
            <p className="text-gray-600" style={{ color: '#5C7699' }}>
              {t('nav.services.incident')} {t('nav.services')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
