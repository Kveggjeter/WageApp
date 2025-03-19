import {JSX} from "react";

interface ProduktProps {
    sal: string[] | null;
    setSal: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export function Produkter({ sal, setSal }: ProduktProps): JSX.Element {
    return (
        <>
            <div className="produktBox">

            </div>
        </>
    )
}

export default Produkter;