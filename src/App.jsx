import Login from './pages/Login.jsx';
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";


export default function App() {

    return (
        <BrowserRouter>

                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/home" element = {<Home/>}/>
                </Routes>

        </BrowserRouter>
    )
}