import { useState } from "react";

import styles from "./Administracao.module.css";

import administracao from "../../assets/administracao.png";
import botaoVoltar from "../../assets/botao-voltar.png";

import Botao from "../Botão/Botao";
import CadastroFilme from "../CadastroFilme/CadastroFilme";
import FinalizarDia from "../FinalizarDia/FinalizarDia";


function Administracao({
    setAdministracaoAberta,
    salas,
    setSalas,
    comecarDeNovo
}) {

    const [cadastroAberto, setCadastroAberto] = useState(false);
    const [diaFinalizado, setDiaFinalizado] = useState(false);


    const resumoMockado = {
        publicoTotal: 127,
        sessoesRealizadas: 6,
        tempoPreparacao: "00:18",
        sessaoMaisCheia: {
            filme: "Duna",
            sala: 2,
            horario: "21H10",
            espectadores: 38,
            capacidade: 40,
            ocupacao: 95
        }
    };


    return (
        <main className={styles.administracao}>
            <div className={styles.painel}>
                <img src={administracao} alt="Administração" className={styles.fundo}/>
                <div className={styles.conteudo}>
                    {!diaFinalizado && (
                        <div className={styles.botoes}>
                            <div>
                                <Botao imagem={botaoVoltar} onClick={() => {
                                        if (cadastroAberto) {
                                            setCadastroAberto(false);
                                        } else {
                                            setAdministracaoAberta(false);
                                        }
                                    }}
                                    className={styles.botaoVoltar}/>
                            </div>
                            {!cadastroAberto && (
                                <div className={styles.botoesMaiores}>
                                    <Botao texto="Finalizar dia" onClick={() =>
                                        setDiaFinalizado(true)}
                                        className={styles.botao}
                                    />
                                    <Botao texto="Cadastrar filme" onClick={() =>
                                            setCadastroAberto(true)}
                                            className={styles.botao}
                                    />
                                </div>
                            )} {cadastroAberto && (
                                <h2 className={styles.tituloCadastro}>Cadastrar filme</h2>
                            )}
                        </div>
                    )}{diaFinalizado ? (
                        <FinalizarDia resumo={resumoMockado} comecarDeNovo={comecarDeNovo}/>
                    ) : !cadastroAberto ? (
                        <div className={styles.salas}>
                            {salas.map((sala) => (
                                <div className={styles.sala}>
                                    <div className={styles.tituloSala}>
                                        <h2>SALA {sala.numero}</h2>
                                    </div>
                                    <div className={styles.sessoes}>
                                        {sala.filmes.length > 0 ? (
                                            sala.filmes.map((filme) => (
                                                <div className={styles.sessao}>
                                                    <span className={styles.horario}>{filme.horario}</span>
                                                    <div className={styles.filme}>
                                                        <h1 className={styles.filme}>{filme.filme}</h1>
                                                        <span className={styles.duracao}>{filme.duracao}{" min"}</span>
                                                    </div>
                                                </div>
                                            ))) : (
                                            <p className={styles.semProgramacao}>Nenhuma sessão cadastrada</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <CadastroFilme salas={salas}setSalas={setSalas}/>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Administracao;