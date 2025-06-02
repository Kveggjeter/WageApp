import {MainTableProps} from "../assets/type/MainTableProps.ts";
import {GetCommision} from "../firebase/firestore.ts";

export async function MakeWage({ tabell, uid }: MainTableProps): Promise<Map<string, number>> {
        const wage = new Map<string, number>;
        if (uid) {

            const commissionData = await GetCommision(uid);
            const com = new Map(Object.entries(tabell));

            com.forEach((value: number, key: string) => {
                console.log("data -> " + value + " " + key)
                const commissionRate = commissionData.get(key);
                if (key === "livSum_ny") {
                    const rate: number = value/4;
                    wage.set(key, rate);
                }
                if (key === "livSum_mer") {
                    const rate: number = value * 0.18;
                    wage.set(key, rate);
                }
                if (commissionRate) {
                    const rate: number = commissionRate * value;
                    wage.set(key, rate)
                }
            });


            wage.forEach((value: number, key: string) => {
                console.log("her er proven: " + key + " : " + value);
            })
        }
        return wage;

}