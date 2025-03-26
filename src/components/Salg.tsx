import "../assets/salg.css";
import baat from "../assets/images/baat_24.gif";
import person from "../assets/images/barnogvoksne_24.gif";
import dyr from "../assets/images/dyr_24.gif";
import hus from "../assets/images/husoghjem_24.gif";
import bil from "../assets/images/kjoeretoey_24.gif";
import annet from "../assets/images/nliprivat_24.gif";
import nordea from "../assets/images/nordealogo_24.gif";
import reise from "../assets/images/reise_24.gif";
import Produkter from "./Produkter.tsx";
import {useState} from "react";
import Sak from "../feature/sak.ts";
import { SalgProp } from "../assets/type/SalgProp.ts";
import {useProdex} from "../contexts/productContext/Prodex.tsx";
import TableComp from "./TableComp.tsx";
import {RowData} from "../assets/type/TableProp.ts";
import {useSales} from "../contexts/productContext/SalesContext.tsx";
import {AddCommision, GetCommision, GetWages} from "../firebase/firestore.ts";
import {UniqueAdd} from "../feature/UniqueAdd.tsx";
import MapUnique from "../feature/MapUnique.ts";
import {UseMonth, UseYear} from "../contexts/calendar/CalendarContext.tsx";
import {useAuth} from "../contexts/authContext";


export function Salg({ showSalg, closeSalg, children }: SalgProp) {
    const {sales, setSales} = useSales();
    const [sal, setSal] = useState<string[] | null>(null);
    const [showProd, setShowProd] = useState(false);
    const { inputs } = useProdex();
    const [rows, setRows] = useState<RowData[]>([]);
    const { year } = UseYear();
    const { month } = UseMonth();
    const { uid } = useAuth();

    if (!showSalg) {return null}

    function click(value: string) {
        const sak = new Sak();
        const saker: string[] | null = sak.sak(value);
        setSal(null);
        setSal(saker);
        setShowProd(true);
    }

    function nullCheck(hm: Map<string, number>) {
        let stat: boolean = false;
        hm.forEach((value) => {
            if (value > 0) stat = true;
        });
        return stat;
    }

    function handleRegister() {
        const uni = new MapUnique();
        console.log("inputs:", inputs);
        console.log("rows:", rows);
        const combined = rows.map((r) => ({
            ...r,
        }));

        GetCommision();
        const res = UniqueAdd(combined);
        const produkt: Map<string, number> = res.produkt;
        const mersalg: Map<string, number> = res.mersalg;
        uni.navn(produkt, true)
        uni.navn(mersalg, false)
        if(uid && year && month) {
            console.log(GetWages(uid, year, month));
        }
             

        // AddCommision(uid, year, month, produkt, mersalg);
    
        setSales((prevSales) => [
            ...prevSales,
            {
                produkt: Array.from(produkt),
                mersalg: Array.from(mersalg)
            },
        ]);
            
    }

    return (
        <>
            <Produkter sal={sal} showProd={showProd} closeProd={() => setShowProd(false)} children={undefined}/>
            <div className="salgBox">
                <ul className="imgBulk">
                    <li>
                        <img src={hus} alt="hus"/>
                        <p onClick={() => click("hus")}>Hus og innbo</p>
                    </li><li>
                        <img src={bil} alt="bil"/>
                        <p onClick={() => click("bil")}>Kjøretøy</p>
                    </li><li>
                        <img src={person} alt="person"/>
                        <p onClick={() => click("person")}>Barn og voksne</p>
                    </li><li>
                        <img src={nordea} alt="nordea"/>
                        <p onClick={() => click("nordea")}>Nordea</p>
                    </li><li>
                        <img src={baat} alt="båt"/>
                        <p onClick={() => click("baat")}>Båt</p>
                    </li><li>
                        <img src={reise} alt="reise"/>
                        <p onClick={() => click("reise")}>Reise</p>
                    </li><li>
                        <img src={dyr} alt="dyr"/>
                        <p onClick={() => click("dyr")}>Dyr</p>
                    </li><li>
                        <img src={annet} alt="annet"/>
                        <p onClick={() => click("annet")}>Annet</p>
                    </li>
                </ul>
                <div className="tableBulk">
                    <TableComp data={inputs} rows={rows} setRows={setRows}/>
                </div>
                <button className="sellbby" onClick={handleRegister}>Registrer</button>
                {children}
                <button className="lukk" onClick={closeSalg}>X</button>
            </div>
        </>
    )
}

export default Salg;