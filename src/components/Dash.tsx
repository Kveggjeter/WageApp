import {useEffect, useState} from "react";
import "../assets/dash.css"
import {doSignOut} from "../firebase/auth.ts";
import {useNavigate} from "react-router-dom";
import { Salg } from "../components/Salg.tsx";
import {useProdex} from "../contexts/productContext/Prodex.tsx";
import {UseMonth, UseYear} from "../contexts/calendar/CalendarContext.tsx";
import {NorskKalender} from "../contexts/calendar/NorskKalender.ts";
import {useAuth} from "../contexts/authContext";
import {GetWages} from "../firebase/firestore.ts";
import MainTable from "./MainTable.tsx";
import {MakeWage} from "../feature/MakeWage.ts";

export function Dash() {
    const {setInputs} = useProdex();
    const navigate = useNavigate();
    const [ showSalg, setShowSalg ] = useState(false);
    const { year, setYear } = UseYear();
    const { month, setMonth } = UseMonth();
    const { uid } = useAuth();
    const [ tabell, setTabell ] = useState<{ [key: string]: number }>({});
    const [wages, setWages] = useState<Map<string, number>>(new Map());
    let res: Map<string, number> = new Map<string, number>();
    res = new Map(Object.entries(tabell));

    useEffect(() => {
        const loadTabellData = async () => {
            if (!uid || !year || !month) return;

            try {
                const data = await GetWages(uid, year, month);
                if (data) setTabell(data);
                else setTabell({});
            } catch (error) {
                console.error("Feil ved lasting av tabell:", error);
                setTabell({});
            }
        };
        loadTabellData();
    }, [uid, year, month]);

    useEffect(() => {
        const calculateWages = async () => {
            try {
                const result = await MakeWage({ tabell });
                setWages(result);
                console.log("Calculated wages:", result);
            } catch (e) {
                console.error("Error calculating wages:", e);
            }
        };
        calculateWages();
    }, [tabell]);

    const getValue = (key: string) => wages.get(key) || ""
    const getCount = (key: string) => res.get(key) || ""
    const sjekk = wages.get("livSum_mer");
    console.log("se her " + sjekk);
    const husTotal =
        +getCount("hpv_mer") + +getCount("hpv_ny") +
        +getCount("hpv_udf_mer") + +getCount("hpv_udf_ny");
    const bilTotal =
        +getCount("hp1_ny") + +getCount("hp1_mer") +
        +getCount("hp2_ny") + +getCount("hp1_udf_ny");
    const hppTotal = +getCount("hpp_ny") + +getCount("hpp_mer");

    const hpTotal = husTotal + bilTotal + hppTotal;
    let hpBonus = hpTotal - 17;
    let hpBonusSum = 0;
    if (hpBonus <= 0) {
            hpBonus = 0;
        } else hpBonusSum = hpBonus * 450;
    let femmern: number = 0;
    if (hpBonus >= 23) femmern = 5000;

    const livProv: number = +getValue("livSum_ny") + +getValue("livSum_mer");
    const totalLiv: number = (4 * +getValue("livSum_ny")) + ((+getValue("livSum_mer")/18) * 100)
    let skadeProv = 0;
    wages.forEach((value) => {
        skadeProv += value;
    });

    skadeProv -= livProv;


    const numClean = (n: number) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    const totalProv: number = skadeProv + hpBonusSum + femmern;

    function click (value: number) {
        setYear(value);
    }

    function mclick (value: number) {
        setMonth(NorskKalender(value));
    }
    
    return (
        <>
        <Salg showSalg={showSalg} closeSalg={() => { setShowSalg(false); setInputs({}) } } children={undefined}/>
            <div className="cont">
                <div className="monthPicker">
                    <div className="dropdown">
                        <button className="dropbtn">{year} {'\u{2BC6}'}</button>
                        <div className="dropdown-content">
                            <p onClick={() => click(2025)}>2025</p>
                            <p onClick={() => click(2026)}>2026</p>
                            <p onClick={() => click(2027)}>2027</p>
                            <p onClick={() => click(2028)}>2028</p>
                        </div>
                    </div>
                    <div className="monthList">
                        <button className="monthBtn" id="january" onClick={() => mclick(0)}>Januar</button>
                        <button className="monthBtn" id="february" onClick={() => mclick(1)}>Februar</button>
                        <button className="monthBtn" id="march" onClick={() => mclick(2)}>Mars</button>
                        <button className="monthBtn" id="april" onClick={() => mclick(3)}>April</button>
                        <button className="monthBtn" id="may" onClick={() => mclick(4)}>Mai</button>
                        <button className="monthBtn" id="june" onClick={() => mclick(5)}>Juni</button>
                        <button className="monthBtn" id="july" onClick={() => mclick(6)}>Juli</button>
                        <button className="monthBtn" id="august" onClick={() => mclick(7)}>August</button>
                        <button className="monthBtn" id="september" onClick={() => mclick(8)}>September</button>
                        <button className="monthBtn" id="october" onClick={() => mclick(9)}>Oktober</button>
                        <button className="monthBtn" id="november" onClick={() => mclick(10)}>November</button>
                        <button className="monthBtn" id="desember" onClick={() => mclick(11)}>Desember</button>
                    </div>
                </div>
                    <div className="dashBox">
                        <div className="leftDash">
                            <h2 id="dateNow">{year} {month}</h2>
                                <MainTable getValue={getValue} getCount={getCount} />
                        </div>
                        <div className="miDash">
                            <div className="factBox">
                                <div className="hpBonus">
                                    <h3 id="hpBonus">HP bonus</h3>
                                    <h2 id="bonusNum">{hpBonus}/23</h2>
                                </div>
                                <div className="sgNor">
                                    <h3 id="sgNor">Salgsum Nordea</h3>
                                    <h2 id="sgNum">{numClean(totalLiv)}NOK</h2>
                                </div>
                            </div>
                            <div className="btnBulk">
                                <button
                                    className="bb" 
                                    id="addSale"
                                    onClick={()=>setShowSalg(true)}
                                    >Legg til salg</button>
                                <button className="bb" id="removeSale">Fjern salg</button>
                            </div>
                        </div>
                        <div className="rightDash">
                            <div className="hpBulk">
                                <div className="hpCount">
                                    <h3 id="hpHus">{husTotal} Hus</h3>
                                    <h3 id="hpBil">{bilTotal} bil</h3>
                                    <h3 id="hphpp">{hppTotal} HPP</h3>
                                </div>
                                <div className="totalHp">
                                    <h1 id="totalHp">{hpTotal}</h1>
                                </div>
                            </div>
                            <div className="skadeBulk">
                                <h3 id="provSkade">Provisjon skade</h3>
                                <h1 id="salgSkadeSum">{numClean(~~skadeProv)}NOK</h1>
                            </div>
                            <div className="livBulk">
                                <h3 id="provLiv">Provisjon Nordea</h3>
                                <h1 id="salgLivSum">{numClean(~~livProv)}</h1>
                            </div>
                            <div className="totalProvSum">
                                <h3 id="totalProvSum">Total provisjon</h3>
                                <h1 id="totalProvSalgSum">{numClean(totalProv)}NOK</h1>
                            </div>
                        </div>
                    </div>
                <button id="logout"
                        onClick={() => {
                            doSignOut().then(() => {
                                navigate('/')
                            })
                        }}>Logg ut</button>
            </div>
        </>
    )
}

export default Dash;