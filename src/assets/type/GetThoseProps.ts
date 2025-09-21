import {PrivateObject} from "./PrivateObject.ts";
import {CoorpObject} from "./CoorpObject.ts";

export interface GetThoseProps {
    getValue:(key:string) => number | "";
    getCount:(key:string) => number | "";
}

export interface GetThosePropsCoorp {
    getValue:(key:string) => number | "";
    coorpRes: Map<string, number>;
    coorpWages: Map<string, number>;
}

export interface GetThoseAllProps {
    privObject: PrivateObject;
    coorpObject: CoorpObject;
}