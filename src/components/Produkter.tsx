import { ProdProps } from "../assets/type/ProdProps";
import { useProdex } from "../contexts/productContext/Prodex.tsx";
import { useState } from "react";

// Huske dette med map til neste gang, vanskelig å bli klok på
export function Produkter({sal, showProd, closeProd, children }: ProdProps) {
    const { setInputs } = useProdex();
    const [formData, setFormData] = useState<{ [key: string]: number }>({});

    if (!showProd) { return null }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const numericValue = parseInt(value, 10);
        const safeValue = isNaN(numericValue) ? 0 : Math.max(0, numericValue);
        setFormData((prev) => ({
          ...prev,
          [id]: safeValue,
        }));
      };

      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
          setInputs((prev) => ({
              ...prev,
              ...formData,
          }));
        closeProd();

      };

      const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
        event.currentTarget.blur();
      };
    
    
    return (
        <form onSubmit={handleSubmit} className="font-['Albert_Sans'] font-light flex absolute flex-col left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-26 h-auto w-84 shadow-xl z-20 p-5 gap-4 bg-white">
            {sal?.map((value, index) => (
                <span className="flex flex-row border-b-1 border-gray-400 border-dotted">
                    <a key={index}>
                        {value}
                    </a>
                    <input
                        type="number"
                        id={value} 
                        className="text-center h-5 w-5 flex ml-auto border-1 border-black placeholder:text-xs placeholder:text-center"
                        placeholder="0"
                        min={0}
                        onWheel={handleWheel} 
                        value={formData[value] ?? ""}
                        onChange={handleChange}
                    />
                </span>
            ))}
            <div className="flex flex-row gap-4">
                <button type="submit" className="h-7 w-3/5 self-center duration-700 ease-in-out hover:cursor-pointer hover:duration-500 hover:ease-in-out hover:bg-gray-300">
                    OK</button>
                <button className="h-7 w-4/12 self-center duration-700 ease-in-out hover:cursor-pointer hover:duration-500 hover:ease-in-out hover:bg-gray-300" onClick={closeProd}>Avbryt</button>
            </div>
            {children}
        </form>
    );
}

export default Produkter;