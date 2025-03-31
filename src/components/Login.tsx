import tryg from "../assets/images/tryg.png";
import livboye from "../assets/images/livboye.jpg"
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
    const [isLoading, setIsLoading] = useState(false);
    const inputStyle = "border-b-2 border-gray-400 text.lg pb-2 w-full font-[200] placeholder:font-['Albert_Sans'] placeholder:font-light focus:outline-none focus:bg-white";

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
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
                    <h2 className="text-2xl font-light pt-4 pb-2">Logg inn</h2>
                    <div className="flex gap-5 flex-col">
                        <input
                            className={inputStyle}
                            type="text"
                            id="mailInput"
                            placeholder="Epost"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className={inputStyle}
                            type="password"
                            id="passwordInput"
                            placeholder="Passord"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href="" className="text-blue-500">
                            Glemt passord?
                        </a>
                    </div>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <div className="flex flex-col justify-self-end">
                    <button id="loginBtn" className="self-end mt-7 border-none w-38 h-10 text-xl font-['Albert_Sans'] font-light text-white bg-blue-500 ease-in-out duration-500 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out hover:duration-500 hover:scale-102" onClick={onSubmit}>
                        Neste
                    </button>
                    </div>
                </div>
            <div className="mt-auto text-center pt-5 pb-15 h-13 w-full bg-gray-100 ease-in-out duration-700 hover:bg-gray-300 hover:ease-in-out hover:duration-500">
                <Link to="/signup" className="active">
                    <h2 className="text-black font-extralight text-2xl">Lag egen bruker her</h2>
                </Link>
            </div>
            </div>
        </div>
            </>
    );
}

export default Login;
