import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/home.tsx";
import Signup from "./components/Signup.tsx";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
