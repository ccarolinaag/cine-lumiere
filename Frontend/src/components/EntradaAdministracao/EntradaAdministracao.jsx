import styles from "./EntradaAdministracao.module.css";

import botaoLuzPressionado from "../../assets/botao-luz-apagada.png";
import botaoLuzNormal from "../../assets/botao-apagar-luz.png";
import configuracoes from "../../assets/botao-configuracoes.png";

function EntradaAdministracao({
    luzAcesa,
    setLuzAcesa,
    setAdministracaoAberta
}) {

    return (
        <div className={styles.entrada}>
            <div className={styles.fundoEntradaContainer}>
                <h1>Entrada</h1>
            </div>
            <div className={styles.administracao}>
                <button className={styles.botaoLuz} onClick={() => setLuzAcesa(!luzAcesa)}>
                    <img
                        src={luzAcesa ? botaoLuzNormal : botaoLuzPressionado}
                        alt={luzAcesa ? "Apagar luz" : "Acender luz"}
                    />
                </button>
                <button className={styles.botaoConfiguracoes}
                    onClick={() => setAdministracaoAberta(true)}>
                    <img src={configuracoes} alt="Configurações"/>
                </button>
            </div>
        </div>
    );
}

export default EntradaAdministracao;