import {GetThoseProps} from "../assets/type/GetThoseProps.ts";

const MainTable = ({getValue, getCount}: GetThoseProps) => {

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
    console.log(getValue("livSum_mer"));

    return (
        <table className="dash-table">
            <thead>
            <tr>
                <th>Produkt</th>
                <th>Nysalg</th>
                <th>Mersalg</th>
                <th>Provisjon</th>
            </tr>
            </thead>
            <tbody>
            <tr>Hus
                <td>{getCount("hpv_ny")}</td>
                <td>{getCount("hpv_mer")}</td>
                <td>{hpv_prov}</td>
            </tr>
            <tr>Hus (UDF)
                <td>{getCount("hpv_udf_ny")}</td>
                <td>{getCount("hpv__udf_mer")}</td>
                <td>{hpv_udf_prov}</td>
            </tr>
            <tr>Bil (hp1)
                <td>{getCount("hp1_ny")}</td>
                <td>{getCount("hp1_mer")}</td>
                <td>{hp1_prov}</td>
            </tr>
            <tr>Bil (hp2)
                <td>{getCount("hp2_ny")}</td>
                <td>{getCount("hp2_mer")}</td>
                <td>{hp2_prov}</td>
            </tr>
            <tr>Bil (UDF)
                <td>{getCount("hp1_udf_ny")}</td>
                <td>{getCount("hp1_udf_mer")}</td>
                <td>{hp1_udf_prov}</td>
            </tr>
            <tr>HPP
                <td>{getCount("hpp_ny")}</td>
                <td>{getCount("hpp_mer")}</td>
                <td>{hpp_prov}</td>
            </tr>
            <tr>SP 1
                <td>{getCount("sp1_ny")}</td>
                <td>{getCount("sp1_mer")}</td>
                <td>{sp1_prov}</td>
            </tr>
            <tr>SP 2
                <td>{getCount("sp2_ny")}</td>
                <td>{getCount("sp2_mer")}</td>
                <td>{sp2_prov}</td>
            </tr>
            <tr>SP 3
                <td>{getCount("sp3_ny")}</td>
                <td>{getCount("sp3_mer")}</td>
                <td>{sp3_prov}</td>
            </tr>
            <tr>SP 4
                <td>{getCount("sp4_ny")}</td>
                <td>{getCount("sp4_mer")}</td>
                <td>{sp4_prov}</td>
            </tr>
            <tr>Ekstradekning
                <td>{getCount("ekstra_ny")}</td>
                <td>{getCount("ekstra_mer")}</td>
                <td>{ekstra_prov}</td>
            </tr>
            <tr>Nordea
                <td>{getCount("liv_ny")}</td>
                <td>{getCount("liv_mer")}</td>
                <td>{~~liv_prov}</td>
            </tr>
            <tr>Sector
                <td>{getCount("sector")}</td>
                <td></td>
                <td>{sector_prov}</td>
            </tr>
            </tbody>
        </table>
    );
}


export default MainTable;