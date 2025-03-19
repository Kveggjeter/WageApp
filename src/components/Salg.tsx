import "../assets/salg.css";
import baat from "../assets/images/baat_24.gif";
import person from "../assets/images/barnogvoksne_24.gif";
import dyr from "../assets/images/dyr_24.gif";
import hus from "../assets/images/husoghjem_24.gif";
import bil from "../assets/images/kjoeretoey_24.gif";
import annet from "../assets/images/nliprivat_24.gif";
import nordea from "../assets/images/nordealogo_24.gif";
import reise from "../assets/images/reise_24.gif";
import Produkter from "./Produkter.tsx";


export function Salg() {

    return (
        <>
            <Produkter/>
            <div className="salgBox">
                <ul className="imgBulk">
                    <li>
                        <img src={hus} alt="hus"/>
                        <p>Hus og innbo</p>
                    </li><li>
                        <img src={bil} alt="bil"/>
                        <p>Kjøretøy</p>
                    </li><li>
                        <img src={person} alt="person"/>
                        <p>Barn og voksne</p>
                    </li><li>
                        <img src={nordea} alt="nordea"/>
                        <p>Nordea</p>
                    </li><li>
                        <img src={baat} alt="båt"/>
                        <p>Båt</p>
                    </li><li>
                        <img src={reise} alt="reise"/>
                        <p>Reise</p>
                    </li><li>
                        <img src={dyr} alt="dyr"/>
                        <p>Dyr</p>
                    </li><li>
                        <img src={annet} alt="annet"/>
                        <p>Annet</p>
                    </li>
                </ul>
                <table className="salgTable">
                    <tr id="salgHead">
                        <th>Nysalg?</th>
                        <th>Ekstra?</th>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Salg;