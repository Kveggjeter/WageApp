export interface PrivateObjectProps {
    getValue:(key:string) => number | "";
    getCount:(key:string) => number | "";
    hpBonus: number;
    totalLiv: number;
    husTotal: number,
    bilTotal: number;
    hppTotal: number;
    hpTotal: number;
    skadeProv: number;
    livProv: number;
    totalProv: number;
    year: number | undefined;
    month: string | undefined;
}