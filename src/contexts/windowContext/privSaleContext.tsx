import React, {createContext, useContext, useState} from "react";
import {ShowPrivCreateSalesProps} from "../../assets/type/ShowPrivCreateSalesProps.ts";
import {ShowPrivCreateRemoveProps} from "../../assets/type/ShowPrivCreateRemoveProps.ts";
import {ShowCoorpCreateRemoveProps} from "../../assets/type/ShowCoorpCreateRemoveProps.ts";
import {ShowCoorpCreateSalesProps} from "../../assets/type/ShowCoorpCreateSalesProps.ts";

const ShowPrivCreateSalesContext = createContext<ShowPrivCreateSalesProps>({
    showPrivCreateSale: false,
    setShowPrivCreateSale: () => {}
})
const ShowPrivCreateRemoveContext = createContext<ShowPrivCreateRemoveProps>({
    showPrivCreateRemove: false,
    setShowPrivCreateRemove: () => {}
})

const ShowCoorpCreateSalesContext = createContext<ShowCoorpCreateSalesProps>({
    showCoorpCreateSale: false,
    setShowCoorpCreateSale: () => {}
})
const ShowCoorpCreateRemoveContext = createContext<ShowCoorpCreateRemoveProps>({
    showCoorpCreateRemove: false,
    setShowCoorpCreateRemove: () => {}
})



export function ShowPrivCreateSalesProvider ({ children }: { children: React.ReactNode}) {
    const [showPrivCreateSales, setShowPrivCreateSales] = useState(false);

    return (
        <ShowPrivCreateSalesContext.Provider value ={{ showPrivCreateSale: showPrivCreateSales, setShowPrivCreateSale: setShowPrivCreateSales }}>
            {children}
        </ShowPrivCreateSalesContext.Provider>
    )
}
export function ShowPrivCreateRemoveProvider ({children}: {children: React.ReactNode}) {
    const [showPrivCreateRemove, setShowPrivCreateRemove] = useState(false);

    return (
        <ShowPrivCreateRemoveContext.Provider value={{ showPrivCreateRemove: showPrivCreateRemove, setShowPrivCreateRemove: setShowPrivCreateRemove }}>
            {children}
        </ShowPrivCreateRemoveContext.Provider>
    )
}

export function ShowCoorpCreateSalesProvider ({ children }: { children: React.ReactNode}) {
    const [showCoorpCreateSale, setShowCoorpCreateSale] = useState(false);

    return (
        <ShowCoorpCreateSalesContext.Provider value ={{ showCoorpCreateSale: showCoorpCreateSale, setShowCoorpCreateSale: setShowCoorpCreateSale }}>
            {children}
        </ShowCoorpCreateSalesContext.Provider>
    )
}
export function ShowCoorpCreateRemoveProvider ({children}: {children: React.ReactNode}) {
    const [showCoorpCreateRemove, setShowCoorpCreateRemove] = useState(false);

    return (
        <ShowCoorpCreateRemoveContext.Provider value={{ showCoorpCreateRemove: showCoorpCreateRemove, setShowCoorpCreateRemove: setShowCoorpCreateRemove }}>
            {children}
        </ShowCoorpCreateRemoveContext.Provider>
    )
}


export function UseShowPrivCreateSale() {
    return useContext(ShowPrivCreateSalesContext);
}
export function UseShowPrivCreateRemove() {
    return useContext(ShowPrivCreateRemoveContext);
}

export function UseShowCoorpCreateSale() {
    return useContext(ShowCoorpCreateSalesContext);
}
export function UseShowCoorpCreateRemove() {
    return useContext(ShowCoorpCreateRemoveContext);
}