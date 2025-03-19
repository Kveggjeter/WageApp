import "../assets/login.css";
import tryg from "../assets/images/tryg.png";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Trying to sign in with:", email, password);
        try {
            await doSignInWithEmailAndPassword(email, password);
            console.log("Sign-in completed!");
            navigate("/");
        } catch (error: unknown) {
            console.log("Sign-in error:", error);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Something unexpected happened");
            }
        }
    };
    
    if (userLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="container">
            <div className="box">
                <div className="boxContent">
                    <img className="logo" alt="tryg" src={tryg} />
                    <h2 id="login">Logg inn</h2>
                    <div className="inputBox">
                        <input
                            className="inputField"
                            type="text"
                            id="mailInput"
                            placeholder="Epost"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="inputField"
                            type="password"
                            id="passwordInput"
                            placeholder="Passord"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href="" id="forgotPassword">
                            Glemt passord?
                        </a>
                    </div>
                    
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                    <button id="loginBtn" className="btn" onClick={onSubmit}>
                        Neste
                    </button>
                    <div className="buffer"></div>
                </div>
            <div className="signinBox">
                <Link to="/signup" className="active">
                    <h2 id="signin">Lag egen bruker her</h2>
                </Link>
            </div>
            </div>
        </div>
    );
}

export default Login;
