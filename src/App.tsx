import { BrowserRouter } from 'react-router-dom'
import { i18n } from './i18n/config'
import { I18nextProvider } from 'react-i18next'
import { SecureCyberNavigation as CybersecurityNavigation } from './components/SecureCyberNavigation'
import { SecurityHubInfo } from './components/SecurityHubInfo'
import { SecurityServices } from './components/SecurityServices'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'




function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <CybersecurityNavigation />
        <main>
          <SecurityHubInfo />
          <SecurityServices />
          <ContactSection />
        </main>
        <Footer />
      </BrowserRouter>
    </I18nextProvider>
  )
}

export default App
