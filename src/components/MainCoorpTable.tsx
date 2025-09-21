
import {CoorpObject} from "../assets/type/CoorpObject.ts";

const MainCoorpTable = (coorpObject: CoorpObject) => {
    const tableTd = "bg-gray-200 text-center pl-2 pr-2 pt-1"
    const valueCell = "text-center font-['Albert_Sans'] font-light border-b-1 border-r-1 border-dashed"
    const lastCell = "text-center font-['Albert_Sans'] font-light border-b-1 border-dashed"

    return (
        <table className="shadow-md">
            <thead>
            <tr className="bg-gray-300">
                <th className="p-2 font-['Albert_Sans'] font-normal">Produkt</th>
                <th className="p-2 font-['Albert_Sans'] font-normal">Antall</th>
                <th className="p-2 font-['Albert_Sans'] font-normal">Provisjon</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className={tableTd}>Ansvarforsikring</td>
                <td className={valueCell}>{coorpObject.ansvarforsikring}</td>
                <td className={lastCell}>{coorpObject.getRealWage(coorpObject.ansvarWage)}</td>
            </tr>
            <tr><td className={tableTd}>Bygg og løsøre</td>
                <td className={valueCell}>{coorpObject.bygg}</td>
                <td className={lastCell}>{coorpObject.getRealWage(coorpObject.byggWage)}</td>
            </tr>
            <tr><td className={tableTd}>Personprodukt</td>
                <td className={valueCell}>{coorpObject.person}</td>
                <td className={lastCell}>{coorpObject.getRealWage(coorpObject.personWage)}</td>
            </tr>
            <tr><td className={tableTd}>Kjøretøy</td>
                <td className={valueCell}>{coorpObject.bil}</td>
                <td className={lastCell}>{coorpObject.getRealWage(coorpObject.bilWage)}</td>
            </tr>
            <tr><td className={tableTd}>ITP</td>
                <td className={valueCell}>{coorpObject.itp}</td>
                <td className={lastCell}>{coorpObject.getRealWage(coorpObject.itpWage)}</td>
            </tr>
            <tr><td className={tableTd}>Avarn</td>
                <td className={valueCell}>{coorpObject.avarn}</td>
                <td className={lastCell}>{coorpObject.getRealWage(coorpObject.avarnWage)}</td>
            </tr>
            <tr><td className={tableTd}>Annet</td>
                <td className={valueCell}>{coorpObject.annet}</td>
                <td className={lastCell}>{coorpObject.annetTotal}</td>
            </tr>
            </tbody>
        </table>
    );
}


export default MainCoorpTable;