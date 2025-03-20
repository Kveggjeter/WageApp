import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {AuthProvider} from "./contexts/authContext";
import {ProdexProvider} from "./contexts/productContext/Prodex.tsx";
import {SalesProvider} from "./contexts/productContext/SalesContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ProdexProvider>
          <SalesProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
          </SalesProvider>
      </ProdexProvider>
  </StrictMode>,
)
