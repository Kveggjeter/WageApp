import React, {createContext, useContext, useState} from "react";
import {ShowSalgProps} from "../../assets/type/ShowSalgProps.ts";
import {ShowRemoveProps} from "../../assets/type/ShowRemoveProps.ts";

const ShowSalgContext = createContext<ShowSalgProps>({
    showSalg: false,
    setShowSalg: () => {}
})
const ShowRemoveContext = createContext<ShowRemoveProps>({
    showRemove: false,
    setShowRemove: () => {}
})

export function ShowSalgProvider ({ children }: { children: React.ReactNode}) {
    const [showSalg, setShowSalg] = useState(false);

    return (
        <ShowSalgContext.Provider value ={{ showSalg, setShowSalg }}>
            {children}
        </ShowSalgContext.Provider>
    )
}

export function ShowRemoveProvider ({children}: {children: React.ReactNode}) {
    const [showRemove, setShowRemove] = useState(false);

    return (
        <ShowRemoveContext.Provider value={{ showRemove, setShowRemove }}>
            {children}
        </ShowRemoveContext.Provider>
    )
}

export function UseShowSalg() {
    return useContext(ShowSalgContext);
}

export function UseShowRemove() {
    return useContext(ShowRemoveContext);
}