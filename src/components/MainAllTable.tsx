import {GetThoseAllProps} from "../assets/type/GetThoseProps.ts";

const MainAllTable = ({privObject, coorpObject}: GetThoseAllProps) => {
    const tableTd = "bg-gray-200 text-center pl-2 pr-2 pt-1"
    const valueCell = "text-center font-['Albert_Sans'] font-light border-b-1 border-r-1 border-dashed"
    const lastCell = "text-center font-['Albert_Sans'] font-light border-b-1 border-dashed"
    const itpValue: number = +coorpObject.getValue("itp");
    const avarnValue: number = +coorpObject.getValue("avarn");
    const sectorCount: number = +privObject.getCount("sector");
    const hppSum = +privObject.getValue("hpp_ny") + +privObject.getValue("hpp_mer");
    const livtotal = +privObject.getCount("liv_ny") + +privObject.getValue("liv_mer");
    const liv_prov = +privObject.getValue("livSum_mer") + +privObject.getValue("livSum_ny");

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
                <td className={tableTd}>Privat HP</td>
                <td className={valueCell}>{privObject.hpTotal}</td>
                <td className={lastCell}>{privObject.hpProduktProv}</td>
            </tr>
            <tr><td className={tableTd}>Privat HPP</td>
                <td className={valueCell}>{privObject.hppTotal}</td>
                <td className={lastCell}>{hppSum}</td>
            </tr>
            <tr><td className={tableTd}>Privat SP</td>
                <td className={valueCell}>{privObject.spCount}</td>
                <td className={lastCell}>{privObject.spValue}</td>
            </tr>
            <tr><td className={tableTd}>Nordea Liv</td>
                <td className={valueCell}>{livtotal}</td>
                <td className={lastCell}>{~~liv_prov}</td>
            </tr>
            <tr><td className={tableTd}>Næring HP</td>
                <td className={valueCell}>{~~coorpObject.nhp}</td>
                <td className={lastCell}>{coorpObject.coorpTotal}</td>
            </tr>
            <tr><td className={tableTd}>Nordea (ITP)</td>
                <td className={valueCell}>{coorpObject.itp}</td>
                <td className={lastCell}>{itpValue}</td>
            </tr>
            <tr><td className={tableTd}>Avarn</td>
                <td className={valueCell}>{coorpObject.avarn}</td>
                <td className={lastCell}>{avarnValue}</td>
            </tr>
            <tr><td className={tableTd}>Sector</td>
                <td className={valueCell}>{sectorCount}</td>
                <td className={lastCell}>{privObject.sector_prov}</td>
            </tr>
            </tbody>
        </table>
    );
}


export default MainAllTable;