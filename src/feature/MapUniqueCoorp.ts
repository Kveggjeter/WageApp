import {CoorpNames} from "./NamesForProduct.ts";

class MapUniqueCoorp extends CoorpNames {

    mapUniqueCorp(s: Map<string, number>) {
        const kart: Map<string, number> = new Map();
        s.forEach((value, key) => {
            if(this.b10.indexOf(key)) kart.set("b10", value);
            if(this.b12.indexOf(key)) kart.set("b12", value);
            if(this.b17.indexOf(key)) kart.set("b17", value);
            if(this.b20.indexOf(key)) kart.set("b20", value);
            if(this.b21.indexOf(key)) kart.set("b21", value);
            if(this.b35.indexOf(key)) kart.set("b35", value);
            if(this.b38.indexOf(key)) kart.set("b38", value);
            if(this.b77.indexOf(key)) kart.set("b77", value);
            if(this.b79.indexOf(key)) kart.set("b79", value);
            if(this.b100.indexOf(key)) kart.set("b100", value);
            if(this.b113.indexOf(key)) kart.set("b113", value);
            if(this.b115.indexOf(key)) kart.set("b115", value);
            if(this.b115.indexOf(key)) kart.set("b115", value);
            if(this.b115.indexOf(key)) kart.set("b115", value);
            if(this.b115.indexOf(key)) kart.set("b115", value);
            if(this.b115.indexOf(key)) kart.set("b115", value);
            if(this.b115.indexOf(key)) kart.set("b115", value);
            if(this.b115.indexOf(key)) kart.set("b115", value);
        });

        return kart;

    }
}

export default MapUniqueCoorp;