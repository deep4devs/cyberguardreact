import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { CybersecurityNavigation } from './components/CybersecurityNavigation'
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
