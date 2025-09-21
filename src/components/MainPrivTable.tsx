import {PrivateObject} from "../assets/type/PrivateObject.ts";

const MainPrivTable = (o: PrivateObject) => {
    const tableTd = "bg-gray-200 text-center pl-2 pr-2 pt-1"
    const valueCell = "text-center font-['Albert_Sans'] font-light border-b-1 border-r-1 border-dashed"
    const lastCell = "text-center font-['Albert_Sans'] font-light border-b-1 border-dashed"

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
                <td className={valueCell}>{o.getCount("hpv_ny")}</td>
                <td className={valueCell}>{o.getCount("hpv_mer")}</td>
                <td className={lastCell}>{o.hpv_prov}</td>
            </tr>
            <tr><td className={tableTd}>Hus (UDF)</td>
                <td className={valueCell}>{o.getCount("hpv_udf_ny")}</td>
                <td className={valueCell}>{o.getCount("hpv_udf_mer")}</td>
                <td className={lastCell}>{o.hpv_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bil (hp1)</td>
                <td className={valueCell}>{o.getCount("hp1_ny")}</td>
                <td className={valueCell}>{o.getCount("hp1_mer")}</td>
                <td className={lastCell}>{o.hp1_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bil (hp2)</td>
                <td className={valueCell}>{o.getCount("hp2_ny")}</td>
                <td className={valueCell}>{o.getCount("hp2_mer")}</td>
                <td className={lastCell}>{o.hp2_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bil (UDF)</td>
                <td className={valueCell}>{o.getCount("hp1_udf_ny")}</td>
                <td className={valueCell}>{o.getCount("hp1_udf_mer")}</td>
                <td className={lastCell}>{o.hp1_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>Bil (UDF hp2)</td>
                <td className={valueCell}>{o.getCount("hp2_udf_ny")}</td>
                <td className={valueCell}>{o.getCount("hp2_udf_mer")}</td>
                <td className={lastCell}>{o.hp1_udf_prov}</td>
            </tr>
            <tr><td className={tableTd}>HPP</td>
                <td className={valueCell}>{o.getCount("hpp_ny")}</td>
                <td className={valueCell}>{o.getCount("hpp_mer")}</td>
                <td className={lastCell}>{o.hpp_prov}</td>
            </tr>
            <tr><td className={tableTd}>SP 1</td>
                <td className={valueCell}>{o.getCount("sp1_ny")}</td>
                <td className={valueCell}>{o.getCount("sp1_mer")}</td>
                <td className={lastCell}>{o.sp1_prov}</td>
            </tr>
            <tr><td className={tableTd}>SP 2</td>
                <td className={valueCell}>{o.getCount("sp2_ny")}</td>
                <td className={valueCell}>{o.getCount("sp2_mer")}</td>
                <td className={lastCell}>{o.sp2_prov}</td>
            </tr>
            <tr><td className={tableTd}>SP 3</td>
                <td className={valueCell}>{o.getCount("sp3_ny")}</td>
                <td className={valueCell}>{o.getCount("sp3_mer")}</td>
                <td className={lastCell}>{o.sp3_prov}</td>
            </tr>
            <tr><td className={tableTd}>SP 4</td>
                <td className={valueCell}>{o.getCount("sp4_ny")}</td>
                <td className={valueCell}>{o.getCount("sp4_mer")}</td>
                <td className={lastCell}>{o.sp4_prov}</td>
            </tr>
            <tr><td className={tableTd}>Ekstradekning</td>
                <td className={valueCell}>{o.getCount("ekstra_ny")}</td>
                <td className={valueCell}>{o.getCount("ekstra_mer")}</td>
                <td className={lastCell}>{o.ekstra_prov}</td>
            </tr>
            <tr><td className={tableTd}>Nordea</td>
                <td className={valueCell}>{o.getCount("liv_ny")}</td>
                <td className={valueCell}>{o.getCount("liv_mer")}</td>
                <td className={lastCell}>{~~o.livProv}</td>
            </tr>
            <tr><td className={tableTd}>Sector</td>
                <td className={valueCell}>{o.getCount("sector")}</td>
                <td></td>
                <td className="text-center font-['Albert_Sans'] font-light border-b-1 border-l-1 border-dashed">{o.sector_prov}</td>
            </tr>
            </tbody>
        </table>
    );
}


export default MainPrivTable;