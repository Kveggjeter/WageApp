import baat from "../assets/images/baat_24.gif";
import person from "../assets/images/barnogvoksne_24.gif";
import dyr from "../assets/images/dyr_24.gif";
import hus from "../assets/images/husoghjem_24.gif";
import bil from "../assets/images/kjoeretoey_24.gif";
import annet from "../assets/images/nliprivat_24.gif";
import nordea from "../assets/images/nordealogo_24.gif";
import reise from "../assets/images/reise_24.gif";
import Produkter from "./Produkter.tsx";
import React, {useState} from "react";
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
    const [isLoading, setIsLoading] = useState(false);
    const imgBulkImg = "w-6 h-6";
    const listLi = "font-['Albert_Sans'] font-light items-center gap-2"
    const phover = "hover:cursor-pointer hover:text-green-500"

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
        setIsLoading(true);
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
        setIsLoading(false);
        closeSalg();

    }

    return (
        <>
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/50">
                    <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
            <Produkter sal={sal} showProd={showProd} closeProd={() => setShowProd(false)} children={undefined}/>
            <form className="flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] bg-white border border-black z-10"
                  onSubmit={handleRegister}>
                <ul className="pt-5 pl-4 flex flex-col gap-4">
                    <li className={listLi}>
                        <img className={imgBulkImg} src={hus} alt="hus"/>
                        <p className={phover} onClick={() => click("hus")}>Hus og innbo</p>
                    </li><li className={listLi}>
                        <img className={imgBulkImg} src={bil} alt="bil"/>
                        <p className={phover} onClick={() => click("bil")}>Kjøretøy</p>
                    </li><li className={listLi}>
                        <img className={imgBulkImg} src={person} alt="person"/>
                        <p className={phover} onClick={() => click("person")}>Barn og voksne</p>
                    </li><li className={listLi}>
                        <img className={imgBulkImg} src={nordea} alt="nordea"/>
                        <p className={phover} onClick={() => click("nordea")}>Nordea</p>
                    </li><li className={listLi}>
                        <img className={imgBulkImg} src={baat} alt="båt"/>
                        <p className={phover} onClick={() => click("baat")}>Båt</p>
                    </li><li className={listLi}>
                        <img className={imgBulkImg} src={reise} alt="reise"/>
                        <p className={phover} onClick={() => click("reise")}>Reise</p>
                    </li><li className={listLi}>
                        <img className={imgBulkImg} src={dyr} alt="dyr"/>
                        <p className={phover} onClick={() => click("dyr")}>Dyr</p>
                    </li><li className={listLi}>
                        <img className={imgBulkImg} src={annet} alt="annet"/>
                        <p className={phover} onClick={() => click("annet")}>Annet</p>
                    </li>
                </ul>
                <div className="font-['Albert_Sans'] relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-5 ml-5 mb-20 mr-3">
                    <TableComp data={inputs} rows={rows} setRows={setRows} />
                </div>
                <button type="submit" className="font-['Albert_Sans'] absolute right-0 bottom-0 mr-2 mb-2 rounded-md w-30 h-10 text-xl font-light text-white bg-green-700 ease-in-out duration-500 hover:duration-500 hover:bg-green-500 hover:cursor-pointer">Registrer</button>
                {children}
                <button className="absolute w-5 h-5 text-[18px] right-0 top-0 text-center leading-none items-center justify-center duration-700 bg-red-800 ease-in-out hover:scale-105 hover:duration-500 hover:ease-in-out hover:text-white" onClick={closeSalg}>X</button>
            </form>
        </>
    )
}

export default Salg;