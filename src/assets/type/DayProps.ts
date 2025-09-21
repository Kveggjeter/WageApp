import React from "react";

export interface DayProps {
    day: number;
    setDay: React.Dispatch<React.SetStateAction<number>>;
}