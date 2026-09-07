import styles from "./FinalizarDia.module.css";

import Botao from "../Botão/Botao";


function FinalizarDia({resumo, comecarDeNovo, quantidadePreparacoes}) {
    return (
        <div className={styles.finalizarDia}>
            <div className={styles.titulo}>
                <h1>Fim do expediente</h1>
                <p>
                    As cortinas se fecharam.
                    <br />
                    O último projetor foi desligado.
                </p>
                <span>Veja como foi o seu dia:</span>
            </div>
            <div className={styles.metricas}>
                <div className={styles.metrica}>
                    <strong>{resumo.publicoTotal}</strong>
                    <span>Público total</span>
                </div>
                <div className={styles.metrica}>
                    <strong>{resumo.sessoesRealizadas}</strong>
                    <span>Sessões realizadas</span>
                </div>
                <div className={styles.metrica}>
                    <strong>{resumo.tempoPreparacao}</strong>
                    <span>Tempo de preparação</span>
                </div>
                <div className={styles.metrica}>
                    <strong>{resumo.sessaoMaisCheia.ocupacao}%
                    </strong>
                    <span>Maior ocupação</span>
                </div>
            </div>
            <div className={styles.destaque}>
                <h2>DESTAQUE DO DIA</h2>
                <p>
                    A sala mais movimentada
                    <br />
                    foi a Sala {resumo.sessaoMaisCheia.sala}.
                </p>
                <h3>{resumo.sessaoMaisCheia.filme}{" — "}{resumo.sessaoMaisCheia.horario}</h3>
                <span>{resumo.sessaoMaisCheia.espectadores}{" / "}{resumo.sessaoMaisCheia.capacidade}{" espectadores"}</span>
                <strong>{resumo.sessaoMaisCheia.ocupacao}%{" de ocupação"}</strong>
            </div>
            <div className={styles.acao}>
                <Botao
                    texto="Começar de novo"
                    onClick={comecarDeNovo}
                />
            </div>
        </div>
    );
}

export default FinalizarDia;