import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PostList from './PostList.tsx'
import Providers from './components/ThemeProviders.tsx'
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <PostList />
    </Providers>
  </StrictMode>,
)
