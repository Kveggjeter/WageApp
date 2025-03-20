import { updateDoc, doc, getDoc } from "firebase/firestore";
import {db} from "./firebase.ts";
import {Commision} from "../assets/type/Commision.ts";
import {SaleProp} from "../assets/type/SaleProp.ts";

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

export async function AddCommision({ ...sales }: SaleProp)  {
    const docRef = doc(db, "wage", "RfjxtfP0Tn7JMe3qCWfv")
    console.log(sales);
    await updateDoc(docRef, {
        hp1_ny: 1
    })
}