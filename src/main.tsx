import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import Providers from './components/ThemeProviders.tsx'
//import './index.css';
import App from './App.tsx';
//import 'bootswatch/dist/lux/bootstrap.min.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <App />

  </StrictMode>,
)
