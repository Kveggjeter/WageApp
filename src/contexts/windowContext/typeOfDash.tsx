import {createContext, useContext, useState} from "react";
import {ShowPrivateSaleProps} from "../../assets/type/ShowPrivateSaleProps.ts";
import {ShowCoorpSaleProps} from "../../assets/type/ShowCoorpSaleProps.ts";
import {ShowAllSaleProps} from "../../assets/type/ShowAllSaleProps.ts";

const ShowPrivateSaleContext = createContext<ShowPrivateSaleProps>({
    showPrivateSale: true,
    setShowPrivateSale: () => {}
});
const ShowCoorpSaleContext = createContext<ShowCoorpSaleProps>({
    showCoorpSale: false,
    setShowCoorpSale: () => {}
})
const ShowAllSaleContext = createContext<ShowAllSaleProps>({
    showAllSale: false,
    setShowAllSale: () => {}
})

export function ShowPrivateSaleProvider({ children }:{children: React.ReactNode}) {
    const [showPrivateSale, setShowPrivateSale] = useState(true);

    return (
        <ShowPrivateSaleContext.Provider value={{ showPrivateSale, setShowPrivateSale }}>
            {children}
        </ShowPrivateSaleContext.Provider>
    )
}

export function ShowCoorpSaleProvider({ children }:{children: React.ReactNode}) {
    const [showCoorpSale, setShowCoorpSale] = useState(true);
    return (
        <ShowCoorpSaleContext.Provider value={{ showCoorpSale, setShowCoorpSale }}>
            {children}
        </ShowCoorpSaleContext.Provider>
    )
}
export function ShowAllSaleProvider({ children }:{children: React.ReactNode}) {
    const [showAllSale, setShowAllSale] = useState(true);
    return (
        <ShowAllSaleContext.Provider value={{ showAllSale, setShowAllSale }}>
            {children}
        </ShowAllSaleContext.Provider>
    )
}

export function UseShowPrivateSale() {
    return useContext(ShowPrivateSaleContext);
}
export function UseShowCoorpSale() {
    return useContext(ShowCoorpSaleContext);
}
export function UseShowAllSale() {
    return useContext(ShowAllSaleContext);
}