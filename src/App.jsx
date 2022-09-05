import logo from "./logo.svg";
import "./App.css";
import PaletteContainer from "./containers/PaletteContainer/PaletteContainer.jsx";
import AllPalettes from "./containers/AllPalettes/AllPalettes";

function App() {
    return (
        <div className="App">
            <PaletteContainer />
            <AllPalettes />
        </div>
    );
}

export default App;
