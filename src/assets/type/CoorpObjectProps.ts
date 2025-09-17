export interface CoorpObjectProps {
    getCoorpValue:(key:string) => number | "";
    getCoorpCount:(key:string) => number | "";
    year: number | undefined;
    month: string | undefined;
}