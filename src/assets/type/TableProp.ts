export interface TableProp {
    data: { [key: string]: number | string }; // Fra context (inputs)
    rows: RowData[];
    setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
}

export type RowData = {
    id: string;
    product: string;
    mersalg: boolean;
    ekstra: boolean;
    maskinskade: boolean;
};