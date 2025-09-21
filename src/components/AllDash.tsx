import {UseShowAllSale} from "../contexts/windowContext/typeOfDash.tsx";
import MainAllTable from "./MainAllTable.tsx";
import {GetThoseAllProps} from "../assets/type/GetThoseProps.ts";
import {UseMonth, UseYear} from "../contexts/calendar/CalendarContext.tsx";
import {NumClean} from "../feature/TableUtils.ts";



export function AllDash({privObject, coorpObject}: GetThoseAllProps) {
    const { showAllSale } = UseShowAllSale();
    const { year } = UseYear();
    const { month } = UseMonth();
    if(!showAllSale) {return null}

    return(
        <div className="flex flex-row">
            <div className="flex flex-col self-start">
                <h2 className="text-2xl w-full pt-4 pb-1 border-b-2 border-grey-200 mb-2"> {year} {month}</h2>
                <MainAllTable privObject={privObject} coorpObject={coorpObject} />
            </div>
            <div className="flex flex-col ml-auto text-center ">
                <div className="flex flex-col self-center gap-6 mt-7 p-2 font-['Albert_Sans'] text-xl font-light md:max-xl:flex-col md:max-xl:max-w-30 md:max-xl:self-center">
                    <div className="flex-1 md:max-xl:border-r-0 md:max-xl:pb-2 md:max-xl:mb-2 md:max-xl:max-w-30">
                        <h3 className="hpBonus">Salgssum Næring</h3>
                        <h2 className="text-3xl">{NumClean(coorpObject.coorpTotalSalg)} NOK</h2>
                    </div>
                    <div className="flex-1 md:max-xl:max-w-30">
                        <h3 id="sgNor">Salgsum Nordea</h3>
                        <h2 className="text-3xl">{NumClean(privObject.totalLiv)} NOK</h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-scroll pr-5 items-end mt-5 ml-auto text-center">
                <div className="flex flex-col justify-center items-center border-b-3 border-gray-200">
                    <div className="font-['Albert_Sans'] font-light text-xl flex flex-row justify-center gap-2">
                        <h3 id="hpHus">{~~coorpObject.nhp} Næring HP</h3>
                        <h3 id="hpBil">{privObject.hpTotal} Privat HP</h3>
                        <h3 id="hphpp">{privObject.hppTotal} HPP</h3>
                    </div>
                    <div className="text-4xl mt-2">
                        <h1 id="totalHp">{~~privObject.hpTotal}</h1>
                    </div>
                </div>
                <div className="mb-7 border-b-3 border-gray-200">
                    <h3 id="provSkade">Provisjon Næring</h3>
                    <h1 className="text-4xl" id="salgSkadeSum">{NumClean(~~coorpObject.coorpFinalTotal)}NOK</h1>
                </div>
                <div className="mb-7 border-b-3 border-gray-200">
                    <h3 id="provLiv">Provisjon Privat</h3>
                    <h1 className="text-4xl" id="salgLivSum">{NumClean(~~privObject.totalProv)}</h1>
                </div>
                <div className="mt-auto mb-2 border-b-5 border-black">
                    <h3 id="totalProvSum">Total provisjon</h3>
                    <h1 className="text-5xl font-semibold" id="totalProvSalgSum">{NumClean(privObject.totalProv + coorpObject.coorpFinalTotal)}NOK</h1>
                </div>
            </div>
        </div>
    )
}

export default AllDash;