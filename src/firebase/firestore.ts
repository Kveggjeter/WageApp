import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "./firebase.ts";

export async function GetCommision(uid: string): Promise<Map<string, number>> {
    let em = new Map<string, number>();
    const officeRef = (await getDoc(doc(db, "users", uid)));
    if (officeRef.exists()) {
        const office: boolean = officeRef.data().office;
        const prov = office ? "coms" : "stathelle";
        const docRef = doc(db, "commisions", prov);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            em = new Map(Object.entries(docSnap.data()));
            return em;
        } else {
            console.log("Dette dokket finnes ikke kompis!");
            return em;
        }
    }
    return em;
}

export async function GetCustomers(uid: string, year: number, month: string) {
    try {
        const monthRef = collection(db, uid, "Kunder", `Kunder-${year}-${month}`);
        const snap = await getDocs(monthRef);

        if (snap.empty) {
            console.log("Ingen kunder funnet for denne måneden.");
            return;
        }

        const customersMap: { [key: string]: object } = {};
        snap.forEach(doc => {
            customersMap[doc.id] = doc.data();
        });

        return customersMap;

    }catch(e) {
        console.error(e + "Ingen kunder enda");
        return [];
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

export async function CreateUser(uid: string, email: string, fname: string, lname: string, office: boolean) {
    const userDoc = await getDoc(doc(db, "users", uid))

    if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', uid), {
            email: email,
            firstName: fname,
            lastName: lname,
            office: office
        });
    }
}

async function CreateColl(uid: string, year: number, month: string) {
    console.log("forsøker å lage dokument.. ");
    await setDoc(doc(db, uid, `${year}-${month}`), {});
}


async function GetCustomerMonth(uid: string) {
    try {
        const colSnap = await getDoc(doc(db, uid, `Kunder`));
        if (!colSnap.exists()) {
            console.log("Ikke stort å gjøre gitt");
        }
        return colSnap;
    } catch (e) {
        console.error(e);
    }
}


export async function AddCommision(customer: string, uid: string, year: number, month: string, produkt: Map<string, number>, mersalg: Map<string, number>)  {

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

        const customerSnap = await GetCustomerMonth(uid);
        if (!customerSnap) {
            console.error("Kunne ikke hente dokumentet - docSnap er null/undefined");
            return;
        }
        const customerData = customerSnap.data() || {};

        for (const [key, newValue] of produkt.entries()) {
            if (newValue <= 0) continue;
            const existingValue = customerData[key] || 0;
            customerData[key] = existingValue + newValue;
        }

        for (const [key, newValue] of mersalg.entries()) {
            if (newValue <= 0) continue;
            const existingValue = customerData[key] || 0;
            customerData[key] = existingValue + newValue;
        }

        await setDoc(doc(db, uid, 'Kunder', `Kunder-${year}-${month}`, customer), customerData);
    } catch (e) {
        console.error(e + " catch i AddCommision");
    }
}

export async function RemoveCommision(uid: string, year: number, month: string, list: Map<string, number>) {
    try {
        const docRef = await GetWage(uid, year, month);
        if (!docRef) {
            console.error("Kunne ikke hente dokument");
            return;
        }
        const updateData = Object.fromEntries(list);
        await updateDoc(docRef.ref, updateData);


    } catch (e) {
        console.error(e + " catch i RemoveCommision");
    }
}