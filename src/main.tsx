import { createRoot } from 'react-dom/client'
import Routers from './app/Routers.tsx'
import './app/styles/index.css'

createRoot(document.getElementById('root')!).render(
    <Routers />
)
