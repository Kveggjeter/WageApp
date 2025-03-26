import React from "react";

export interface MonthProps {
    month?: string | undefined;
    setMonth: React.Dispatch<React.SetStateAction<string | undefined>>;
}