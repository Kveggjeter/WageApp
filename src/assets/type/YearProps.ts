import React from "react";

export interface YearProps {
    year?: number | undefined;
    setYear: React.Dispatch<React.SetStateAction<number | undefined>>;
}