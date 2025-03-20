import {SalesContextProps} from "../../assets/type/SalesContextProps.ts";
import {createContext, useContext, useState} from "react";
import {SaleProp} from "../../assets/type/SaleProp.ts";

const SalgContext = createContext<SalesContextProps>({
    sales: [],
    setSales: () => {},
})

export function SalesProvider({ children }: { children: React.ReactNode }) {
    const [sales, setSales] = useState<SaleProp[]>([]);

    return (
        <SalgContext.Provider value={{ sales, setSales }}>
        {children}
    </SalgContext.Provider>
    )
}

export function useSales() {
    return useContext(SalgContext);
}