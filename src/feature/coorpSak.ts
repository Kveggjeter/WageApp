import {CoorpNames} from "./NamesForProduct.ts";

class CoorpSak extends CoorpNames {

    coorpSak(s: string) {
        switch (s) {
            case "ansatte":
                return this.a;
            case "ansvar":
                return this.an;
            case "bygg":
                return this.h;
            case "bilBedrift":
                return this.b;
            case "transport":
                return this.t;
            case "annetBedrift":
                return this.d;
            case "itp":
                return this.n;
            default:
                return null;
        }
    }
}

export default CoorpSak;