import {GetThoseProps} from "../assets/type/GetThoseProps.ts";

const MainTable = ({getValue, getCount}: GetThoseProps) => {
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
    console.log("udf hus: " + hpv_udf_prov + " : udf bil:  " + hp1_udf_prov)

    return (
        <table className="shadow-md">
            <thead>
            <tr className="bg-gray-300">
                <th className="p-2 font-['Albert_Sans'] font-normal">Produkt</th>
                <th className="p-2 font-['Albert_Sans'] font-normal">Nysalg</th>
                <th className="p-2 font-['Albert_Sans'] font-normal">Mersalg</th>
                <th className="p-2 font-['Albert_Sans'] font-normal">Provisjon</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className={tableTd}>Hus</td>
                <td className={valueCell}>{getCount("hpv_ny")}</td>
                <td className={valueCell}>{getCount("hpv_mer")}</td>
                <td className={lastCell}>{hpv_prov}</td>
            </tr>
            <tr><td className={tableTd}>Hus (UDF)</td>
                <td className={valueCell}>{getCount("hpv_udf_ny")}</td>
                <td className={valueCell}>{getCount("hpv_udf_mer")}</td>
                <td className={lastCell}>{hpv_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bil (hp1)</td>
                <td className={valueCell}>{getCount("hp1_ny")}</td>
                <td className={valueCell}>{getCount("hp1_mer")}</td>
                <td className={lastCell}>{hp1_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bil (hp2)</td>
                <td className={valueCell}>{getCount("hp2_ny")}</td>
                <td className={valueCell}>{getCount("hp2_mer")}</td>
                <td className={lastCell}>{hp2_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bil (UDF)</td>
                <td className={valueCell}>{getCount("hp1_udf_ny")}</td>
                <td className={valueCell}>{getCount("hp1_udf_mer")}</td>
                <td className={lastCell}>{hp1_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bil (UDF hp2)</td>
                <td className={valueCell}>{getCount("hp2_udf_ny")}</td>
                <td className={valueCell}>{getCount("hp2_udf_mer")}</td>
                <td className={lastCell}>{hp1_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>HPP</td>
                <td className={valueCell}>{getCount("hpp_ny")}</td>
                <td className={valueCell}>{getCount("hpp_mer")}</td>
                <td className={lastCell}>{hpp_prov}</td>
            </tr>
            <tr><td className={tableTd}>SP 1</td>
                <td className={valueCell}>{getCount("sp1_ny")}</td>
                <td className={valueCell}>{getCount("sp1_mer")}</td>
                <td className={lastCell}>{sp1_prov}</td>
            </tr>
            <tr><td className={tableTd}>SP 2</td>
                <td className={valueCell}>{getCount("sp2_ny")}</td>
                <td className={valueCell}>{getCount("sp2_mer")}</td>
                <td className={lastCell}>{sp2_prov}</td>
            </tr>
            <tr><td className={tableTd}>SP 3</td>
                <td className={valueCell}>{getCount("sp3_ny")}</td>
                <td className={valueCell}>{getCount("sp3_mer")}</td>
                <td className={lastCell}>{sp3_prov}</td>
            </tr>
            <tr><td className={tableTd}>SP 4</td>
                <td className={valueCell}>{getCount("sp4_ny")}</td>
                <td className={valueCell}>{getCount("sp4_mer")}</td>
                <td className={lastCell}>{sp4_prov}</td>
            </tr>
            <tr><td className={tableTd}>Ekstradekning</td>
                <td className={valueCell}>{getCount("ekstra_ny")}</td>
                <td className={valueCell}>{getCount("ekstra_mer")}</td>
                <td className={lastCell}>{ekstra_prov}</td>
            </tr>
            <tr><td className={tableTd}>Nordea</td>
                <td className={valueCell}>{getCount("liv_ny")}</td>
                <td className={valueCell}>{getCount("liv_mer")}</td>
                <td className={lastCell}>{~~liv_prov}</td>
            </tr>
            <tr><td className={tableTd}>Sector</td>
                <td className={valueCell}>{getCount("sector")}</td>
                <td></td>
                <td className="text-center font-['Albert_Sans'] font-light border-b-1 border-l-1 border-dashed">{sector_prov}</td>
            </tr>
            </tbody>
        </table>
    );
}


export default MainTable;