import {PrivateObjectProps} from "./PrivateObjectProps.ts";

export class PrivateObject {
    getValue: (key: string) => (number | "");
    getCount: (key: string) => (number | "");
    husTotal: number;
    bilTotal: number;
    hppTotal: number;
    livProv: number;
    hpProduktProv: number;
    hpTotal: number;
    hpBonus: number;
    hpBonusSum: number;
    totalLiv: number;
    skadeProv: number;
    totalProv: number;
    hpv_prov: number;
    hpv_udf_prov: number;
    hp1_prov: number;
    hp2_prov: number;
    hp1_udf_prov: number;
    hp2_udf_prov: number;
    hpp_prov: number;
    sp1_prov: number;
    sp2_prov: number;
    sp3_prov: number;
    sp4_prov: number;
    ekstra_prov: number;
    sector_prov: number;
    spValue: number;
    spCount: number;

    constructor({
        getValue,
        getCount,
        husTotal,
        bilTotal,
        hppTotal,
        livProv,
        hpProduktProv,
        hpTotal,
        hpBonus,
        hpBonusSum,
        totalLiv,
        skadeProv,
        totalProv,
        hpv_prov,
        hpv_udf_prov,
        hp1_prov,
        hp2_prov,
        hp1_udf_prov,
        hp2_udf_prov,
        hpp_prov,
        sp1_prov,
        sp2_prov,
        sp3_prov,
        sp4_prov,
        ekstra_prov,
        sector_prov,
        spValue,
        spCount
                }: PrivateObjectProps) {
        this.getValue = getValue;
        this.getCount = getCount;
        this.husTotal = husTotal;
        this.bilTotal = bilTotal;
        this.hppTotal = hppTotal;
        this.livProv = livProv;
        this.hpProduktProv = hpProduktProv;
        this.hpTotal = hpTotal;
        this.hpBonus = hpBonus;
        this.hpBonusSum = hpBonusSum;
        this.totalLiv = totalLiv;
        this.skadeProv = skadeProv;
        this.totalProv = totalProv;
        this.hpv_prov = hpv_prov;
        this.hpv_udf_prov = hpv_udf_prov;
        this.hp1_prov = hp1_prov;
        this.hp2_prov = hp2_prov;
        this.hp1_udf_prov = hp1_udf_prov;
        this.hp2_udf_prov = hp2_udf_prov;
        this.hpp_prov = hpp_prov;
        this.sp1_prov = sp1_prov;
        this.sp2_prov = sp2_prov;
        this.sp3_prov = sp3_prov;
        this.sp4_prov = sp4_prov;
        this.ekstra_prov = ekstra_prov;
        this.sector_prov = sector_prov;
        this.spValue = spValue;
        this.spCount = spCount;
    }
}
