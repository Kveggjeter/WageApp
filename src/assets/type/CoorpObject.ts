import {CoorpObjectProps} from "./CoorpObjectProps.ts";
import FindCorrectName from "../../feature/FindCorrectName.ts";
import GiveProductCorrectCode from "../../feature/GiveProductCorrectCode.ts";

export class CoorpObject {
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
    constructor({
                    getValue,
                    getCount,
                    getRealCount,
                    getRealWage,
                    names,
                    giveCode,
                    nhp,
                    coorpTotal,
                    coorpTotalSalg,
                    coorpFinalTotal,
                    provisjonItp,
                    coorpRes,
                    coorpWages,
                    ansvarforsikring,
                    bygg,
                    person,
                    bil,
                    itp,
                    avarn,
                    annet,
                    ansvarWage,
                    byggWage,
                    personWage,
                    bilWage,
                    itpWage,
                    avarnWage,
                    annetWage,
                    tabellTotal,
                    annetTotal
                }: CoorpObjectProps) {
        this.getValue = getValue;
        this.getCount = getCount;
        this.getRealCount = getRealCount;
        this.getRealWage = getRealWage;
        this.names = names;
        this.giveCode = giveCode;
        this.nhp = nhp;
        this.coorpTotal = coorpTotal;
        this.coorpTotalSalg = coorpTotalSalg;
        this.coorpFinalTotal = coorpFinalTotal;
        this.provisjonItp = provisjonItp;
        this.coorpRes = coorpRes;
        this.coorpWages = coorpWages;
        this.ansvarforsikring = ansvarforsikring;
        this.bygg = bygg;
        this.person = person;
        this.bil = bil;
        this.itp = itp;
        this.avarn = avarn;
        this.annet = annet;
        this.ansvarWage = ansvarWage;
        this.byggWage = byggWage;
        this.personWage = personWage;
        this.bilWage = bilWage;
        this.itpWage = itpWage;
        this.avarnWage = avarnWage;
        this.annetWage = annetWage;
        this.tabellTotal = tabellTotal;
        this.annetTotal = annetTotal;
    }
}
