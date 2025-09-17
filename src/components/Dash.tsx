import {useEffect, useState} from "react";
import {doSignOut} from "../firebase/auth.ts";
import {useNavigate} from "react-router-dom";
import { CreatePrivSale } from "./CreatePrivSale.tsx";
import {useProdex} from "../contexts/productContext/Prodex.tsx";
import {UseMonth, UseYear} from "../contexts/calendar/CalendarContext.tsx";
import {NorskKalender} from "../contexts/calendar/NorskKalender.ts";
import {useAuth} from "../contexts/authContext";
import {GetCustomers, GetWages} from "../firebase/firestore.ts";
import {MakeWage} from "../feature/MakeWage.ts";
import livboye from "../assets/images/livboye.jpg";
import {RemoveSalg} from "./RemoveSalg.tsx";
import {PrivateObject} from "../assets/type/PrivateObject.ts";
import {
    UseShowCoorpCreateRemove,
    UseShowCoorpCreateSale,
    UseShowPrivCreateRemove,
    UseShowPrivCreateSale
} from "../contexts/windowContext/privSaleContext.tsx";
import PrivateDash from "./PrivateDash.tsx";
import {UseShowAllSale, UseShowCoorpSale, UseShowPrivateSale} from "../contexts/windowContext/typeOfDash.tsx";
import CoorpDash from "./CoorpDash.tsx";
import AllDash from "./AllDash.tsx";
import CreateCoorpSale from "./CreateCoorpSale.tsx";
import {CoorpObject} from "../assets/type/CoorpObject.ts";
import {MakeCoorpWage} from "../feature/MakeCoorpWage.ts";

export function Dash() {
    const {setInputs} = useProdex();
    const [ refresh, setRefresh ] = useState(0);
    const navigate = useNavigate();
    const { showPrivCreateSale, setShowPrivCreateSale } = UseShowPrivCreateSale();
    const { showPrivCreateRemove, setShowPrivCreateRemove } = UseShowPrivCreateRemove();
    const { showCoorpCreateSale, setShowCoorpCreateSale } = UseShowCoorpCreateSale();
    const { showCoorpCreateRemove, setShowCoorpCreateRemove } = UseShowCoorpCreateRemove();
    const {showPrivateSale, setShowPrivateSale} = UseShowPrivateSale();
    const {showCoorpSale, setShowCoorpSale} = UseShowCoorpSale();
    const {showAllSale, setShowAllSale} = UseShowAllSale();
    const { year, setYear } = UseYear();
    const { month, setMonth } = UseMonth();
    const { uid } = useAuth();
    const [ tableToShow, setTableToShow ] = useState<number>(0);
    const [customer, setCustomer] = useState<{ [key: string]: object } | never [] | undefined>({});
    const [isLoading, setIsLoading] = useState(false);
    const [ privateTabell, setPrivateTabell ] = useState<{ [key: string]: number }>({});
    const [ coorpTabell, setcoorpTabell ] = useState<{ [key: string]: number }>({});
    const monthBtn = "bg-white text-center w-full h-7 font-['Albert_Sans'] text-2xl font-light shadow hover:bg-gray-100";
    const [privateWages, setPrivateWages] = useState<Map<string, number>>(new Map());
    const [coorpWages, setCoorpWages] = useState<Map<string, number>>(new Map());
    let res: Map<string, number> = new Map<string, number>();
    let coorpRes: Map<string, number> = new Map<string, number>();
    res = new Map(Object.entries(privateTabell));
    coorpRes = new Map(Object.entries(coorpTabell));


    useEffect(() => {
       const whatToShow = () => {

           if(tableToShow === 0) {
               setShowPrivateSale(true);
               setShowCoorpSale(false);
               setShowAllSale(false);
           }
           else if(tableToShow === 1) {
               setShowPrivateSale(false);
               setShowCoorpSale(true);
               setShowAllSale(false);
           }
           else if(tableToShow === 2) {
               setShowPrivateSale(false);
               setShowCoorpSale(false);
               setShowAllSale(true);
           }
       };
       whatToShow();
    }, [tableToShow, setShowCoorpSale, setShowAllSale, setShowPrivateSale]);
    
    useEffect(() => {
        const loadTabellData = async () => {
            if (!uid || !year || !month) return;

            try {
                setCustomer({});
                setIsLoading(true);
                const privData = await GetWages(uid, year, month);
                const customers:{[key:string]:object} | never[] | undefined = await GetCustomers(uid, year, month);
                if (customers) setCustomer(customers);
                if (privData) {
                    setPrivateTabell(privData);
                    setcoorpTabell(privData);
                }
                else {
                    setPrivateTabell({});
                    setcoorpTabell({});
                }
            } catch (error) {
                console.error("Feil ved lasting av tabell:", error);
                setPrivateTabell({});
                setcoorpTabell({});
                setCustomer({});
            } finally {
                setIsLoading(false);
            }
        };
        loadTabellData();
    }, [uid, year, month, refresh]);

    useEffect(() => {
        const calculateWages = async () => {
            try {
                if (!uid) return;
                const result = await MakeWage({ tabell: privateTabell, uid });
                const coorpResult = await MakeCoorpWage({ tabell: coorpTabell, uid });
                setPrivateWages(result);
                setCoorpWages(coorpResult);
            } catch (e) {
                console.error("Error calculating privateWages:", e);
            }
        };
        calculateWages();
    }, [privateTabell, refresh]);

    const getCoorpValue = (key: string) => coorpWages.get(key) || "";
    const getCoorpCount = (key: string) => coorpRes.get(key) || "";

    const getValue = (key: string) => privateWages.get(key) || ""
    const getCount = (key: string) => res.get(key) || ""
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
    privateWages.forEach((value) => {
        skadeProv += value;
    });

    skadeProv -= livProv;


    const numClean = (n: number) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    const totalProv: number = skadeProv + hpBonusSum + femmern + livProv;

    const privatSalg = new PrivateObject(
        {getValue, getCount,
            hpBonus, totalLiv,
            husTotal, bilTotal,
            hppTotal, hpTotal,
            skadeProv, livProv, totalProv,
        year, month});

    const coorpSalg = new CoorpObject ({getCoorpValue, getCoorpCount, year, month});

    function click (value: number) {
        setYear(value);
    }

    function mclick (value: number) {
        setMonth(NorskKalender(value));
    }

    function clickOnTable (value: number) {
        setTableToShow(value);
    }

    return (
        <>
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/50">
                    <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
        <CreatePrivSale showPrivSaleWindow={showPrivCreateSale} closePrivSale={() => { setShowPrivCreateSale(false); setInputs({}); setRefresh(prev => prev +1); } } children={undefined}/>
            <RemoveSalg showRemove={showPrivCreateRemove} closeRemove={() => { setShowPrivCreateRemove(false); setInputs({}); setRefresh(prev => prev +1); }} children={undefined}/>
            <CreateCoorpSale showCoorpSaleWindow={showCoorpCreateSale} closeCoorpSale={() => { setShowCoorpCreateSale(false); setInputs({}); setRefresh(prev => prev +1); } } children={undefined}/>
            <div className="flex justify-between pl-10 pr-10 gap-13 max-w-screen min-w-screen max-h-screen min-h-screen font-['Albert_Sans'] bg-white/70 bg-blend-lighten bg-cover" style={{ backgroundImage: `url(${livboye})` }}>
                <div className="relative flex-col mb-13 mt-13 pr-2 pl-2 item-center w-42 max-h-screen rounded bg-white/50 backdrop-blur-sm shadow font-['Albert_Sans']">
                    <div className="relative w-full inline-block group pt-5">
                        <button className="border-none bg-white w-[90%] h-[35px] mx-[5%] font-['Albert_Sans'] text-[20px] font-light shadow-md hover:bg-gray-200 transition">{year} {'\u{2BC6}'}</button>
                        <div className="absolute hidden bg-[#f1f1f1] max-h-[80px] overflow-y-auto min-w-[170px] max-w-[170px] shadow-lg z-10 group-hover:block text-center">
                            <p className="hover:bg-white" onClick={() => click(2025)}>2025</p>
                            <p className="hover:bg-white" onClick={() => click(2026)}>2026</p>
                            <p className="hover:bg-white" onClick={() => click(2027)}>2027</p>
                            <p className="hover:bg-white" onClick={() => click(2028)}>2028</p>
                        </div>
                    </div>
                    <div className="flex flex-col mt-22 mb-10 gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-auto ">
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
                    <div className="flex flex-col self-center pl-4 pb-7 w-full max-w-3/5 max-h-screen h-3/5 mt-13 mb-13 rounded bg-white shadow font-['Albert_Sans'] relative">
                        <div className="flex self center min-h-10 w-full bg-red-500">
                            <button className={`w-full border-2 border-black hover:bg-amber-200 hover:cursor-pointer ${showPrivateSale ? 'bg-blue-400' : ''}`}
                                    onClick={() => clickOnTable(0)}>Privat</button>
                            <button className={`w-full border-2 border-black hover:bg-amber-200 hover:cursor-pointer ${showCoorpSale ? 'bg-blue-400' : ''}`}
                                    onClick={() => clickOnTable(1)}>Bedrift</button>
                            <button className={`w-full border-2 border-black hover:bg-amber-200 hover:cursor-pointer ${showAllSale ? 'bg-blue-400' : ''}`}
                                    onClick={() => clickOnTable(2)}>Total</button>
                        </div>
                        <PrivateDash {...privatSalg}></PrivateDash>
                        <CoorpDash {...coorpSalg} />
                        <AllDash {...privatSalg}></AllDash>
                    </div>
                    <div className="flex flex-col items-center">
                <button className="shadow min-w-30 max-w-30 mt-5 leading-none pl-2 pr-2 h-10 text-xl font-['Albert_Sans'] font-medium bg-white/50 backdrop-blur-sm duration-700 ease-in-out hover:rounded-md hover:cursor-pointer hover:bg-red-800 hover:text-white hover:duration-500 hover:scale-101"
                        onClick={() => {
                            doSignOut().then(() => {
                                navigate('/')
                            })
                        }}>Logg ut</button>
                        <div className="flex flex-col mt-auto mb-auto shadow bg-white rounded-r-sm h-70 w-50 p-2">
                            <p className="h-max w-full border-b border-black text-xl font-['Albert_Sans']">Kunder</p>
                            <div className="flex items-center justify-center h-full w-full">
                                <ul className="flex flex-col h-full w-full font-light font-['Albert_Sans'] overflow-y-auto overflow-x-hidden">
                                    {customer && Object.entries(customer).map(([key, value], index) => (
                                        <li key={index} className="mb-4 group relative cursor-pointer">
                                            <span>{key}</span>
                                            <div className="absolute top-0 ml-13 w-max p-2 rounded bg-gray-200 text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                {Object.entries(value).map(([fieldKey, fieldValue]) => (
                                                    <div key={fieldKey}>
                                                        <strong>{fieldKey}:</strong> {String(fieldValue)}
                                                    </div>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
            </div>
            </div>
        </>
    )
}

export default Dash;