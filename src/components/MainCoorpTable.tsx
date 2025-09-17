import {GetThoseProps} from "../assets/type/GetThoseProps.ts";
import GiveProductCorrectCode from "../feature/GiveProductCorrectCode.ts";

const MainCoorpTable = ({getValue, getCount}: GetThoseProps) => {
    const tableTd = "bg-gray-200 text-center pl-2 pr-2 pt-1"
    const valueCell = "text-center font-['Albert_Sans'] font-light border-b-1 border-r-1 border-dashed"
    const lastCell = "text-center font-['Albert_Sans'] font-light border-b-1 border-dashed"
    const hpv_prov = +getValue("hpv_mer") + +getValue("hpv_ny");
    const hpv_udf_prov = +getValue("hpv_udf_mer") + +getValue("hpv_udf_ny");
    const hp1_prov = +getValue("hp1_mer") + +getValue("hp1_ny");
    const hp2_prov = +getValue("hp2_mer") + +getValue("hp2_ny");
    const hp1_udf_prov = +getValue("hp1_udf_ny") + +getValue("hp1_udf_mer");
    const hpp_prov = +getValue("hpp_ny") + +getValue("hpp_mer");
    const sp1_prov = +getValue("sp1_mer") + +getValue("sp1_ny");
    const sp2_prov = +getValue("sp2_mer") + +getValue("sp2_ny");
    const sp3_prov = +getValue("sp3_mer") + +getValue("sp3_ny");
    const sp4_prov = +getValue("sp4_mer") + +getValue("sp4_ny");
    const ekstra_prov = +getValue("ekstra_ny") + +getValue("ekstra_mer");
    const liv_prov = +getValue("livSum_mer") + +getValue("livSum_ny");
    const sector_prov = +getValue("sector");

    const ansvarforsikring_prov = +getValue("ansvarforsikring_mer");
    const ansvarforsikring_sum = +getValue("ansvarforsikring_mer");
    const ansvarforsikring_antall = +getValue("ansvarforsikring_mer");

    const bygg_prov = +getValue("bygg_mer");
    const bygg_sum = +getValue("bygg_sum_mer");
    const bygg_antall = +getValue("bygg_mer");

    const person_prov = +getValue("person");
    const person_sum = +getValue("person_sum");
    const person_antall = +getValue("person_antall");

    const bil_prov = +getValue("bill_prov");
    const bil_sum = +getValue("bill_sum");
    const bil_antall = +getValue("bil_antall");

    const maskiner_prov = +getValue("maskiner");
    const maskiner_sum = +getValue("maskiner_sum");
    const maskiner_antall = +getValue("maskiner_antall");

    const itp_prov = +getValue("itp_mer");
    const itp_antall = +getValue("itp_mer");
    const itp_sum = +getValue("itp_sum");

    const avarn_prov = +getValue("avarn");
    const avarn_sum = +getValue("avarn_sum");
    const avarn_antall = +getValue("avar_antall");

    const annet_prov = +getValue("annet_mer");
    const annet_sum = +getValue("annet_sum");
    const annet_antall = +getValue("annet_antall");

    const gpc: GiveProductCorrectCode = new GiveProductCorrectCode();




    return (
        <table className="shadow-md">
            <thead>
            <tr className="bg-gray-300">
                <th className="p-2 font-['Albert_Sans'] font-normal">Produkt</th>
                <th className="p-2 font-['Albert_Sans'] font-normal">Antall</th>
                <th className="p-2 font-['Albert_Sans'] font-normal">Sum</th>
                <th className="p-2 font-['Albert_Sans'] font-normal">Provisjon</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className={tableTd}>Ansvarforsikring</td>
                <td className={valueCell}>{getCount("")}</td>
                <td className={valueCell}>{getCount("hpv_mer")}</td>
                <td className={lastCell}>{hpv_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bygg og løsøre</td>
                <td className={valueCell}>{getCount("hpv_udf_ny")}</td>
                <td className={valueCell}>{getCount("hpv_udf_mer")}</td>
                <td className={lastCell}>{hpv_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>Personprodukt</td>
                <td className={valueCell}>{getCount("hp1_ny")}</td>
                <td className={valueCell}>{getCount("hp1_mer")}</td>
                <td className={lastCell}>{hp1_prov}</td>
            </tr>
            <tr><td className={tableTd}>Kjøretøy(hp2)</td>
                <td className={valueCell}>{getCount("hp2_ny")}</td>
                <td className={valueCell}>{getCount("hp2_mer")}</td>
                <td className={lastCell}>{hp2_prov}</td>
            </tr>
            <tr><td className={tableTd}>Maskiner</td>
                <td className={valueCell}>{getCount("hp1_udf_ny")}</td>
                <td className={valueCell}>{getCount("hp1_udf_mer")}</td>
                <td className={lastCell}>{hp1_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>ITP</td>
                <td className={valueCell}>{getCount("hp2_udf_ny")}</td>
                <td className={valueCell}>{getCount("hp2_udf_mer")}</td>
                <td className={lastCell}>{hp1_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>Avarn</td>
                <td className={valueCell}>{getCount("hpp_ny")}</td>
                <td className={valueCell}>{getCount("hpp_mer")}</td>
                <td className={lastCell}>{hpp_prov}</td>
            </tr>
            <tr><td className={tableTd}>Annet</td>
                <td className={valueCell}>{getCount("sp1_ny")}</td>
                <td className={valueCell}>{getCount("sp1_mer")}</td>
                <td className={lastCell}>{sp1_prov}</td>
            </tr>
            </tbody>
        </table>
    );
}


export default MainCoorpTable;