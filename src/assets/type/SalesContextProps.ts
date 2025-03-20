import {SaleProp} from "./SaleProp.ts";

export interface SalesContextProps {
    sales: SaleProp[];
    setSales: React.Dispatch<React.SetStateAction<SaleProp[]>>;
}

