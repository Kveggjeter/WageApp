import {RowData, TableProp} from "../assets/type/TableProp.ts";
import {useEffect} from "react";

const TableComp = ({ data, rows, setRows}: TableProp) => {
    useEffect(() => {
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
        setRows(newRows);
    }, [data, setRows]);

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

    return (
        <table>
            <thead>
            <tr>
                <th>Produkt</th>
                <th>Mersalg</th>
                <th>Ekstra</th>
                <th>Maskinskade</th>
            </tr>
            </thead>
            <tbody>
            {rows.map(row => (
                <tr key={row.id}>
                    <td>{row.product}</td>
                    <td>
                        <input
                            type="checkbox"
                            checked={row.mersalg}
                            onChange={() => handleCheckboxChange(row.id, "mersalg")}
                            />
                    </td>
                    <td>{row.isLiv ? (
                        <span>Sum:</span>
                    ) : (
                            <input
                                type="checkbox"
                                checked={row.ekstra}
                                onChange={() => handleCheckboxChange(row.id, "ekstra")}
                                disabled={row.isLiv}
                            /> )}
                    </td>
                    <td>
                        {row.isLiv ? (
                            <input
                                type="number"
                                placeholder="Salgssum"
                                onChange={(e) => handleLifeBoxChange(row.id, e.target.value)}
                            />
                        ) : ( <input
                            type="checkbox"
                            checked={row.maskinskade}
                            onChange={() => handleCheckboxChange(row.id, "maskinskade")}
                            disabled={row.isLiv}
                        /> )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableComp;