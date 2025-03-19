import Login from "../components/Login.tsx";
import Dash from "../components/Dash.tsx";
import { useAuth } from "../contexts/authContext";

export function Home() {
    const { userLoggedIn } = useAuth();

    return (
        <>
            {userLoggedIn ? <Dash /> : <Login />}
        </>
    );
}


export default Home;