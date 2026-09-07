import { useState } from "react";

import Cinema from "./components/Cinema/Cinema";
import Inicio from "./components/Inicio/Inicio";

function App() {
    const [jogoIniciado, setJogoIniciado] = useState(false);
    const [partida, setPartida] = useState(0);

    function comecarDeNovo() {
        setPartida(partida + 1);
        setJogoIniciado(true);
    }

    return (
        <>
            <Cinema key={partida} jogoIniciado={jogoIniciado} comecarDeNovo={comecarDeNovo}/>
            {!jogoIniciado && (
                <Inicio setJogoIniciado={setJogoIniciado}/>
            )}
        </>
    );
}

export default App;