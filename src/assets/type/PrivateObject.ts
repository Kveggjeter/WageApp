import {PrivateObjectProps} from "./PrivateObjectProps.ts";

export class PrivateObject {
    getValue: (key: string) => (number | "");
    getCount: (key: string) => (number | "");
    hpBonus: number;
    totalLiv: number;
    husTotal: number;
    hppTotal: number;
    bilTotal: number;
    hpTotal: number;
    skadeProv: number;
    livProv: number;
    totalProv: number;
    year: number | undefined;
    month: string | undefined;
    

    constructor({
                    getValue,
                    getCount,
                    hpBonus,
                    totalLiv,
                    husTotal,
                    bilTotal,
                    hppTotal,
                    hpTotal,
                    skadeProv,
                    livProv,
                    totalProv,
        year,
        month,
                }: PrivateObjectProps) {
        this.getValue = getValue;
        this.getCount = getCount;
        this.hpBonus = hpBonus;
        this.totalLiv = totalLiv;
        this.husTotal = husTotal;
        this.bilTotal = bilTotal;
        this.hppTotal = hppTotal;
        this.hpTotal = hpTotal;
        this.skadeProv = skadeProv;
        this.livProv = livProv;
        this.totalProv = totalProv;
        this.year = year;
        this.month = month;
    }
}
