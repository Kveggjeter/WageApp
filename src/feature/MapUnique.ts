import {NamesForProduct} from "./NamesForProduct.ts";

class MapUnique extends NamesForProduct {

    navn(s: Map<string, number>, org: boolean) {
        const ny: string = "ny";
        const mer: string = "mer";
        let v: string;

        if (org) v = ny;
        else v = mer;

        const kart: Map<string, number> = new Map();

        s.forEach((value, key) => {
        if (this.sp4.includes(key)) kart.set("sp4_" + v, value);
        if (this.sp3.includes(key)) kart.set("sp3_" + v, value);
        if (this.sp2.includes(key)) kart.set("sp2_" + v, value);
        if (this.sp1.includes(key)) kart.set("sp1_" + v, value);
        if (this.hpv.includes(key)) kart.set("hpv_" + v, value);
        if (this.hp1.includes(key)) kart.set("hp1_" + v, value);
        if (this.hp2.includes(key)) kart.set("hp2_" + v, value);
        if (this.hpp.includes(key)) kart.set("hpp_" + v, value);
        if (this.ekstra.includes(key)) kart.set("ekstra_" + v, value);
        if (this.sector.includes(key)) kart.set("sector_" + v, value);
        if (this.udf_hp1.includes(key)) kart.set("hp1_udf_" + v, value);
        if (this.udf_hp2.includes(key)) kart.set("hp2_udf_" + v, value);
        if (this.udf_hpv.includes(key)) kart.set("hpv_udf_" + v, value);
        if (this.liv.includes(key)) kart.set("liv_" + v, value);
        if (key === "livSum") {
            kart.set("livSum_" + v, value);
            return;
        }
        });

        return kart;

    }
}

export default MapUnique;