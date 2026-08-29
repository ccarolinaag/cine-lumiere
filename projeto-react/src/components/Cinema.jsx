import styles from "./Cinema.module.css";

import logo from "../assets/logo.png";
import tapete from "../assets/tapete.png";
import sala from "../assets/fundo-sala.png";
import entrada from "../assets/fundo-entrada.png";
import bilheteria from "../assets/fundo-adm.png";

function Cinema() {
    const salas = [
        {
            numero: 1,
            horario: "20H40",
            status: "Em exibição",
            filme: "Interestelar",
            diretor: "Christopher Nolan",
            ano: 2018,
            duracao: 172,
            ocupacao: "20 / 40",
            sessao: "Sessão em andamento",
            porta: "direita"
        },

        {
            numero: 2,
            horario: "20H40",
            status: "Em exibição",
            filme: "Interestelar",
            diretor: "Christopher Nolan",
            ano: 2018,
            duracao: 172,
            ocupacao: "20 / 40",
            sessao: "Sessão chegando ao fim",
            porta: "esquerda"
        },

        {
            numero: 3,
            horario: "20H40",
            status: "Em exibição",
            filme: "Interestelar",
            diretor: "Christopher Nolan",
            ano: 2018,
            duracao: 172,
            ocupacao: "20 / 40",
            sessao: "Sessão finalizada",
            porta: "esquerda"
        }
    ];

    return (
        <main className="cinema">
            <img src={fundo} className={styles.fundo} alt="Planta do Cine Lumière" />
            <header className="cabecalho">
                <img src={logo} alt="Cine Lumière" className="logo" />
            </header>

            <section className="mapa-cinema">
                {/* ELEMENTOS DO ILLUSTRATOR */}
                <img src={tapete} alt="" className="tapete" />
                <img src={entrada} alt="" className="entrada" />
                <img src={bilheteria} alt="" className="bilheteria" />

                {/* SALAS */}
                {salas.map((sala) => (
                    <Sala
                        key={sala.numero}
                        {...sala}
                    />
                ))}
            </section>
        </main>
    );
}

export default Cinema;