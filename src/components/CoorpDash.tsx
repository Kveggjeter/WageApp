import {UseShowCoorpCreateSale, UseShowPrivCreateRemove
} from "../contexts/windowContext/privSaleContext.tsx";
import {UseShowCoorpSale} from "../contexts/windowContext/typeOfDash.tsx";
import MainCoorpTable from "./MainCoorpTable.tsx";
import {CoorpObject} from "../assets/type/CoorpObject.ts";
import {UseMonth, UseYear} from "../contexts/calendar/CalendarContext.tsx";
import {NumClean} from "../feature/TableUtils.ts";


export function CoorpDash(o: CoorpObject)  {
    const { setShowCoorpCreateSale } = UseShowCoorpCreateSale();
    const { setShowPrivCreateRemove } = UseShowPrivCreateRemove();
    const { showCoorpSale } = UseShowCoorpSale();
    const { year  } = UseYear();
    const { month } = UseMonth();

    if(!showCoorpSale) {return null}

    return(
        <div className="flex flex-row">
            <div className="flex flex-col self-start">
                <h2 className="text-2xl w-full pt-4 pb-1 border-b-2 border-grey-200 mb-2">{year} {month}</h2>
                <MainCoorpTable {...o} />
            </div>
            <div className="flex flex-col ml-auto text-center ">
                <div className="flex flex-col self-center gap-6 mt-7 p-2 font-['Albert_Sans'] text-xl font-light md:max-xl:flex-col md:max-xl:max-w-30 md:max-xl:self-center">
                    <div className="flex-1 md:max-xl:border-r-0 md:max-xl:pb-2 md:max-xl:mb-2 md:max-xl:max-w-30">
                        <h3 className="hpBonus">Gjenstående til bonus</h3>
                        <h2 className="text-2m">
                            {NumClean(o.coorpTotalSalg - 200000)}{' '}
                            <span className="font-bold">200K</span>
                        </h2>
                        <h2 className="text-2m">
                            {NumClean(o.coorpTotalSalg - 250000)}{' '}
                            <span className="font-bold">250K</span>
                        </h2>
                    </div>
                    <div className="flex-1 md:max-xl:max-w-30">
                        <h3 id="sgNor">Salgsum ITP</h3>
                        <h2 className="text-3xl">0 NOK</h2>
                    </div>
                </div>
                <div className="flex gap-2 mt-auto ml-2 mr-4 font-['Albert_Sans'] rounded-lg">
                    <button
                        className="max-w-full pl-2 pr-2 text-center leading-none h-8 text-center text-lg font-light text-white bg-green-600 ease-in-out duration-600 hover:cursor-pointer hover:bg-green-500 hover:ease-in-out hover:duration-500"
                        id="addSale"
                        onClick={()=>setShowCoorpCreateSale(true)}
                    >Salg</button>
                    <button className="max-w-full pl-2 pr-2 h-8 leading-none text-white italic text-lg font-extralight bg-red-800 duration-500 ease-in-out hover:cursor-pointer hover:bg-red-700 hover:ease-in-out hover:duration-500"
                            id="removeSale"
                            onClick={()=>setShowPrivCreateRemove(true)}
                    >Fjern salg</button>
                </div>
            </div>
            <div className="flex flex-col overflow-scroll pr-5 items-end mt-5 ml-auto text-center">
                <div className="flex flex-col justify-center items-center border-b-3 border-gray-200">
                    <div className="font-['Albert_Sans'] font-light text-xl flex flex-row justify-center gap-2">
                        <h3 id="hpHus">Salgssum</h3>
                    </div>
                    <div className="text-4xl mt-2">
                        <h1 id="totalHp">{NumClean(o.coorpTotalSalg)}</h1>
                    </div>
                </div>
                <div className="mb-7 border-b-3 border-gray-200">
                    <h3 id="provSkade">Provisjon Næring</h3>
                    <h1 className="text-4xl" id="salgSkadeSum">{NumClean(o.coorpTotal)} NOK</h1>
                </div>
                <div className="mb-7 border-b-3 border-gray-200">
                    <h3 id="provLiv">Provisjon ITP</h3>
                    <h1 className="text-4xl" id="salgLivSum">{NumClean(o.provisjonItp)} NOK</h1>
                </div>
                <div className="mt-auto mb-2 border-b-5 border-black">
                    <h3 id="totalProvSum">Total provisjon</h3>
                    <h1 className="text-5xl font-semibold" id="totalProvSalgSum">{NumClean(o.coorpFinalTotal)} NOK</h1>
                </div>
            </div>
        </div>
    )
}

export default CoorpDash;