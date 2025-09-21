import {PrivateObject} from "../assets/type/PrivateObject.ts";
import {CoorpObject} from "../assets/type/CoorpObject.ts";
import FindCorrectName from "./FindCorrectName.ts";
import GiveProductCorrectCode from "./GiveProductCorrectCode.ts";

export function CountElements(list: string[], result: Map<string, number>): number {
    const getCount = (key:string) => result.get(key) || "";
    let count = 0;
    for (const l of list) {
      count += +getCount(l);
    }
    return count;
}

export function NumClean(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function PopulatePrivTable(privateWages: Map<string, number>, res: Map<string, number>): PrivateObject {
    const getValue = (key:string) => privateWages.get(key) || "";
    const getCount = (key:string) => res.get(key) || "";
    const husTotal: number = CountElements(["hpv_mer", "hpv_ny", "hpv_udf_mer", "hpv_udf_ny"], res);
    const bilTotal: number = CountElements(["hp1_ny", "hp1_mer", "hp2_ny", "hp1_udf_ny"], res);
    const hppTotal: number = CountElements(["hpp_ny", "hpp_mer"], res);
    const livProv: number = CountElements(["livSum_ny", "livSum_mer"], privateWages);
    let hpProduktProv: number = CountElements(
        ["hpv_mer", "hpv_ny", "hpv_udf_mer", "hpv_udf_ny", "hp1_ny", "hp1_mer", "hp2_ny", "hp1_udf_ny",
            "hpp_ny", "hpp_mer"], privateWages);

    const hpTotal = husTotal + bilTotal + hppTotal;
    let hpBonus = hpTotal - 17;
    let hpBonusSum = 0;
    if (hpBonus <= 0) {
        hpBonus = 0;
    } else hpBonusSum = hpBonus * 450;
    hpProduktProv += hpBonusSum;
    let femmern: number = 0;
    if (hpBonus >= 23) femmern = 5000;

    const totalLiv: number = (4 * +getValue("livSum_ny")) + ((+getValue("livSum_mer")/18) * 100)
    let skadeProv = 0;
    privateWages.forEach((value) => {
        skadeProv += value;
    });

    skadeProv -= livProv;
    const totalProv: number = skadeProv + hpBonusSum + femmern + livProv;

    const hpv_prov = +getValue("hpv_mer") + +getValue("hpv_ny");
    const hpv_udf_prov = +getValue("hpv_udf_mer") + +getValue("hpv_udf_ny");
    const hp1_prov = +getValue("hp1_mer") + +getValue("hp1_ny");
    const hp2_prov = +getValue("hp2_mer") + +getValue("hp2_ny");
    const hp1_udf_prov = CountElements(["hp1_udf_mer", "hp1_udf_ny"], privateWages);
    const hp2_udf_prov = CountElements(["hp2_udf_ny", "hp2_udf_mer"], res);
    const hpp_prov = +getValue("hpp_ny") + +getValue("hpp_mer");
    const sp1_prov = +getValue("sp1_mer") + +getValue("sp1_ny");
    const sp2_prov = +getValue("sp2_mer") + +getValue("sp2_ny");
    const sp3_prov = +getValue("sp3_mer") + +getValue("sp3_ny");
    const sp4_prov = +getValue("sp4_mer") + +getValue("sp4_ny");
    const ekstra_prov = +getValue("ekstra_ny") + +getValue("ekstra_mer");
    const sector_prov = +getValue("sector");

    const spValue = sp1_prov + sp2_prov + sp3_prov + sp4_prov;
    const spCount = CountElements(
        ["sp1_ny", "sp1_mer", "sp2_ny", "sp2_ny", "sp3_ny", "sp3_mer", "sp4_ny", "sp4_mer"], privateWages);

    return new PrivateObject({
        getValue, getCount, husTotal, bilTotal, hppTotal, livProv, hpProduktProv, hpTotal, hpBonus, hpBonusSum,
        totalLiv, skadeProv, totalProv, hpv_prov, hpv_udf_prov, hp1_prov, hp2_prov, hp1_udf_prov, hp2_udf_prov,
        hpp_prov, sp1_prov, sp2_prov, sp3_prov, sp4_prov, ekstra_prov, sector_prov, spValue, spCount}
    );
}

export function PopulateCoorpTable(coorpWages: Map<string, number>, coorpRes: Map<string, number>): CoorpObject {
    const getValue = (key:string) => coorpWages.get(key) || "";
    const getCount = (key:string) => coorpRes.get(key) || "";
    const names = new FindCorrectName();
    const giveCode = new GiveProductCorrectCode();

    let nhp: number = 0;
    let coorpTotal: number = 0;
    let coorpTotalSalg: number = 0;

    if (coorpRes.has("amount")) {
        nhp = coorpRes.get("amount")!/7500;
        coorpTotalSalg = coorpRes.get("amount")!;
    }

    coorpWages.forEach((value) => {
        coorpTotal += value;
    });

    let coorpFinalTotal = coorpTotal;
    const provisjonItp = 0;
    if (coorpTotalSalg > 200000) {
        if(coorpTotalSalg > 250000) {
            coorpFinalTotal = (coorpTotalSalg * 0.07) + coorpTotal;
        } else coorpFinalTotal = (coorpTotalSalg * 0.02) + coorpTotal;
    }

    const getRealCount = (num: number, list: string[], m: Map<string, number>) => {
        for (const l of list) {
            if(coorpRes.has(giveCode.singleCode(l))) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                num += coorpRes.get(giveCode.singleCode(l));
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                m.set(giveCode.singleCode(l), coorpRes.get(giveCode.singleCode(l)));
            }
        }
        return num;
    }

    const getRealWage = (m: Map<string, number>) => {
        let num = 0;
        m.forEach((_value, key)=> {
            num += +getValue(key)
        })
        return num;
    }

    let ansvarforsikring = 0;
    const ansvarWage = new Map<string, number>();
    let bygg = 0;
    const byggWage = new Map<string, number>();
    let person = 0;
    const personWage = new Map<string, number>();
    let bil = 0;
    const bilWage = new Map<string, number>();
    let itp = 0;
    const itpWage = new Map<string, number>();
    let avarn = 0;
    const avarnWage = new Map<string, number>();
    let annet = 0;
    const annetWage = new Map<string, number>();

    ansvarforsikring = getRealCount(ansvarforsikring, names.an, ansvarWage);
    bygg = getRealCount(bygg, names.h, byggWage);
    person = getRealCount(person, names.a, personWage);
    bil = getRealCount(bil, names.b, bilWage);
    avarn = getRealCount(avarn, names.d, avarnWage);
    itp = getRealCount(itp, names.n, itpWage);
    annet = getRealCount(annet, names.t, annetWage);

    const tabellTotal = getRealWage(ansvarWage)
        + getRealWage(byggWage) + getRealWage(personWage) + getRealWage(bilWage)
        + getRealWage(avarnWage) + getRealWage(itpWage);

    const annetTotal = coorpTotal - tabellTotal;

    return new CoorpObject({
        getValue, getCount, getRealCount, getRealWage, names, giveCode,
        nhp, coorpTotal, coorpTotalSalg, coorpFinalTotal, provisjonItp,
        coorpRes, coorpWages, ansvarforsikring, bygg, person, bil, itp,
        avarn, annet, ansvarWage, byggWage, personWage, bilWage, itpWage,
        avarnWage, annetWage, tabellTotal, annetTotal
    });
}