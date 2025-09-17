import {CoorpObjectProps} from "./CoorpObjectProps.ts";

export class CoorpObject {
    getCoorpValue: (key: string) => (number | "");
    getCoorpCount: (key: string) => (number | "");
    year: number | undefined;
    month: string | undefined;


    constructor({
                    getCoorpValue,
                    getCoorpCount,

                    year,
                    month,
                }: CoorpObjectProps) {
        this.getCoorpValue = getCoorpValue;
        this.getCoorpCount = getCoorpCount;
        this.year = year;
        this.month = month;
    }
}
