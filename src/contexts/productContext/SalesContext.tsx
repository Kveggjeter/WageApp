import {SalesContextProps} from "../../assets/type/SalesContextProps.ts";
import {createContext, useContext, useState} from "react";

const SalgContext = createContext<SalesContextProps>({
    sales: [],
    setSales: () => {},
})

export function SalesProvider({ children }: { children: React.ReactNode }) {
    const [sales, setSales] = useState<{ produkt: [string, number][], mersalg: [string, number][] }[]>([]);

    return (
        <SalgContext.Provider value={{ sales, setSales }}>
        {children}
    </SalgContext.Provider>
    )
}

export function useSales() {
    return useContext(SalgContext);
}