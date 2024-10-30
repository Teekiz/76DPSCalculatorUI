import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProviderComponent from "./Theme.tsx";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProviderComponent>
          <App />
      </ThemeProviderComponent>
  </StrictMode>,
)
