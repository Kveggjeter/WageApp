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
import {MainTable} from "./MainTable.tsx";

export function Dash() {
    const {setInputs} = useProdex();
    const navigate = useNavigate();
    const [ showSalg, setShowSalg ] = useState(false);
    const { year, setYear } = UseYear();
    const { month, setMonth } = UseMonth();
    const { uid } = useAuth();
    const [ tabell, setTabell ] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const loadTabellData = async () => {
            if (!uid || !year || !month) return;

            try {
                const data = await GetWages(uid, year, month);
                if (data) {
                    setTabell(data);
                } else {
                    setTabell({});
                }
            } catch (error) {
                console.error("Feil ved lasting av tabell:", error);
                setTabell({});
            }
        };
        loadTabellData();
    }, [uid, year, month]);

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
                                <MainTable data={tabell} />
                        </div>
                        <div className="miDash">
                            <div className="factBox">
                                <div className="hpBonus">
                                    <h3 id="hpBonus">HP bonus</h3>
                                    <h2 id="bonusNum">17/23</h2>
                                </div>
                                <div className="sgNor">
                                    <h3 id="sgNor">Salgsum Nordea</h3>
                                    <h2 id="sgNum">78 032NOK</h2>
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
                                    <h3 id="hpHus">11 Hus</h3>
                                    <h3 id="hpBil">20 bil</h3>
                                    <h3 id="hphpp">15 HPP</h3>
                                </div>
                                <div className="totalHp">
                                    <h1 id="totalHp">46HP</h1>
                                </div>
                            </div>
                            <div className="skadeBulk">
                                <h3 id="provSkade">Provisjon skade</h3>
                                <h1 id="salgSkadeSum">31 512NOK</h1>
                            </div>
                            <div className="livBulk">
                                <h3 id="provLiv">Provisjon Nordea</h3>
                                <h1 id="salgLivSum">27 827NOK</h1>
                            </div>
                            <div className="totalProvSum">
                                <h3 id="totalProvSum">Total provisjon</h3>
                                <h1 id="totalProvSalgSum">98 421NOK</h1>
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