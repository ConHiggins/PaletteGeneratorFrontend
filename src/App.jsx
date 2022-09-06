import logo from "./logo.svg";
import "./App.css";
import PaletteContainer from "./containers/PaletteContainer/PaletteContainer.jsx";
import AllPalettes from "./containers/AllPalettes/AllPalettes";
import Homepage from "./pages/Homepage/Homepage";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Generator from "./pages/Generator/Generator";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/generate" element={<Generator />} />
                    <Route path="/palettes" element={<AllPalettes />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
