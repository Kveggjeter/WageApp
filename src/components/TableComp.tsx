import {RowData, TableProp} from "../assets/type/TableProp.ts";
import {useEffect} from "react";
import {useProdex} from "../contexts/productContext/Prodex.tsx";



const TableComp = ({ data, rows, setRows}: TableProp) => {

 const entries = Object.entries(data);
        const newRows: RowData[] = entries.flatMap(([key, val]) => {
            const count = typeof val === "number" ? val : 1;
            return Array.from({ length: count }, (_, i) => ({
                id: `${key}-${i}`,
                product: key,
                mersalg: false,
                ekstra: false,
                maskinskade: false,
                isLiv: key.includes("Liv")
            }));
        });

    useEffect(() => {
        setRows(newRows);
    }, [data, setRows]);

    const { setInputs } = useProdex();


    function handleCheckboxChange(rowId: string, field: keyof RowData) {
        setRows((prev) =>
            prev.map((row) =>
                row.id === rowId ? { ...row, [field]: !row[field] } : row
            )
        );
    }

    const handleLifeBoxChange = (rowId: string, value: string) => {
        const numValue = parseInt(value) || 0;
        setRows(prev => prev.map(row =>
            row.id === rowId
                ? { ...row, amount: numValue }
                : row
        ));
    }

    function handleLineRemoval(rowId: string, product: string) {
       setRows(prev => prev.filter(row => row.id !== rowId));

       setInputs(prev => {
        const next = { ...prev};

        if (typeof next[product] === "number") {
            next[product] = (next[product] as number) - 1;
            if (next[product] <= 0) delete next[product];
        }
        return next;
       })
    }

    return (
        <table>
            <thead>
            <tr className="bg-gray-200">
                <th className="p-2">Produkt</th>
                <th className="p-2">Mersalg</th>
                <th className="p-2">Ekstra</th>
                <th className="p-2">Maskinskade</th>
            </tr>
            </thead>
            <tbody>
            {rows.map(row => (
                <tr className="border-b-1 border-dotted" key={row.id}>
                    <td className="border-r-1 border-dashed pt-3">{row.product}</td>
                    <td className="border-r-1 border-dashed">
                        <input className="flex justify-self-center"
                            type="checkbox"
                            checked={row.mersalg}
                            onChange={() => handleCheckboxChange(row.id, "mersalg")}
                            />
                    </td>
                    <td className="border-r-1 border-dashed">{row.isLiv ? (
                        <span className="flex justify-self-center">Sum:</span>
                    ) : (
                            <input className="flex justify-self-center"
                                type="checkbox"
                                checked={row.ekstra}
                                onChange={() => handleCheckboxChange(row.id, "ekstra")}
                                disabled={row.isLiv}
                            /> )}
                    </td>
                    <td>
                        {row.isLiv ? (
                            <input className="flex justify-self-center"
                                type="number"
                                placeholder="Salgssum"
                                onChange={(e) => handleLifeBoxChange(row.id, e.target.value)}
                            />
                        ) : ( <input className="flex justify-self-center"
                            type="checkbox"
                            checked={row.maskinskade}
                            onChange={() => handleCheckboxChange(row.id, "maskinskade")}
                            disabled={row.isLiv}
                        /> )}
                    </td>
                    <td>
                        <button className="w-5 h-5 text-[18px] text-center leading-none items-center duration-700 bg-red-800 ease-in-out hover:scale-105 hover:duration-500 hover:ease-in-out hover:text-white" onClick={() => handleLineRemoval(row.id, row.product)}>X</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableComp;