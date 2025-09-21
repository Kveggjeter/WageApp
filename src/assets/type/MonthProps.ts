import React from "react";

export interface MonthProps {
    month?: string;
    setMonth: React.Dispatch<React.SetStateAction<string>>;
}