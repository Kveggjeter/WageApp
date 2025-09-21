import React from "react";

export interface YearProps {
    year?: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
}