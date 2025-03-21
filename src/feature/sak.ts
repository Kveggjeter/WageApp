import {NamesForProduct} from "./NamesForProduct.ts";

class Sak extends NamesForProduct {

    sak(s: string) {
        switch (s) {
            case "hus":
                return this.h;
            case "bil":
                return this.b;
            case "person":
                return this.p;
            case "nordea":
                return this.n;
            case "baat":
                return this.bt;
            case "reise":
                return this.r;
            case "dyr":
                return this.d;
            case "annet":
                return this.a
            default:
                return null;
        }
    }
}

export default Sak;