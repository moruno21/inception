import './config/i18n'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => <>Hello World</>

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
