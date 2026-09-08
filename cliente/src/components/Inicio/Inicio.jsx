import { useNavigate } from "react-router-dom";
import { buscarSessoes, buscarFilmes } from "../../services/api";

import styles from "./Inicio.module.css";

import fundoInicio from "../../assets/fundo-inicio.png";
import logo from "../../assets/logo.png";

import Botao from "../Botão/Botao";

function Inicio() {
    const navigate = useNavigate();

    return (
        <main className={styles.inicio}>
            <div className={styles.painel}>
                <img src={fundoInicio} alt="" className={styles.fundo} />
                <div className={styles.conteudo}>
                    <header className={styles.cabecalho}>
                        <img src={logo} alt="Cine Lumière" className={styles.logo} />
                    </header>
                    <main className={styles.apresentacao}>
                        <h1>Boas-vindas ao Cine Lumière!</h1>
                        <p>
                            O cinema acaba de contratar você para cuidar de suas sessões e manter viva uma tradição que parece ter parado no tempo. No Lumière, cada filme é preparado como nos antigos cinemas dos anos 1950: as salas precisam estar prontas, os corredores iluminados e a próxima sessão organizada antes que as cortinas se abram.
                            Cadastre os filmes, prepare as salas, acompanhe as sessões e mantenha o cinema funcionando.
                            As luzes estão acesas. O projetor espera por você. Seu trabalho começa agora.
                        </p>
                        <Botao
                            texto="Iniciar Jogo"
                            onClick={() => {
                                buscarSessoes()
                                    .then((sessoes) => {
                                        buscarFilmes()
                                            .then((filmes) => {
                                                navigate("/cinema", {
                                                    state: {
                                                        sessoes: sessoes,
                                                        filmes: filmes
                                                    }
                                                });
                                            });
                                    });
                            }}
                        />
                    </main>
                </div>
            </div>
        </main>
    );
}

export default Inicio;