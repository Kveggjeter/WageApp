import { CustomerProp } from "../assets/type/CustomerProp.ts";

export function Customer( {showCustomer, closeCustomer, children }: CustomerProp) {

    if (!showCustomer) {return null}

    return (
        <></>
    );
}