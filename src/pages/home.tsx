import Login from "../components/Login.tsx";
import Dash from "../components/Dash.tsx";
import { useAuth } from "../contexts/authContext";
import Salg from "../components/Salg.tsx";

export function Home() {
    const { userLoggedIn } = useAuth();

    return (
        <>
        <Salg/>
            {userLoggedIn ? <Dash /> : <Login />}
        </>
    );
}


export default Home;