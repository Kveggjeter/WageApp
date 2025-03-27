import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "./firebase.ts";


export async function GetCommision(): Promise<Map<string, number>> {

    const docRef = doc(db, "commisions", "coms");
    const docSnap = await getDoc(docRef);
    let em = new Map<string, number>();
    if (docSnap.exists()) {
        em = new Map(Object.entries(docSnap.data()));
        return em;
    } else {
        console.log("Dette dokket finnes ikke kompis!");
        return em;
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

    try {
        const docSnap = await GetWage(uid, year, month);
        if (!docSnap) {
            console.error("Kunne ikke hente dokumentet - docSnap er null/undefined");
            return;
        }

        const docRef = docSnap.ref;
        const docData = docSnap.data() || {};

        for (const [key, newValue] of produkt.entries()) {
            if (newValue <= 0) continue;
            const existingValue = docData[key] || 0;
            docData[key] = existingValue + newValue;
        }

        for (const [key, newValue] of mersalg.entries()) {
            if (newValue <= 0) continue;
            const existingValue = docData[key] || 0;
            docData[key] = existingValue + newValue;
        }

        await updateDoc(docRef, docData);

    } catch (e) {
        console.error(e + " catch i AddCommision");
    }

}