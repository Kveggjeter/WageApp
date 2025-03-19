import { useState } from "react";
import { ProdProps } from "../assets/type/ProdProps";

// Huske dette med map til neste gang, vanskelig å bli klok på
export function Produkter({sal, showProd, closeProd, children }: ProdProps) {
    if (!showProd) { return null }
    const [inputs, setInputs] = useState<{ [key: string]: string | number }>({});
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const numericValue = parseInt(value, 10);
        const safeValue = isNaN(numericValue) ? 0 : Math.max(0, numericValue);
        setInputs((prev) => ({
          ...prev,
          [id]: safeValue,
        }));
      };

      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(inputs);
      };

      const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
        event.currentTarget.blur();
      };
    
    
    return (
        <form onSubmit={handleSubmit} className="produktBox">
            {sal?.map((value, index) => (
                <span className="he">
                    <a key={index}>
                        {value}
                    </a>
                    <input
                        type="number"
                        id={value} 
                        className="prodInput"
                        placeholder="0"
                        min={0}
                        onWheel={handleWheel} 
                        value={inputs[value] ?? ""} 
                        onChange={handleChange}
                    />
                </span>
            ))}
            <button type="submit" className="braKnapp">OK</button>
            <button className="greiKnapp" onClick={closeProd}>X</button>
            {children}
        </form>
    );
}

export default Produkter;