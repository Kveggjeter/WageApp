import {CoorpCreateSaleRowData} from "./CoorpCreateTableProp.ts";

export type CoorpCreateExtraRowData = CoorpCreateSaleRowData & {
    parentId: string;
};