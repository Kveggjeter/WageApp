import {RemoveProp} from "../assets/type/RemoveProp.ts";
import {UseMonth, UseYear} from "../contexts/calendar/CalendarContext.tsx";
import {useAuth} from "../contexts/authContext";
import {GetWages, RemoveCommision} from "../firebase/firestore.ts";
import React, {useEffect, useState} from "react";

export function RemoveSalg({showRemove, closeRemove, children }: RemoveProp) {

    const { year } = UseYear();
    const { month } = UseMonth();
    const { uid } = useAuth();
    const [ tabell, setTabell ] = useState<{ [key: string]: number }>({});
    const [formData, setFormData] = useState<{ [key: string]: number }>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const data = async () => {
            if (!uid || !year || !month) return;
            try {
                const nr = await GetWages(uid, year, month);
                if (nr) {
                    setTabell(nr);
                    setFormData(nr);
                }
                else setTabell({});
            } catch (err) {
                console.log(err);
                setTabell({});
            }
        };
        data();
    }, [uid, year, month]);

    if (!showRemove) { return null }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const numericValue = parseInt(value, 10);
        const safeValue = isNaN(numericValue) ? 0 : Math.max(0, numericValue);
        setFormData((prev) => ({
            ...prev,
            [id]: safeValue,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const bekreft = window.confirm("Endringene er permanentente og kan ikke endres. Du må eventuelt legge tilbake det du har slettet. Vil du virkelig gjøre dette?")
        if (!bekreft) return;
        const list = new Map<string, number>(Object.entries(formData));
        if (uid && year && month) {
            await RemoveCommision(uid, year, month, list);
            setIsLoading(false);
            closeRemove();
        }
    }

        return (
            <>
                {isLoading && (
                    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/50">
                        <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                <form onSubmit={handleSubmit}
                    className="flex flex-col absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[500px] w-[350px] bg-white border border-black z-10 pb-5">
                    <ul className="self-center font-light font-['Albert_Sans'] overflow-y-auto overflow-x-hidden p-10 mb-10">
                        {Object.entries(tabell).map(([key]) => (
                            <li className="flex flex-row gap-3 border-b-1 border-dotted" key={key}>
                                <label className="text-xl" htmlFor={key}>{key}:</label>
                                <input
                                    type="number"
                                    id={key}
                                    min={0}
                                    value={formData[key] ?? ""}
                                    onChange={handleChange}
                                    className="text-center h-5 w-5 flex border-1 border-gray placeholder:text-xs placeholder:text-center"
                                />
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className="h-7 text-white w-3/5 bg-red-800 self-center duration-700 ease-in-out hover:cursor-pointer hover:duration-500 hover:scale-103 hover:ease-in-out hover:bg-red-700">
                        OK</button>
                    {children}
                    <button
                        className="absolute w-7 h-7 text-[18px] right-0 top-0 text-center leading-none items-center justify-center duration-700 bg-red-800 ease-in-out hover:scale-105 hover:duration-500 hover:ease-in-out hover:text-white"
                        onClick={closeRemove}>X
                    </button>
                </form>
            </>
        )

}