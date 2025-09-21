import React, { createContext, useContext, useState} from "react";
import {YearProps} from "../../assets/type/YearProps.ts";
import {MonthProps} from "../../assets/type/MonthProps.ts";
import {NorskKalender} from "./NorskKalender.ts";
import {DayProps} from "../../assets/type/DayProps.ts";

const DayContext = createContext<DayProps>({
    day: new Date().getDate(),
    setDay: () => {},
});

const MonthContext = createContext<MonthProps>({
    month: NorskKalender(new Date().getMonth()),
    setMonth: () => {},
});

const YearContext = createContext<YearProps>({
    year: new Date().getFullYear(),
    setYear: () => {},
});



export function DayProvider ({ children }: { children: React.ReactNode}) {
    const [day, setDay] = useState<number>(new Date().getDate());
    return (
        <DayContext.Provider value ={{ day, setDay }}>
            {children}
        </DayContext.Provider>
    )
}

export function YearProvider ({ children }: { children: React.ReactNode}) {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    return (
        <YearContext.Provider value ={{ year, setYear }}>
            {children}
        </YearContext.Provider>
    )
}


export function MonthProvider ({ children } : { children: React.ReactNode}) {
    const [month, setMonth] = useState<string>(NorskKalender(new Date().getMonth()));
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

export function UseDay() {
    const context = useContext(DayContext);
    if(!context) {
        throw new Error("useDay must be defined");
    }
    return context;
}

