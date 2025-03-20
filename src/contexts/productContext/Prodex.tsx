import React, { createContext, useContext, useState} from "react";
import { ProdexProps } from "../../assets/type/ProdexProps.ts"

const ProdexContext = createContext<ProdexProps>({
    inputs: {},
    setInputs: () => {},
})

export function ProdexProvider ({ children }: { children: React.ReactNode }) {
    const [inputs, setInputs] = useState<{ [key: string]: string | number }>({
    });

    return (
        <ProdexContext.Provider value={{ inputs, setInputs }}>
            {children}
        </ProdexContext.Provider>
    )
}

export function useProdex() {
    return useContext(ProdexContext);
}

