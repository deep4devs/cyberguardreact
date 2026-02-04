import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SecureI18nProvider } from './i18n/SecureI18nProvider';
import { SecureCyberNavigation } from './components/SecureCyberNavigation';
import './index.css';

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <SecureI18nProvider>
          <div className="min-h-screen bg-gray-50">
            <SecureCyberNavigation />
            {/* Your application content */}
            <main className="container mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold text-gray-800">Advanced Cybersecurity Services</h1>
              <p className="mt-4 text-gray-600">Professional security solutions based on NIST and ISO 27001 frameworks</p>
            </main>
          </div>
        </SecureI18nProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);

import { SecureCyberNavigation } from './components/SecureCyberNavigation';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SecureCyberNavigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800">You should see the navigation menu above this text</h1>
      </main>
    </div>
  );
}

