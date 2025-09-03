import React from "react";

export interface DayProps {
    day?: number | undefined;
    setDay: React.Dispatch<React.SetStateAction<number | undefined>>;
}