import "../assets/login.css";
import tryg from "../assets/images/tryg.png";
import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

export function Signup() {

    const { userLoggedIn } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]   = useState("");
    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
        return <Navigate to="/"/>
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="container">
            <div className="box">
                <div className="boxContent">
                    <img className="logo" alt="tryg" src={tryg} />
                    <div className="loginBox">
                        <h2 id="login">Lag bruker</h2>
                        <div className="inputBox">
                            <input
                                className="inputField"
                                type="text"
                                id="fnInsert"
                                placeholder="Fornavn"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                className="inputField"
                                type="text"
                                id="lnInsert"
                                placeholder="Etternavn"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <input
                                className="inputField"
                                type="email"
                                id="mailInsert"
                                placeholder="Epost"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="pw">
                                <input
                                    className="inputField"
                                    type="password"
                                    id="passwordInsert"
                                    placeholder="Passord"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    className="inputField"
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
                        <button id="signBtn" className="btn" onClick={handleSignup}>
                            Neste
                        </button>
                        <div className="buffer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
