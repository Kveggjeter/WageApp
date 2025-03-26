import { collection, updateDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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

export async function GetWages(uid: string, year: number, month: number) {
    try {
        return GetWages(uid, year, month).data();

    } catch (e) {
        console.error(e);
    }
}

async function GetWage(uid: string, year: number, month: string) {

    try {
        const colRef = await getDocs(collection(db, `${uid}`));
        const colSnap = await getDoc(doc(db, `${uid}`, year.toString(), month));

        if (!colRef) {
            CreateColl(uid, year, month);
        }

        return colSnap;

    } catch (e) {
        console.error(e);
    }




}

async function CreateColl(uid: string, year: number, month: string) {
    await setDoc(doc(db, uid, year.toString(), month), {});
}

export async function AddCommision(uid: string, year: number, month: string)  {

    const docRef = GetWage(uid, year, month);


    await updateDoc(docRef, {
        hp1_ny: 1
    })
}