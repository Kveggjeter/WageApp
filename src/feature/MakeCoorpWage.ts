import {MainTableProps} from "../assets/type/MainTableProps.ts";
import {GetCoorpCommision} from "../firebase/firestore.ts";

export async function MakeCoorpWage({ tabell, uid }: MainTableProps): Promise<Map<string, number>> {
    const wage = new Map<string, number>;
    if (uid) {

        const commissionData = await GetCoorpCommision(uid);
        const com = new Map(Object.entries(tabell));

        com.forEach((value: number, key: string) => {

            const commissionRate = commissionData.get(key);
            if (commissionRate) {
                const rate: number = commissionRate * value;
                wage.set(key, rate)
            }
        });
    }
    return wage;

}