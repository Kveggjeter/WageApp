import { updateDoc, doc, getDoc } from "firebase/firestore";
import {db} from "./firebase.ts";
import {Commision} from "../assets/type/Commision.ts";

export async function GetCommision() {

    const docRef = doc(db, "commisions", "coms");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const provisjon = docSnap.data() as Commision;
        console.log(provisjon);
    } else {
        console.log("No such document!");
    }
}

export async function AddCommision()  {

    const docRef = doc(db, "wage", "RfjxtfP0Tn7JMe3qCWfv")
    console.log("se her a" + sales);



    /**
     *

    function addTogether() {

        for (let i = 0; i < sales.length; i++) {
            if (isIt(sales[i]) {
                let val: number | undefined = hm.get(sales[i]);
                hm.set(sales[i], val! + 1)
            }

        }
    }
        */

    function isIt(value: string): boolean{
        return hm.has(value);
    }

    await updateDoc(docRef, {
        hp1_ny: 1
    })
}