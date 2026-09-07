import { useState } from "react";

import styles from "./CadastroFilme.module.css";

import Botao from "../Botão/Botao";

function CadastroFilme({salas, setSalas}) {
    const [dadosFilme, setDadosFilme] = useState({
        numero: "",
        horario: "",
        filme: "",
        diretor: "",
        ano: "",
        duracao: "",
        pais: ""
    });


    function alterarCampo(event) {
        const nomeCampo = event.target.name;
        const valorCampo = event.target.value;

        setDadosFilme({ ...dadosFilme, [nomeCampo]: valorCampo});
    }


    function cadastrarFilme(event) {
        event.preventDefault();
        const novasSalas = salas.map((sala) => {

            if (sala.numero == dadosFilme.numero) {
                return { ...sala,
                    filmes: [...sala.filmes,
                        {
                            horario: dadosFilme.horario,
                            filme: dadosFilme.filme,
                            diretor: dadosFilme.diretor,
                            ano: dadosFilme.ano,
                            duracao: dadosFilme.duracao,
                            pais: dadosFilme.pais
                        }
                    ]
                };
            }
            return sala;
        });
        setSalas(novasSalas);
    }


    return (
        <div className={styles.cadastro}>
            <form className={styles.formulario} onSubmit={cadastrarFilme} >
                <div className={styles.colunas}>
                    <div className={styles.coluna}>
                        <div className={styles.campo}>
                            <label>Sala</label>
                            <select name="numero" value={dadosFilme.numero} onChange={alterarCampo}>
                                <option value="">Selecione a sala</option>
                                <option value="1">Sala 1</option>
                                <option value="2">Sala 2</option>
                                <option value="3">Sala 3</option>
                            </select>
                        </div>
                        <div className={styles.campo}>
                            <label>Filme</label>
                            <input
                                type="text"
                                name="filme"
                                value={dadosFilme.filme}
                                onChange={alterarCampo}
                                placeholder="Nome do filme"
                                required
                            />
                        </div>
                        <div className={styles.campo}>
                            <label>Ano</label>
                            <input
                                type="number"
                                name="ano"
                                value={dadosFilme.ano}
                                onChange={alterarCampo}
                                placeholder="Ex: 2024"
                                required
                            />
                        </div>
                        <div className={styles.campo}>
                            <label>País</label>
                            <input
                                type="text"
                                name="pais"
                                value={dadosFilme.pais}
                                onChange={alterarCampo}
                                placeholder="Ex: EUA"
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.coluna}>
                        <div className={styles.campo}>
                            <label>Horário</label>
                            <input
                                type="time"
                                name="horario"
                                value={dadosFilme.horario}
                                onChange={alterarCampo}
                            />
                        </div>
                        <div className={styles.campo}>
                            <label>Diretor</label>
                            <input
                                type="text"
                                name="diretor"
                                value={dadosFilme.diretor}
                                onChange={alterarCampo}
                                placeholder="Nome do diretor"
                                required
                            />
                        </div>
                        <div className={styles.campo}>
                            <label>Duração</label>
                            <input
                                type="number"
                                name="duracao"
                                value={dadosFilme.duracao}
                                onChange={alterarCampo}
                                placeholder="Em minutos"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.botao}>
                    <Botao texto="Cadastrar filme" type="submit"/>
                </div>
            </form>
        </div>
    );
}

export default CadastroFilme;