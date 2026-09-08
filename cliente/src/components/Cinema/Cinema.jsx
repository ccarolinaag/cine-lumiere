import { useState } from "react";
import { buscarSessoes } from "../../services/api";

import styles from "../Cinema/Cinema.module.css";

import fundo from "../../assets/fundo.png";
import logo from "../../assets/logo.png";
import tapete from "../../assets/tapete.png";

import Sala from "../Sala/Sala";
import EntradaAdministracao from "../EntradaAdministracao/EntradaAdministracao";
import Administracao from "../Administracao/Administracao";

function Cinema({ jogoIniciado }) {
    function comecarDeNovo() {
        setSalas(salasIniciais);
        setLuzAcesa(true);
        setAdministracaoAberta(false);
        setQuantidadePreparacoes(0);
    }

    const salasIniciais = [
        {
            numero: 1,
            porta: "direita",
            filmes: []
        },
        {
            numero: 2,
            porta: "esquerda",
            filmes: []
        },
        {
            numero: 3,
            porta: "superior",
            filmes: []
        }
    ];

    const [salas, setSalas] = useState(salasIniciais);


    const [luzAcesa, setLuzAcesa] = useState(true);
    const [administracaoAberta, setAdministracaoAberta] = useState(false);
    const [quantidadePreparacoes, setQuantidadePreparacoes] = useState(0);

    function registrarPreparacao() {
        setQuantidadePreparacoes(quantidadePreparacoes + 1);
    }

    function carregarSessoes() {
        buscarSessoes()
            .then((sessoes) => {
                console.log("Sessões recebidas:", sessoes);
            });
    }

    return (
        <div className={styles.tela}>
            <main className={`${styles.cinema} ${!jogoIniciado || administracaoAberta ? styles.cinemaDesfocado : ""}`}>
                <img src={fundo} alt="" className={styles.fundo} />
                <header className={styles.cabecalho}>
                    <img src={logo} alt="Cine Lumière" className={styles.logo} />
                </header>
                <section className={styles.mapa}>
                    <img src={tapete} alt="Tapete"
                        className={`${styles.tapete} ${!luzAcesa ? styles.tapeteApagado : ""}`}
                    />
                    <div className={styles.entradaAdministracao}>
                        <EntradaAdministracao
                            luzAcesa={luzAcesa}
                            setLuzAcesa={setLuzAcesa}
                            setAdministracaoAberta={setAdministracaoAberta}
                        />
                    </div>
                    {jogoIniciado && (
                        <div className={styles.salas}>
                            {salas.map((sala) => (
                                <div className={styles[`sala${sala.numero}`]}>
                                    <Sala
                                        sala={sala}
                                        luzAcesa={luzAcesa}
                                        onPrepararSala={registrarPreparacao} />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            {administracaoAberta && (
                <Administracao
                    setAdministracaoAberta={setAdministracaoAberta}
                    salas={salas}
                    setSalas={setSalas}
                    comecarDeNovo={comecarDeNovo}
                    quantidadePreparacoes={quantidadePreparacoes} />
            )}
            
        </div>
    );
}

export default Cinema;