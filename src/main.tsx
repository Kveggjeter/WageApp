import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {AuthProvider} from "./contexts/authContext";
import {ProdexProvider} from "./contexts/productContext/Prodex.tsx";
import {SalesProvider} from "./contexts/productContext/SalesContext.tsx";
import {MonthProvider, YearProvider} from "./contexts/calendar/CalendarContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ProdexProvider>
          <SalesProvider>
            <AuthProvider>
                <YearProvider>
                    <MonthProvider>
                        <App />
                    </MonthProvider>
                </YearProvider>
            </AuthProvider>
          </SalesProvider>
      </ProdexProvider>
  </StrictMode>,
)
