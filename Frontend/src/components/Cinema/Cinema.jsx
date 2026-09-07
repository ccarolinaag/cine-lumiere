import { useState } from "react";

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
            filmes: [
                {
                    horario: "20H40",
                    filme: "Interestelar",
                    diretor: "Christopher Nolan",
                    ano: 2018,
                    duracao: 172,
                    pais: "EUA"
                },
                {
                    horario: "23H40",
                    filme: "Duna",
                    diretor: "Denis Villeneuve",
                    ano: 2024,
                    duracao: 166,
                    pais: "EUA"
                }
            ]
        },
        {
            numero: 2,
            porta: "esquerda",
            filmes: [
                {
                    horario: "21H10",
                    filme: "Duna",
                    diretor: "Denis Villeneuve",
                    ano: 2024,
                    duracao: 166,
                    pais: "EUA"
                },
                {
                    horario: "00H00",
                    filme: "Oppenheimer",
                    diretor: "Christopher Nolan",
                    ano: 2023,
                    duracao: 180,
                    pais: "EUA"
                }
            ]
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