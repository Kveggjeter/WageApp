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
import {UseShowCoorpCreateSale,
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
import {PopulateCoorpTable, PopulatePrivTable} from "../feature/TableUtils.ts";
import {PrivateObject} from "../assets/type/PrivateObject.ts";

export function Dash() {
    const {setInputs} = useProdex();
    const [ refresh, setRefresh ] = useState(0);
    const navigate = useNavigate();
    const { showPrivCreateSale, setShowPrivCreateSale } = UseShowPrivCreateSale();
    const { showPrivCreateRemove, setShowPrivCreateRemove } = UseShowPrivCreateRemove();
    const { showCoorpCreateSale, setShowCoorpCreateSale } = UseShowCoorpCreateSale();
    const [showMonths, setShowMonths] = useState(false);
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
    const yearMonthBtn = `border-none bg-white px-3 h-[35px] font-['Albert_Sans']
        text-[20px] font-light shadow-md hover:bg-gray-200 transition
        max-md:min-w-10 max-md:w-20 max-md:text-[16px] max-md:bg-white`;
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


    const privatSalg: PrivateObject = PopulatePrivTable(privateWages, res);
    const coorpSalg: CoorpObject = PopulateCoorpTable(coorpWages, coorpRes);

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
                    <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin" />
                </div>
            )}
            <CreatePrivSale showPrivSaleWindow={showPrivCreateSale} closePrivSale={() => {
                setShowPrivCreateSale(false); setInputs({});
                setRefresh(prev => prev +1); } } children={undefined}/>
            <RemoveSalg showRemove={showPrivCreateRemove} closeRemove={() => {
                setShowPrivCreateRemove(false); setInputs({});
                setRefresh(prev => prev +1); }} children={undefined}/>
            <CreateCoorpSale showCoorpSaleWindow={showCoorpCreateSale} closeCoorpSale={() => {
                setShowCoorpCreateSale(false); setInputs({});
                setRefresh(prev => prev +1); } } children={undefined}/>
            <div className="flex justify-between pl-10 pr-10 gap-13 max-w-screen min-w-screen max-h-screen
             min-h-screen font-['Albert_Sans'] bg-white/70 bg-blend-lighten bg-cover max-md:flex-col
             max-md:p-0 max-md:m-0 max-md:gap-0"
             style={{ backgroundImage: `url(${livboye})` }}>
                <div className="relative overflow-auto [&::-webkit-scrollbar]:hidden
                 [-ms-overflow-style:none] [scrollbar-width:none] flex-col mb-13 mt-13 pr-2 pl-2 item-center
                  w-42 max-h-screen rounded bg-white/50 backdrop-blur-sm shadow font-['Albert_Sans']
                  max-md:min-w-screen max-md:max-h-20 max-md:absolute max-md:z-40 max-md:top-0 max-md:p-0 max-md:m-0
                  max-md:flex-row max-md:overflow-visible">
                    <div className="flex flex-col justify-center items-center w-full gap-2 mt-5 mb-4
                     max-md:gap-1 max-md:justify-center max-md:flex-wrap max-md:flex-row">
                        <div className="relative group max-md:relative">
                            <button className={`${yearMonthBtn} group-hover:bg-gray-200`}>
                                {year} {'\u{2BC6}'}
                            </button>
                            <div className="absolute hidden left-1/2 transform -translate-x-1/2
                             bg-[#f1f1f1] max-h-[80px] overflow-y-auto min-w-[150px]
                              max-w-[150px] shadow-lg z-10 group-hover:block text-center
                              max-md:min-w-10 max-md:w-20 max-md:text-[16px]">
                                {[2025, 2026, 2027, 2028].map(y => (
                                    <p key={y} className="hover:bg-white cursor-pointer"
                                    onClick={() => click(y)}>{y}</p>
                                ))}
                            </div>
                        </div>
                        <div className="max-md:relative max-md:group">
                            <button
                                className={`${yearMonthBtn} ${showMonths ? 'group-hover:bg-gray-200' : ''}
                                 hidden max-md:block max-md:w-24 `}
                                onClick={() => setShowMonths(!showMonths)}>
                            {month} {'\u{2BC6}'}
                        </button>
                            <div
                                className={`flex flex-col mt-22 mb-10 gap-6 
                                ${showMonths ? 'max-md:flex' : 'max-md:hidden'}
                                max-md:m-0 max-md:gap-0 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2
                                max-md:bg-[#f1f1f1] max-md:max-h-[80px] max-md:overflow-y-auto max-md:shadow-lg
                                max-md:x-10 max-md:text-center max-md:group-hover:block max-md:text-[16px]
                                max-md:min-w-10 max-md:w-20 max-md:absolute`}> {
                                    [
                                        'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
                                        'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
                                    ].map((m, index) => (
                                        <button key={index} className={`hover:bg-gray-200
                                         cursor-pointer rounded w-auto pl-7 pr-7 bg-white
                                         max-md:p-0`
                                        } id={m.toLowerCase()} onClick={() => mclick(index)}>{m}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="flex flex-col self-center pl-4 pb-7 w-full max-w-8/16 max-h-screen h-3/5 pt-6 mb-13 rounded bg-white shadow font-['Albert_Sans'] relative">
                        <div className="absolute flex self center left-0 top-0 min-h-8 w-full bg-white">
                            <button className={`w-1/10 border-1 border-black  hover:cursor-pointer ${showPrivateSale ? 'bg-red-500 hover:bg-red-300' : 'hover:bg-gray-100'}`}
                                    onClick={() => clickOnTable(0)}>Privat</button>
                            <button className={`w-1/10 border-1 border-black  hover:cursor-pointer ${showCoorpSale ? 'bg-red-500 hover:bg-red-300' : 'hover:bg-gray-100'}`}
                                    onClick={() => clickOnTable(1)}>Bedrift</button>
                            <button className={`w-1/10 border-1 border-black hover:cursor-pointer ${showAllSale ? 'bg-red-500 hover:bg-red-300' : 'hover:bg-gray-100'}`}
                                    onClick={() => clickOnTable(2)}>Total</button>
                        </div>
                        <PrivateDash {...privatSalg}></PrivateDash>
                        <CoorpDash {...coorpSalg} />
                        <AllDash privObject={privatSalg} coorpObject={coorpSalg} />
                    </div>
                    <div className="flex flex-col items-center">
                <button className="shadow min-w-30 max-w-30 mt-5 leading-none pl-2 pr-2 h-10 text-xl font-['Albert_Sans'] font-medium bg-white/50 backdrop-blur-sm duration-700 ease-in-out hover:rounded-md hover:cursor-pointer hover:bg-red-800 hover:text-white hover:duration-500 hover:scale-101"
                        onClick={() => {
                            doSignOut().then(() => {
                                navigate('/')
                            })
                        }}>Logg ut</button>
                        <div className="flex flex-col mt-auto mb-auto shadow bg-white rounded-r-sm h-70 w-50 p-2 pb-10">
                            <p className="h-max w-full border-b border-black text-xl font-['Albert_Sans']">Kunder</p>
                            <div className="flex items-center justify-center pt-2 h-full w-full">
                                <ul className="flex flex-col h-full w-full font-light font-['Albert_Sans'] overflow-y-auto overflow-x-hidden">
                                    {customer && Object.entries(customer).map(([key, value], index) => (
                                        <li key={index} className="mb-4 group relative cursor-pointer">
                                            <span>{key}</span>
                                            <div className="absolute top-0 w-max p-2 rounded bg-gray-200 text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-50 border border-red-500">
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