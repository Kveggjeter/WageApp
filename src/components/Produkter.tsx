import { ProdProps } from "../assets/type/ProdProps";
import { useProdex } from "../contexts/productContext/Prodex.tsx";
import {useState} from "react";

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
                        value={formData[value] ?? ""}
                        onChange={handleChange}
                    />
                </span>
            ))}
            <div className="btnCluster">
                <button type="submit" className="braKnapp">OK</button>
                <button className="greiKnapp" onClick={closeProd}>Avbryt</button>
            </div>
            {children}
        </form>
    );
}

export default Produkter;