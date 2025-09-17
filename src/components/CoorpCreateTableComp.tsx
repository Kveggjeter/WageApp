import {useEffect} from "react";
import {useProdex} from "../contexts/productContext/Prodex.tsx";
import {CoorpCreateSaleRowData, CoorpCreateTableProp} from "../assets/type/CoorpCreateTableProp.ts";
import GiveProductCorrectCode from "../feature/GiveProductCorrectCode.ts";
import React from "react";
import {CoorpCreateExtraRowData} from "../assets/type/CoorpCreateExtraRowData.ts";

const CoorpCreateTableComp = ({ data, rows, setRows, extraRows, setExtraRows}: CoorpCreateTableProp) => {

    const entries = Object.entries(data);
    const newRows: CoorpCreateSaleRowData[] = entries.flatMap(([key, val]) => {
        const count = typeof val === "number" ? val : 1;
        return Array.from({ length: count }, (_, i) => ({
            id: `${key}-${i}`,
            product: key,
            ekstra: false,
            amount: 0
        }));
    });

    useEffect(() => {
        setRows(newRows);
    }, [data, setRows]);

    console.log(extraRows);

    const {setInputs } = useProdex();

    function accosiateRow(rowId: string) {
        const giveProductCorrectCode = new GiveProductCorrectCode();
        return giveProductCorrectCode.newCode(rowId);
    }

    function handleCheckboxChange(rowId: string, field: keyof CoorpCreateSaleRowData) {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === rowId ? { ...row, [field]: !row[field] } : row
            )
        );

        setExtraRows((prevExtraRows) => {
            const targetRow = rows.find(r => r.id === rowId);
            if (!targetRow) return prevExtraRows;

            const isActivating = !targetRow[field];
            const cleanRowId = rowId.split("-")[0];
            if (isActivating) {
                const assocProducts = accosiateRow(cleanRowId);
                const newExtraRows: CoorpCreateExtraRowData[] = assocProducts.map((product, index) => ({
                    id: `${rowId}-assoc-${index}`,
                    product,
                    ekstra: false,
                    amount: 0,
                    parentId: rowId,
                }));
                return [...prevExtraRows, ...newExtraRows];
            } else {
                return prevExtraRows.filter(er => er.parentId !== rowId);
            }
        });
    }


    const handleAmountBoxChange = (rowId: string, value: string) => {
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
            <tr className="flex bg-gray-200">
                <th className="flex w-2/5 p-2">Produkt</th>
                <th className="flex w-1/7 p-2 items-center justify-center">Ekstra</th>
                <th className="flex w-2/5 p-2 ml-auto">Sum</th>
            </tr>
            </thead>
            <tbody>
            {rows.map(row => (
                <React.Fragment key={row.id}>
                    <tr className="flex border-b-1 border-dotted">
                        <td className="flex border-r-1 border-dashed pt-3 w-2/5 ">{row.product}</td>
                        <td className="flex border-r-1 items-center justify-center border-dashed w-1/5">
                            <input
                                className="flex"
                                type="checkbox"
                                checked={row.ekstra}
                                onChange={() => handleCheckboxChange(row.id, "ekstra")}
                            />
                        </td>
                        <td className="flex flex-row border-r-1 items-center border-dashed w-2/5">
                            <span className="flex justify-self-center">Sum:</span>
                            <input
                                className="flex justify-self-center pl-5"
                                type="number"
                                placeholder="Salgssum"
                                onChange={(e) => handleAmountBoxChange(row.id, e.target.value)}
                            />
                        </td>
                        <td>
                            <button
                                className="w-5 h-5 text-[18px] text-center leading-none items-center duration-700 bg-red-800 ease-in-out hover:scale-105 hover:duration-500 hover:ease-in-out hover:text-white"
                                onClick={() => handleLineRemoval(row.id, row.product)}
                            >
                                X
                            </button>
                        </td>
                    </tr>
                    {extraRows
                        .filter(erow => erow.parentId === row.id)
                        .map(erow => (
                            <tr key={erow.id} className="flex text-gray-600 text-sm">
                                <td className="flex pl-10">{erow.product}</td>
                                <td className="flex pl-5">
                                    <input
                                        type="checkbox"
                                        checked={erow.ekstra}
                                        onChange={() =>
                                            setExtraRows(prev =>
                                                prev.map(r =>
                                                    r.id === erow.id ? { ...r, ekstra: !r.ekstra } : r
                                                )
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                </React.Fragment>
            ))}
            </tbody>
        </table>
    );
};

export default CoorpCreateTableComp;