import {CoorpNames} from "./NamesForProduct.ts";
import {CoorpCreateSaleRowData} from "../assets/type/CoorpCreateTableProp.ts";


class GiveProductCorrectCode extends CoorpNames{

    newCode(rowId: string) {

        let currentId;

        this.lookUp.forEach((value, key) => {
            if(value[0] === rowId) {
                currentId = key;
                return
            }
        });

        if (currentId != undefined) {
            if (this.associatedMap.has(currentId)) {
                return this.associatedMap.get(currentId)!;
            }
        }
        return [];
    }

    nameAsCodes(combined: CoorpCreateSaleRowData[]) {
        const finalMap: Map<string, number> = new Map();

        for (const row of combined) {
            const productName = row.product;

            let foundCode: string | undefined = undefined;
            for (const [code, names] of this.lookUp.entries()) {
                if (names.includes(productName)) {
                    foundCode = code;
                    break;
                }
            }

            if (foundCode) {
                const currentValue = finalMap.get(foundCode) || 0;
                finalMap.set(foundCode, currentValue + 1);
            }
        }

        return finalMap;
    }

    singleCode(s: string) {

            for (const [code, names] of this.lookUp.entries()) {
                if (names.includes(s)) {
                    return code;
                }
            }

        return "";
    }


}

export default GiveProductCorrectCode;