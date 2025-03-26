import {TableCompProps} from "../assets/type/MainTableProps.ts";
import {GetCommision} from "../firebase/firestore.ts";

export async function MakeWage({ data }: TableCompProps): Promise<Map<string, number>> {


        const commissionData = await GetCommision();
        const com = new Map(Object.entries(data));
        const wage = new Map<string, number>;

        com.forEach((value: number, key: string) => {
            if (commissionData?.has(key))
                wage.set(commissionData?.get(key), commissionData?.get(value) * value)
        });

        wage.forEach((value: number, key: string) => {
            console.log("her er proven: " + key + " : " + value);
        })

        return wage;

}