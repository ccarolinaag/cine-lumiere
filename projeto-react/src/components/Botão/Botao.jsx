import styles from "./Botao.module.css";

import botaoVermelho from "../../assets/botao-vermelho.png";

function Botao({ texto, onClick, type, imagem, className }) {

    return (
        <button type={type}
            className={`${styles.botao} ${className || ""}`}
            onClick={onClick}>
            <img src={imagem || botaoVermelho} alt=""/>
            <span>{texto}</span>
        </button>
    );
}

export default Botao;