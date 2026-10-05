import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Verify from "./authentication/Verify";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<Verify />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;