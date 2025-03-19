import "../assets/dash.css"
import {doSignOut} from "../firebase/auth.ts";
import {useNavigate} from "react-router-dom";

export function Dash() {
    const navigate = useNavigate();

    return (
        <>
            <div className="cont">
                <div className="monthPicker">
                    <div className="dropdown">
                        <button className="dropbtn">2025 {'\u{2BC6}'}</button>
                        <div className="dropdown-content">
                            <p>2024</p>
                            <p>2025</p>
                            <p>2026</p>
                            <p>2027</p>
                        </div>
                    </div>
                    <div className="monthList">
                        <button className="monthBtn" id="january">Januar</button>
                        <button className="monthBtn" id="february">Februar</button>
                        <button className="monthBtn" id="march">Mars</button>
                        <button className="monthBtn" id="april">April</button>
                        <button className="monthBtn" id="may">Mai</button>
                        <button className="monthBtn" id="june">Juni</button>
                        <button className="monthBtn" id="july">Juli</button>
                        <button className="monthBtn" id="august">August</button>
                        <button className="monthBtn" id="september">September</button>
                        <button className="monthBtn" id="october">Oktober</button>
                        <button className="monthBtn" id="november">November</button>
                        <button className="monthBtn" id="desember">Desember</button>
                    </div>
                </div>
                    <div className="dashBox">
                        <div className="leftDash">
                            <h2 id="dateNow">2025 Januar</h2>
                            <table className="table">
                                <tr id="tableHeader">
                                    <th>Produkt</th>
                                    <th>Nysalg</th>
                                    <th>Mersalg</th>
                                    <th className="prov">Provisjon</th>
                                </tr>
                                <tr id="nordeaLine">
                                    <th className="coll" id="nordea">Nordea</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="husLine">
                                    <th className="coll" id="hus">Hus</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr  id="kaskoLine">
                                    <th className="coll" id="kasko">Bil(1)</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="delLine">
                                    <th className="coll" id="delkasko">Bil(2)</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="hppLine">
                                    <th className="coll" id="hpp">HPP</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="sp1_line">
                                    <th className="coll" id="sp1">SP 1</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="sp2_line">
                                    <th className="coll" id="sp2">SP 2</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="sp3_line">
                                    <th className="coll" id="sp3">SP 3</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="sp4_line">
                                    <th className="coll" id="sp4">SP 4</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="ekstraLine">
                                    <th className="coll" id="ekstra">Ekstradekning</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                                <tr id="sectorLine">
                                    <th className="coll" id="sector">Sector</th>
                                    <th className="ny"></th>
                                    <th></th>
                                    <th className="prov"></th>
                                </tr>
                            </table>
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
                                <button className="bb" id="addSale">Legg til salg</button>
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