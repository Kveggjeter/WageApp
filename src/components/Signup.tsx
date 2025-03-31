import tryg from "../assets/images/tryg.png";
import livboye from "../assets/images/livboye.jpg"
import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import {Link, Navigate} from "react-router-dom";

export function Signup() {

    const { userLoggedIn } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]   = useState("");
    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState("");
    const inputStyle = "border-b-2 border-gray-400 text.lg pb-2 w-full font-[200] placeholder:font-['Albert_Sans'] placeholder:font-light focus:outline-none focus:bg-white";
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        if (password !== repeatPassword) {
            setErrorMessage("Passordene er ikke like.");
            return;
        }

        try {
            await doCreateUserWithEmailAndPassword(email, password);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("En ukjent feil oppstod.");
            }
        }
        setIsLoading(false);
        return <Navigate to="/"/>
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <>
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/50">
                    <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
        <div className="flex items-center justify-center w-screen h-screen font-[Verdana] bg-white/70 bg-blend-lighten bg-cover" style={{ backgroundImage: `url(${livboye})` }}>
            <div className="flex relative item-center flex-col w-116 h-auto rounded bg-white font-['Albert_Sans'] shadow">
                <div className="self-start pt-20 pb-10 pl-20 w-10/12">
                    <img className="w-36 self-start" alt="tryg" src={tryg} />
                        <h2 className="text-2xl font-light pt-4 pb-2">Lag bruker</h2>
                        <div className="flex gap-5 flex-col">
                            <input
                                className={inputStyle}
                                type="text"
                                id="fnInsert"
                                placeholder="Fornavn"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                className={inputStyle}
                                type="text"
                                id="lnInsert"
                                placeholder="Etternavn"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <input
                                className={inputStyle}
                                type="email"
                                id="mailInsert"
                                placeholder="Epost"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="flex flex-col gap-5 mt-5">
                                <input
                                    className={inputStyle}
                                    type="password"
                                    id="passwordInsert"
                                    placeholder="Passord"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    className={inputStyle}
                                    type="password"
                                    id="repeatPasswordInsert"
                                    placeholder="Gjenta passord"
                                    required
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {errorMessage && (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                        )}
                    <div className="flex flex-row gap-3 mt-7">
                        <Link to="/" className="active">
                    <a className="p-1 font-['Albert_Sans'] text-lg text-blue-400 hover:text-blue-700 ease-in-out duration-500 hover:duration-500 hover:ease-in-out hover:cursor-pointer hover:bg-gray-100">{'\u{1F519}'} Tilbake til login</a>
                        </Link>
                        <button id="signBtn" className="ml-auto border-none w-30 h-10 text-xl font-['Albert_Sans'] font-light text-white bg-blue-500 ease-in-out duration-500 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out hover:duration-500 hover:scale-102" onClick={handleSignup}>
                            Neste
                        </button>
                    </div>
                </div>
            </div>
        </div>
            </>
    );
}

export default Signup;
