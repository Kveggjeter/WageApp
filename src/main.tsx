import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {AuthProvider} from "./contexts/authContext";
import {ProdexProvider} from "./contexts/productContext/Prodex.tsx";
import {MonthProvider, YearProvider} from "./contexts/calendar/CalendarContext.tsx";

createRoot(document.getElementById('root')!).render(

      <ProdexProvider>
            <AuthProvider>
                <YearProvider>
                    <MonthProvider>
                        <App />
                    </MonthProvider>
                </YearProvider>
            </AuthProvider>
      </ProdexProvider>

)
