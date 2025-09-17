import {CoorpCreateExtraRowData} from "./CoorpCreateExtraRowData.ts";

export interface CoorpCreateTableProp {
    data: { [key: string]: number | string }; // Fra context (inputs)
    rows: CoorpCreateSaleRowData[];
    setRows: React.Dispatch<React.SetStateAction<CoorpCreateSaleRowData[]>>;
    extraRows: CoorpCreateExtraRowData[];
    setExtraRows: React.Dispatch<React.SetStateAction<CoorpCreateExtraRowData[]>>;
}

export type CoorpCreateSaleRowData = {
    id: string;
    product: string;
    ekstra: boolean;
    amount: number;
};