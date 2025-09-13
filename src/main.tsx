import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {AuthProvider} from "./contexts/authContext";
import {ProdexProvider} from "./contexts/productContext/Prodex.tsx";
import {DayProvider, MonthProvider, YearProvider} from "./contexts/calendar/CalendarContext.tsx";
import {
    ShowCoorpCreateRemoveProvider,
    ShowCoorpCreateSalesProvider,
    ShowPrivCreateRemoveProvider,
    ShowPrivCreateSalesProvider
} from "./contexts/windowContext/privSaleContext.tsx";
import {
    ShowAllSaleProvider,
    ShowCoorpSaleProvider,
    ShowPrivateSaleProvider
} from "./contexts/windowContext/typeOfDash.tsx";

createRoot(document.getElementById('root')!).render(

      <ProdexProvider>
          <ShowPrivateSaleProvider>
              <ShowCoorpSaleProvider>
                  <ShowAllSaleProvider>
          <ShowPrivCreateSalesProvider>
              <ShowPrivCreateRemoveProvider>
                  <ShowCoorpCreateSalesProvider>
                      <ShowCoorpCreateRemoveProvider>
            <AuthProvider>
                <YearProvider>
                    <MonthProvider>
                        <DayProvider>
                        <App />
                        </DayProvider>
                    </MonthProvider>
                </YearProvider>
            </AuthProvider>
                      </ShowCoorpCreateRemoveProvider>
                  </ShowCoorpCreateSalesProvider>
              </ShowPrivCreateRemoveProvider>
          </ShowPrivCreateSalesProvider>
                  </ShowAllSaleProvider>
              </ShowCoorpSaleProvider>
              </ShowPrivateSaleProvider>
      </ProdexProvider>

)
