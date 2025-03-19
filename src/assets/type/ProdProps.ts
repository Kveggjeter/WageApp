import { MouseEventHandler } from "react";

export interface ProdProps {
    showProd: boolean;
    closeProd: MouseEventHandler<HTMLButtonElement>;
    children: undefined;
    sal: string [] | null;
}