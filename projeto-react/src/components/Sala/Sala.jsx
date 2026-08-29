import sala from "../../assets/fundo-sala.png";

function Sala({ numero, horario, status, filme, diretor, ano, duracao, ocupacao, sessao, porta }) {

    return (
        <div className={`sala sala-${numero}`}>
            <img src={sala} alt="" className="imagem-sala" />
            <div className="informacoes-sala">
                <h2>SALA {numero}</h2>
                <span className="horario">{horario}</span>
                <span className="status">{status}</span>
                <h3>{filme}</h3>
                <p>{diretor}</p>
                <p>{ano} | {duracao} min | EUA</p>
                <div className="progresso">
                    <div className="progresso-atual"></div>
                </div>
                <span className="sessao">{sessao}</span>
                <strong>Ocupação da sala</strong>
                <span>{ocupacao}</span>
            </div>
        </div>
    );
}

export default Sala;