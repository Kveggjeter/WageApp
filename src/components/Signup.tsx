import "../assets/login.css"
import tryg from "../assets/images/tryg.png"

export function Signup() {

    return (
        <div className="container">
            <div className="box">
                <div className="boxContent">
                    <img className="logo" alt="tryg" src={tryg}/>
                    <div className="loginBox">
                        <h2 id="login">Lag bruker</h2>
                        <div className="inputBox">
                            <input className="inputField" type="text" id="fnInsert" placeholder="Fornavn" required />
                            <input className="inputField" type="text" id="lnInsert" placeholder="Etternavn" required />
                            <input className="inputField" type="text" id="mailInsert" placeholder="Epost" required />
                            <div className="pw">
                                <input className="inputField" type="password" id="passwordInsert" placeholder="Passord" required />
                                <input className="inputField" type="password" id="repeatPasswordInsert" placeholder="Gjenta passord" required />
                            </div>
                        </div>
                        <button id="signBtn" className="btn">Neste</button>
                        <div className="buffer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;