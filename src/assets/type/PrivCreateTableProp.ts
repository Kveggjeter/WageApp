export interface PrivCreateTableProp {
    data: { [key: string]: number | string }; // Fra context (inputs)
    rows: PrivCreateSaleRowData[];
    setRows: React.Dispatch<React.SetStateAction<PrivCreateSaleRowData[]>>;
}

export type PrivCreateSaleRowData = {
    id: string;
    product: string;
    mersalg: boolean;
    ekstra: boolean;
    maskinskade: boolean;
    isLiv?: boolean;
    amount?: number;
};