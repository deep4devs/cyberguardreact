import { useSecureTranslation } from '../i18n/SecureI18nProvider';

export const ContactSection = () => {
  const { t } = useSecureTranslation();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md" 
             style={{ borderColor: '#2D4A77', borderWidth: '1px' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: '#1A2B48' }}>
            {t('nav.contact')}
          </h2>
          
          <p className="text-gray-600 mb-6" style={{ color: '#5C7699' }}>
            {t('nav.contact')} {t('app.title')}
          </p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1A2B48' }}>
                {t('nav.name')}
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#2D4A77',
                  color: '#1A2B48',
                  backgroundColor: 'rgba(45, 74, 119, 0.05)',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1A2B48' }}>
                {t('nav.email')}
              </label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#2D4A77',
                  color: '#1A2B48',
                  backgroundColor: 'rgba(45, 74, 119, 0.05)',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1A2B48' }}>
                {t('nav.message')}
              </label>
              <textarea 
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#2D4A77',
                  color: '#1A2B48',
                  backgroundColor: 'rgba(45, 74, 119, 0.05)',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="px-6 py-2 rounded-md font-medium transition-colors"
              style={{ 
                backgroundColor: '#0D1522',
                color: '#FFFFFF'
              }}
            >
              {t('nav.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
