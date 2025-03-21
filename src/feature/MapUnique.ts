import {NamesForProduct} from "./NamesForProduct.ts";

class MapUnique extends NamesForProduct {

    navn(s: Map<string, number>, org: boolean) {
        const ny: string = "ny";
        const mer: string = "mer";
        let v: string;

        if (org) v = ny;
        else v = mer;

        const kart: Map<string, number> = new Map();
        console.log(this.sp4, this.sp3, this.sp2, this.sp1, this.hpv, this.hp1, this.hp2, this.hpp, this.sector, this.liv);

        s.forEach((value, key) => {
            console.log("Sjekker key:", key);
        if (this.sp4.includes(key)) kart.set("sp4_" + v, value);
        if (this.sp3.includes(key)) kart.set("sp3_" + v, value);
        if (this.sp2.includes(key)) kart.set("sp2_" + v, value);
        if (this.sp1.includes(key)) kart.set("sp1_" + v, value);
        if (this.hpv.includes(key)) kart.set("hpv_" + v, value);
        if (this.hp1.includes(key)) kart.set("hp1_" + v, value);
        if (this.hp2.includes(key)) kart.set("hp2_" + v, value);
        if (this.hpp.includes(key)) kart.set("hpp_" + v, value);
        if (this.sector.includes(key)) kart.set("sector_" + v, value);
        if (this.liv.includes(key)) kart.set("liv_" + v, value);
        });

        console.log("Filtrert kart:", kart);

    }
}

export default MapUnique;