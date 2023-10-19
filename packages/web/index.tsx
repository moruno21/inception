import './config/i18n'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from 'shared/styles/global'
import theme from 'shared/styles/theme'
import { ThemeProvider } from 'styled-components'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <>Hello World</>
  </ThemeProvider>
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
