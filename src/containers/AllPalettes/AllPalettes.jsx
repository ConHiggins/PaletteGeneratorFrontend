import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PaletteContainer from "../PaletteContainer/PaletteContainer";
import "./AllPalettes.scss";

const AllPalettes = () => {
    const [palettesData, setPalettesData] = useState([]);

    const fetchAllPalettes = async () => {
        try {
            const response = await fetch("http://localhost:8080/palettes");

            if (!response.ok) {
                throw new Error(response.status + " error with request");
            }
            const data = await response.json();
            setPalettesData([...data]);
            console.log(palettesData);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchAllPalettes();
    }, []);

    const paletteBlocks = palettesData.map((p) => (
        <PaletteContainer
            key={p.id}
            cols={p.coloursHex}
            type="loaded"
            name={p.name}
            createdBy={p.createdBy}
        />
    ));

    return (
        <div>
            <Navbar />
            <div className="all-palettes">
                <h1>All Palettes</h1>
                <div>{paletteBlocks}</div>
            </div>
        </div>
    );
};

export default AllPalettes;
