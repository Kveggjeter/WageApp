import { collection, updateDoc, doc, getDoc, getDocs, setDoc, addDoc } from "firebase/firestore";
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

export async function GetWages(uid: string, year: number, month: string) {
    try {
        const wage = await GetWage(uid, year, month);
        return wage?.data();

    } catch (e) {
        console.error(e);
    }
}

async function GetWage(uid: string, year: number, month: string) {
    try {
        const colRef = await getDocs(collection(db, uid));
        const colSnap = await getDoc(doc(db, uid, `${year}-${month}`));
        if (colRef.empty || !colSnap.exists()) {
            CreateColl(uid, year, month);
        }
        
        return colSnap;

    } catch (e) {
        console.error(e + " catch i GetWage");
    }

}

async function CreateColl(uid: string, year: number, month: string) {
    console.log("forsøker å lage dokument.. ");
    await setDoc(doc(db, uid, `${year}-${month}`), {});
    
}

export async function AddCommision(uid: string, year: number, month: string, produkt: Map<string, number>, mersalg: Map<string, number>)  {
    

    const docRef = GetWage(uid, year, month);

    let nyRes = produkt.keys();

    while(true) {
        let res = nyRes.next();
    
    }


    await updateDoc(docRef, {
        hp1_ny: 1
    })
}