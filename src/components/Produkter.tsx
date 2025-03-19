import {JSX} from "react";

interface ProduktProps {
    sal: string[] | null;
    setSal: React.Dispatch<React.SetStateAction<string[] | null>>;
}

// Huske dette med map til neste gang, vanskelig å bli klok på
export function Produkter({ sal }: ProduktProps): JSX.Element {
    
    return (
        <div className="produktBox">
            {sal?.map((value, index) => (
                <div className="prodClust">
                    <a key={index}>
                        {value}<br/>
                        <input className="prodInput" placeholder="-"></input>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Produkter;