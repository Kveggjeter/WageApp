import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {AuthProvider} from "./contexts/authContext";
import {ProdexProvider} from "./contexts/productContext/Prodex.tsx";
import {DayProvider, MonthProvider, YearProvider} from "./contexts/calendar/CalendarContext.tsx";
import {ShowRemoveProvider, ShowSalgProvider} from "./contexts/windowContext/privSaleContext.tsx";

createRoot(document.getElementById('root')!).render(

      <ProdexProvider>
          <ShowSalgProvider>
              <ShowRemoveProvider>
            <AuthProvider>
                <YearProvider>
                    <MonthProvider>
                        <DayProvider>
                        <App />
                        </DayProvider>
                    </MonthProvider>
                </YearProvider>
            </AuthProvider>
              </ShowRemoveProvider>
          </ShowSalgProvider>
      </ProdexProvider>

)
