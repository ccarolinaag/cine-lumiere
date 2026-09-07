import { useState } from "react";

import styles from "./Sala.module.css";

import imagemLuzAcesa from "../../assets/luz-acesa.png";
import luzApagada from "../../assets/luz-apagada.png";
import porta from "../../assets/porta.png";

import Botao from "../Botão/Botao";

function Sala({ sala, luzAcesa }) {
    const [indiceFilme, setIndiceFilme] = useState(0);

    const [statusSala, setStatusSala] = useState(
        sala.filmes.length === 0 ? "semProgramacao" : "aguardando"
    );

    const [ocupacaoAtual, setOcupacaoAtual] = useState(null);

    const imagemLuz = luzAcesa ? imagemLuzAcesa : luzApagada;

    const filmeAtual = sala.filmes[indiceFilme];

    function gerarOcupacao() {
        return Math.floor(Math.random() * 41);
    }

    function calcularTempoFilme(duracao) {
        return duracao / 20;
    }

    function iniciarSessao() {
        const ocupacao = gerarOcupacao();

        setOcupacaoAtual(ocupacao);
        setStatusSala("exibindo");
    }

    function terminarFilme() {
        setStatusSala("encerrado");
    }

    function prepararSala() {
        setStatusSala("preparando");
    }

    function terminarPreparacao() {
        const proximoFilme = indiceFilme + 1;

        if (proximoFilme < sala.filmes.length) {
            setIndiceFilme(proximoFilme);
            setOcupacaoAtual(null);
            setStatusSala("aguardando");
        } else {
            setOcupacaoAtual(null);
            setStatusSala("semSessoes");
        }
    }

    return (
        <section className={styles.salaCinema}>
            <div className={styles.informacoes}>
                <h2>SALA {sala.numero}</h2>
                {statusSala === "semProgramacao" && (
                    <div className={styles.infoFilme}>
                        <h3>Sala sem programação</h3>
                        <p>Nenhuma sessão cadastrada.</p>
                        <p>Acesse a Administração paraprogramar esta sala.</p>
                    </div>
                )}
                {statusSala !== "semProgramacao" && (
                    <>
                        <div className={styles.horario}>
                            <span>{filmeAtual.horario}</span>
                            <span className={styles.status}>
                                {statusSala === "aguardando" && "Em breve"}
                                {statusSala === "exibindo" && "Em exibição"}
                                {statusSala === "encerrado" && "Encerrado"}
                                {statusSala === "preparando" && "Preparando sala"}
                                {statusSala === "semSessoes" && "Programação encerrada"}
                            </span>
                        </div>
                        <div className={styles.infoFilme}>
                            <h3>{filmeAtual.filme}</h3>
                            <p>{filmeAtual.diretor}</p>
                            <p>
                                {filmeAtual.ano} |{" "}
                                {filmeAtual.duracao} min |{" "}
                                {filmeAtual.pais}
                            </p>
                        </div>
                        {statusSala === "aguardando" && (
                            <div className={styles.acaoSessao}>
                                <Botao
                                    texto="Iniciar sessão"
                                    onClick={iniciarSessao}
                                />
                                <p>Sessão aguardando início</p>
                            </div>
                        )} {statusSala === "exibindo" && (
                            <>
                                <div className={styles.progresso}>
                                    <div className={styles.progressoAtual}
                                        style={{
                                            animationDuration:
                                                `${calcularTempoFilme(
                                                    filmeAtual.duracao
                                                )}s`
                                        }}
                                        onAnimationEnd={terminarFilme}
                                    />
                                </div>
                                <p>Sessão em andamento</p>
                            </>
                        )} {statusSala === "encerrado" && (
                            <div className={styles.acaoSessao}>
                                <Botao
                                    texto="Preparar sala"
                                    onClick={prepararSala}
                                />
                            </div>
                        )} {statusSala === "preparando" && (
                            <>
                                <div className={styles.progresso}>
                                    <div className={styles.progressoAtual}
                                        style={{
                                            animationDuration: "3s"
                                        }}
                                        onAnimationEnd={terminarPreparacao}
                                    />
                                </div>
                                <p>Sala em preparação</p>
                            </>
                        )} {statusSala === "semSessoes" && (
                            <div className={styles.infoFilme}>
                                <p>Não há mais sessões para exibir.</p>
                            </div>
                        )}{(statusSala === "aguardando" ||
                            statusSala === "exibindo") && (
                                <div className={styles.ocupacao}>
                                    <strong>Ocupação da sala</strong>
                                    <span>{statusSala === "aguardando"
                                        ? "-- / 40"
                                        : `${ocupacaoAtual} / 40`
                                    }
                                    </span>
                                </div>
                            )}
                    </>
                )}
            </div>
            <div className={`${styles.acesso} ${styles[sala.porta]}`}>
                <img src={imagemLuz} className={styles.luz} />
                <img src={porta} alt={`Porta da Sala ${sala.numero}`} className={styles.porta} />
                <img src={imagemLuz} alt="" className={styles.luz} />
            </div>
        </section>
    );
}

export default Sala;