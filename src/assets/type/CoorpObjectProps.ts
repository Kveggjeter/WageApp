import FindCorrectName from "../../feature/FindCorrectName.ts";
import GiveProductCorrectCode from "../../feature/GiveProductCorrectCode.ts";

export interface CoorpObjectProps {
    getValue:(key:string) => number | "";
    getCount:(key:string) => number | "";
    getRealCount:(num: number, list: string[], m: Map<string, number>) => number;
    getRealWage:(m: Map<string, number>) => number;
    names: FindCorrectName;
    giveCode: GiveProductCorrectCode;
    nhp: number;
    coorpTotal: number;
    coorpTotalSalg: number;
    coorpFinalTotal: number;
    provisjonItp: number;
    coorpRes: Map<string, number>;
    coorpWages: Map<string, number>;
    ansvarforsikring: number;
    bygg: number;
    person: number;
    bil: number;
    itp: number;
    avarn: number;
    annet: number;
    ansvarWage: Map<string, number>;
    byggWage: Map<string, number>;
    personWage: Map<string, number>;
    bilWage: Map<string, number>;
    itpWage: Map<string, number>;
    avarnWage: Map<string, number>;
    annetWage: Map<string, number>;
    tabellTotal: number;
    annetTotal: number;
}