export interface SalesContextProps {
    sales: { salgsKart: [string, number][] }; 
    setSales: (sales: (prevSales: any) => any[]) => void;
}

