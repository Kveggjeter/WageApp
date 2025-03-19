import "../assets/login.css"
import tryg from "../assets/images/tryg.png"
import {Link} from "react-router-dom";

export function Login() {

    return (
        <div className="container">
            <div className="box">
                <div className="boxContent">
                    <img className="logo" alt="tryg" src={tryg}/>
                    <div className="loginBox">
                        <h2 id="login">Logg inn</h2>
                        <div className="inputBox">
                            <input className="inputField" type="text" id="mailInput" placeholder="Epost" required />
                            <input className="inputField" type="password" id="passwordInput" placeholder="Password" required />
                            <a href="" id="forgotPassword">Glemt passord?</a>
                        </div>
                    <button id="loginBtn" className="btn">Neste</button>
                        <div className="buffer"></div>
                    </div>
                </div>
                <div className="signinBox">
                    <Link to='/signup' className='active'>
                        <h2 id="signin">Lag egen bruker her</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;