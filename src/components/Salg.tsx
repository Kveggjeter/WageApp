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
import {sak} from "../sak.ts";
import { SalgProp } from "../assets/type/SalgProp.ts";
import {useProdex} from "../contexts/productContext/Prodex.tsx";
import TableComp from "./TableComp.tsx";
import {RowData} from "../assets/type/TableProp.ts";
import {useSales} from "../contexts/productContext/SalesContext.tsx";


export function Salg({ showSalg, closeSalg, children }: SalgProp) {
    const [sal, setSal] = useState<string[] | null>(null);
    const [showProd, setShowProd] = useState(false);
    const { inputs } = useProdex();
    const { setSales } = useSales();
    const [rows, setRows] = useState<RowData[]>([]);

    if (!showSalg) {return null}

    function click(value: string) {
        const saker: string[] | null = sak(value);
        setSal(null);
        setSal(saker);
        setShowProd(true);
    }

    function handleRegister() {
        console.log("inputs:", inputs);
        console.log("rows:", rows);
        const combined = rows.map((r) => ({
            ...r,
            count: inputs[r.product] ?? 0,
        }));
        setSales(combined);
        console.log("combined:", combined);
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