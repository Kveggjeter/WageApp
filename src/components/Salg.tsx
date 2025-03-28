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
import {AddCommision} from "../firebase/firestore.ts";
import {UniqueAdd} from "../feature/UniqueAdd.tsx";
import MapUnique from "../feature/MapUnique.ts";
import {UseMonth, UseYear} from "../contexts/calendar/CalendarContext.tsx";
import {useAuth} from "../contexts/authContext";


export function Salg({ showSalg, closeSalg, children }: SalgProp) {

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


    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        const uni = new MapUnique();
        const combined = rows.map((r) => {
            if (r.isLiv) {
                return {
                    ...r,
                    product: r.isLiv? "Liv": r.product
                };
            }
            return r;
        });

        const res = UniqueAdd(combined);
        let produkt: Map<string, number> = res.produkt;
        let mersalg: Map<string, number> = res.mersalg;
        produkt = uni.navn(produkt, true)
        mersalg = uni.navn(mersalg, false)

        if(uid && year && month) await AddCommision(uid, year, month, produkt, mersalg);
        closeSalg();

    }

    return (
        <>
            <Produkter sal={sal} showProd={showProd} closeProd={() => setShowProd(false)} children={undefined}/>
            <form className="salgBox" onSubmit={handleRegister}>
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
                    <TableComp data={inputs} rows={rows} setRows={setRows} />
                </div>
                <button type="submit" className="sellbby">Registrer</button>
                {children}
                <button className="lukk" onClick={closeSalg}>X</button>
            </form>
        </>
    )
}

export default Salg;