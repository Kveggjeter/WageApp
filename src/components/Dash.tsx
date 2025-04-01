import {useEffect, useState} from "react";
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
import livboye from "../assets/images/livboye.jpg";
import {RemoveSalg} from "./RemoveSalg.tsx";

export function Dash() {
    const {setInputs} = useProdex();
    const [ refresh, setRefresh ] = useState(0);
    const navigate = useNavigate();
    const [ showSalg, setShowSalg ] = useState(false);
    const [ showRemove, setShowRemove ] = useState(false);
    const { year, setYear } = UseYear();
    const { month, setMonth } = UseMonth();
    const { uid } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [ tabell, setTabell ] = useState<{ [key: string]: number }>({});
    const monthBtn = "bg-white text-center w-full h-7 font-['Albert_Sans'] text-2xl font-light shadow hover:bg-gray-100";
    const [wages, setWages] = useState<Map<string, number>>(new Map());
    let res: Map<string, number> = new Map<string, number>();
    res = new Map(Object.entries(tabell));

    useEffect(() => {
        const loadTabellData = async () => {
            if (!uid || !year || !month) return;

            try {
                setIsLoading(true);
                const data = await GetWages(uid, year, month);
                if (data) setTabell(data);
                else setTabell({});
            } catch (error) {
                console.error("Feil ved lasting av tabell:", error);
                setTabell({});
            } finally {
                setIsLoading(false);
            }
        };
        loadTabellData();
    }, [uid, year, month, refresh]);

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
    }, [tabell, refresh]);

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
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/50">
                    <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
        <Salg showSalg={showSalg} closeSalg={() => { setShowSalg(false); setInputs({}); setRefresh(prev => prev +1); } } children={undefined}/>
            <RemoveSalg showRemove={showRemove} closeRemove={() => { setShowRemove(false); setInputs({}); setRefresh(prev => prev +1); }} children={undefined}/>
            <div className="overflow-hidden flex items-center justify-center gap-15 w-screen min-h-screen font-['Albert_Sans'] bg-white/70 bg-blend-lighten bg-cover" style={{ backgroundImage: `url(${livboye})` }}>
                <div className="relative flex flex-col mt-auto mb-13 pl-2 pr-2 item-center w-42 h-11/12 rounded bg-white/50 backdrop-blur-sm shadow font-['Albert_Sans']">
                    <div className="relative w-full inline-block group pt-5">
                        <button className="border-none bg-white w-[90%] h-[35px] mx-[5%] font-['Albert_Sans'] text-[20px] font-light shadow-md hover:bg-gray-200 transition">{year} {'\u{2BC6}'}</button>
                        <div className="absolute hidden bg-[#f1f1f1] max-h-[80px] overflow-y-auto min-w-[170px] max-w-[170px] shadow-lg z-10 group-hover:block text-center">
                            <p className="hover:bg-white" onClick={() => click(2025)}>2025</p>
                            <p className="hover:bg-white" onClick={() => click(2026)}>2026</p>
                            <p className="hover:bg-white" onClick={() => click(2027)}>2027</p>
                            <p className="hover:bg-white" onClick={() => click(2028)}>2028</p>
                        </div>
                    </div>
                    <div className="flex flex-col mt-22 mb-10 gap-6 ">
                        <button className={monthBtn} id="january" onClick={() => mclick(0)}>Januar</button>
                        <button className={monthBtn} id="february" onClick={() => mclick(1)}>Februar</button>
                        <button className={monthBtn} id="march" onClick={() => mclick(2)}>Mars</button>
                        <button className={monthBtn} id="april" onClick={() => mclick(3)}>April</button>
                        <button className={monthBtn} id="may" onClick={() => mclick(4)}>Mai</button>
                        <button className={monthBtn} id="june" onClick={() => mclick(5)}>Juni</button>
                        <button className={monthBtn} id="july" onClick={() => mclick(6)}>Juli</button>
                        <button className={monthBtn} id="august" onClick={() => mclick(7)}>August</button>
                        <button className={monthBtn} id="september" onClick={() => mclick(8)}>September</button>
                        <button className={monthBtn} id="october" onClick={() => mclick(9)}>Oktober</button>
                        <button className={monthBtn} id="november" onClick={() => mclick(10)}>November</button>
                        <button className={monthBtn} id="desember" onClick={() => mclick(11)}>Desember</button>
                    </div>
                </div>
                    <div className="flex flex-row self-center w-9/12 h-150 mb-13 rounded bg-white shadow font-['Albert_Sans'] relative">
                        <div className="flex flex-col self-start pl-15 w-[35%]">
                            <h2 className="text-2xl w-38 pt-4 pb-1 border-b-2 border-grey-200 mb-2">{year} {month}</h2>
                                <MainTable getValue={getValue} getCount={getCount} />
                        </div>
                        <div className="flex flex-col pl-20 text-center max-w-fit">
                            <div className="flex flex-row self-center gap-6 mt-7 border-2 border-grey-200 border-dotted rounded-sm p-2 font-['Albert_Sans'] text-xl font-light md:max-xl:flex-col md:max-xl:max-w-30 md:max-xl:self-center">
                                <div className="flex-1 w-40 border-r-2 border-grey-200 border-dotted md:max-xl:border-r-0 md:max-xl:pb-2 md:max-xl:mb-2 md:max-xl:max-w-30">
                                    <h3 className="hpBonus">HP bonus</h3>
                                    <h2 className="text-3xl">{hpBonus}/23</h2>
                                </div>
                                <div className="flex-1 w-40 md:max-xl:max-w-30">
                                    <h3 id="sgNor">Salgsum Nordea</h3>
                                    <h2 className="text-3xl">{numClean(totalLiv)} NOK</h2>
                                </div>
                            </div>
                            <div className="flex gap-7 mt-auto ml-2 mr-4 mb-2 font-['Albert_Sans'] rounded-lg">
                                <button
                                    className="w-38 h-10 text-xl font-light text-white bg-green-600 ease-in-out duration-600 hover:cursor-pointer hover:bg-green-500 hover:ease-in-out hover:duration-500"
                                    id="addSale"
                                    onClick={()=>setShowSalg(true)}
                                    >Legg til salg</button>
                                <button className="mt-auto w-38 h-9 text-white italic text-lg font-extralight bg-red-800 duration-500 ease-in-out hover:cursor-pointer hover:bg-red-700 hover:ease-in-out hover:duration-500"
                                id="removeSale"
                                        onClick={()=>setShowRemove(true)}
                                >Fjern salg</button>
                            </div>
                        </div>
                        <div className="flex flex-col ml-auto pr-5 items-end w-[30%] mt-5 text-center">
                            <div className="flex flex-col justify-center items-center mb-7 border-b-3 border-gray-200">
                                <div className="font-['Albert_Sans'] font-light text-xl flex flex-row justify-center gap-2">
                                    <h3 id="hpHus">{husTotal} Hus</h3>
                                    <h3 id="hpBil">{bilTotal} Bil</h3>
                                    <h3 id="hphpp">{hppTotal} HPP</h3>
                                </div>
                                <div className="text-4xl mt-2">
                                    <h1 id="totalHp">{hpTotal}</h1>
                                </div>
                            </div>
                            <div className="mb-7 border-b-3 border-gray-200">
                                <h3 id="provSkade">Provisjon skade</h3>
                                <h1 className="text-4xl" id="salgSkadeSum">{numClean(~~skadeProv)}NOK</h1>
                            </div>
                            <div className="mb-7 border-b-3 border-gray-200">
                                <h3 id="provLiv">Provisjon Nordea</h3>
                                <h1 className="text-4xl" id="salgLivSum">{numClean(~~livProv)}</h1>
                            </div>
                            <div className="mt-auto mb-2 border-b-5 border-black">
                                <h3 id="totalProvSum">Total provisjon</h3>
                                <h1 className="text-5xl font-semibold" id="totalProvSalgSum">{numClean(totalProv)}NOK</h1>
                            </div>
                        </div>
                    </div>
                <button className="absolute shadow top-5 right-5 w-38 h-10 text-xl font-['Albert_Sans'] font-medium bg-white/50 backdrop-blur-sm duration-700 ease-in-out hover:rounded-md hover:cursor-pointer hover:bg-red-800 hover:text-white hover:duration-500 hover:scale-101"
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