export interface PrivateObjectProps {
    getValue:(key:string) => number | "";
    getCount:(key:string) => number | "";
    husTotal: number,
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
    hpp_prov: number;
    hp1_udf_prov: number;
    hp2_udf_prov: number;
    sp1_prov: number;
    sp2_prov: number;
    sp3_prov: number;
    sp4_prov: number;
    ekstra_prov: number;
    sector_prov: number;
    spValue: number;
    spCount: number;

}