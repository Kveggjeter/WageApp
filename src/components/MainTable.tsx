import {TableCompProps} from "../assets/type/MainTableProps.ts";
import {MakeWage} from "../feature/MakeWage.ts";
import {useEffect} from "react";

export function MainTable ({ data }: TableCompProps) {

    const res = async () => {
        try {
            const wages = await MakeWage({ data });
            console.log("Calculated wages:", wages);
            return wages;
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        res();
    }, [data]);

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
                    <td>hpv_ny</td>
                    <td>hpv_mer</td>
                    <td>hpv_prov</td>
                </tr>
                <tr>Hus (UDF)
                    <td>hpv_udf_ny</td>
                    <td>hpv_udf_mer</td>
                    <td>hpv__udf_prov</td>
                </tr>
                <tr>Bil (hp1)
                    <td>hp1_ny</td>
                    <td>hp1_mer</td>
                    <td>hp1_prov</td>
                </tr>
                <tr>Bil (hp2)
                    <td>hp2_ny</td>
                    <td>hp2_mer</td>
                    <td>hp2_prov</td>
                </tr>
                <tr>Bil (UDF)
                    <td>hp1_udf_ny</td>
                    <td>hp1_udf_mer</td>
                    <td>hp1_udf_prov</td>
                </tr>
                <tr>HPP
                    <td>hpp_ny</td>
                    <td>hpp_mer</td>
                    <td>hpp_prov</td>
                </tr>
                <tr>SP 1
                    <td>sp1_ny</td>
                    <td>sp1_mer</td>
                    <td>sp1_prov</td>
                </tr>
                <tr>SP 2
                    <td>sp2_ny</td>
                    <td>sp2_mer</td>
                    <td>sp2_prov</td>
                </tr>
                <tr>SP 3
                    <td>sp3_ny</td>
                    <td>sp3_mer</td>
                    <td>sp3_prov</td>
                </tr>
                <tr>SP 4
                    <td>sp4_ny</td>
                    <td>sp4_mer</td>
                    <td>sp4_prov</td>
                </tr>
                <tr>Ekstradekning
                    <td>ekstra_ny</td>
                    <td>ekstra_mer</td>
                    <td>ekstra_prov</td>
                </tr>
                <tr>Nordea
                    <td>liv_ny</td>
                    <td>liv_mer</td>
                    <td>liv_prov</td>
                </tr>
                <tr>Sector
                    <td>sector_ny</td>
                    <td></td>
                    <td>sector_prov</td>
                </tr>
            </tbody>
        </table>
    );
}