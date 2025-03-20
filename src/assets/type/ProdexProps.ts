export interface ProdexProps {
    inputs: { [key: string]: string | number };
    setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: string | number }>
    >;
}