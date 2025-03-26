import React, { createContext, useContext, useState} from "react";
import {YearProps} from "../../assets/type/YearProps.ts";
import {MonthProps} from "../../assets/type/MonthProps.ts";
import {NorskKalender} from "./NorskKalender.ts";

const YearContext = createContext<YearProps | undefined>(undefined);
const MonthContext = createContext<MonthProps | undefined>(undefined);

const d = new Date();

export function YearProvider ({ children }: { children: React.ReactNode}) {
    const [year, setYear] = useState<number>();
    const today = d.getFullYear();
    if (year === null || year === undefined) setYear(today);
    return (
        <YearContext.Provider value ={{ year, setYear }}>
            {children}
        </YearContext.Provider>
    )
}


export function MonthProvider ({ children } : { children: React.ReactNode}) {
    const [month, setMonth] = useState<string>();
    const today = d.getMonth();
    if (month === null || month === undefined)
        setMonth(NorskKalender(today));
    return (
        <MonthContext.Provider value = {{ month, setMonth}}>
            {children}
        </MonthContext.Provider>
    )
}

export function UseYear() {
    const context = useContext(YearContext);
    if(!context){
        throw new Error("useYear must be defined");
    }
    return context;
}

export function UseMonth() {
    const context = useContext(MonthContext);
    if(!context) {
        throw new Error("useMonth must be defined");
    }
    return context;
    }

