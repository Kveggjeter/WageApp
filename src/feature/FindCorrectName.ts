import {CoorpNames} from "./NamesForProduct.ts";

class FindCorrectName extends CoorpNames {

    findCorrectName(s: string) {

            this.lookUp.forEach((value, key) => {
                if(s === key) {
                    return value[0];
                }
            })

        return "";
    }

    findCorrectCategory(s: string) {
        const category = this.findCorrectName(s);

        for (const a of this.a) { if(category === a) return a; }
        for (const an of this.an) { if(category === an) return an; }
        for (const h of this.h) {if(category === h) return h; }
        for (const b of this.b) { if (category === b) return b; }
        for (const t of this.t) { if (category === t) return t; }
        for (const d of this.d) { if (category === d) return d; }
        for (const a of this.a) { if (category === a) return a; }

        return "";
    }


}

export default FindCorrectName;