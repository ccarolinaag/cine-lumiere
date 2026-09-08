import { useState } from "react";
import { iniciarSessao } from "../../services/api";

import styles from "./Sala.module.css";

import imagemLuzAcesa from "../../assets/luz-acesa.png";
import luzApagada from "../../assets/luz-apagada.png";
import porta from "../../assets/porta.png";

import Botao from "../Botão/Botao";

function Sala({ sala, luzAcesa, onPrepararSala }) {
    const [indiceFilme, setIndiceFilme] = useState(0);
    const [ocupacaoAtual, setOcupacaoAtual] = useState(null);
    const [statusSala, setStatusSala] = useState("aguardando");

    const imagemLuz = luzAcesa ? imagemLuzAcesa : luzApagada;
    const filmeAtual = sala.filmes[indiceFilme];

    function calcularTempoFilme(duracao) {
        return duracao / 20;
    }

    function iniciarSessaoSala() {
        iniciarSessao(filmeAtual.id)
            .then((resposta) => {
                setOcupacaoAtual(resposta.ocupacao);
                setStatusSala("exibindo");
            })
            .catch((erro) => {
                console.log("Erro ao iniciar sessão:", erro);
            });
    }

    function terminarFilme() {
        setStatusSala("encerrado");
    }

    function prepararSala() {
        onPrepararSala();
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
                {sala.filmes.length === 0 ? (
                    <div className={styles.infoFilme}>
                        <h3>Sala sem programação</h3>
                        <p>Nenhuma sessão cadastrada.</p>
                        <p>Acesse a Administração para programar esta sala.</p>
                    </div>
                ) : (
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
                                    onClick={iniciarSessaoSala}
                                />
                                <p>Sessão aguardando início</p>
                            </div>
                        )}
                        {statusSala === "exibindo" && (
                            <>
                                <div className={styles.progresso}>
                                    <div
                                        className={styles.progressoAtual}
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
                        )}
                        {statusSala === "encerrado" && (
                            <div className={styles.acaoSessao}>
                                <Botao
                                    texto="Preparar sala"
                                    onClick={prepararSala}
                                />
                            </div>
                        )}
                        {statusSala === "preparando" && (
                            <>
                                <div className={styles.progresso}>
                                    <div
                                        className={styles.progressoAtual}
                                        style={{
                                            animationDuration: "3s"
                                        }}
                                        onAnimationEnd={terminarPreparacao}
                                    />
                                </div>
                                <p>Sala em preparação</p>
                            </>
                        )}
                        {statusSala === "semSessoes" && (
                            <div className={styles.infoFilme}>
                                <p>Não há mais sessões para exibir.</p>
                            </div>
                        )}
                        {(statusSala === "aguardando" ||
                            statusSala === "exibindo") && (
                                <div className={styles.ocupacao}>
                                    <strong>Ocupação da sala</strong>
                                    <span>
                                        {statusSala === "aguardando"
                                            ? "-- / 40"
                                            : `${ocupacaoAtual} / 40`}
                                    </span>
                                </div>
                            )}
                    </>
                )}
            </div>
            <div className={`${styles.acesso} ${styles[sala.porta]}`}>
                <img src={imagemLuz} className={styles.luz} />
                <img
                    src={porta}
                    alt={`Porta da Sala ${sala.numero}`}
                    className={styles.porta}
                />
                <img src={imagemLuz} alt="" className={styles.luz} />
            </div>
        </section>
    );
}

export default Sala;