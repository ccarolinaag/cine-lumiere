import styles from "./Mensagem.module.css";

function Mensagem({ texto, tipo }) {
    return (
        <p className={tipo === "sucesso" ? styles.sucesso : styles.erro}>
            {texto}
        </p>
    );
}

export default Mensagem;