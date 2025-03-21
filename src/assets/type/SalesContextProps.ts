export interface SalesContextProps {
    sales: { produkt: [string, number][], mersalg: [string, number][] }[];
    setSales: (sales: (prevSales) => any[]) => void;
}

