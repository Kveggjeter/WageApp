import {CoorpCreateSaleRowData} from "../assets/type/CoorpCreateTableProp.ts";

export function UniqueCoorpAdd(combined: CoorpCreateSaleRowData[]) {
    const produkt: Map<string, number> = new Map();
    let sumProdukt: number = 0;

    combined.forEach((item: CoorpCreateSaleRowData) => {

        const id: string = item.product;
        sumProdukt += item.amount;

            if (produkt.has(id)) {
                const value = produkt.get(id);
                produkt.set(id, value! + 1);
            } else produkt.set(id, 1);
            produkt.set("sum", sumProdukt);
    });

    return produkt;
}