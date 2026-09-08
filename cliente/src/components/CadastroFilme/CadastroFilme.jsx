import { useState } from "react";
import { cadastrarSessao } from "../../services/api";

import styles from "./CadastroFilme.module.css";

import Botao from "../Botão/Botao";
import Mensagem from "../Mensagem/Mensagem";

function CadastroFilme({ salas, setSalas }) {
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    const [dadosFilme, setDadosFilme] = useState({
        numero: "",
        horario: "",
        filme: "",
        diretor: "",
        ano: "",
        duracao: "",
        pais: ""
    });

    function cadastrarFilme() {
        const dadosSessao = {
            sala: dadosFilme.numero,
            horario: dadosFilme.horario,
            nome: dadosFilme.filme,
            diretor: dadosFilme.diretor,
            ano: dadosFilme.ano,
            duracao: dadosFilme.duracao,
            pais: dadosFilme.pais
        };

        cadastrarSessao(dadosSessao)
            .then((resposta) => {
                const novasSalas = salas.map((sala) => {
                    if (sala.numero == dadosFilme.numero) {
                        return {
                            ...sala,
                            filmes: [
                                ...sala.filmes,
                                {
                                    id: resposta.id,
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
                setMensagem("Filme cadastrado com sucesso!");
                setTipoMensagem("sucesso");
            })
            .catch((erro) => {
                console.log("Erro na requisição:", erro);
                if (erro.response?.status === 400) {
                    setMensagem(
                        "Não foi possível cadastrar. Verifique se todos os dados foram preenchidos corretamente."
                    );
                } else if (erro.response?.status === 409) {
                    setMensagem(
                        "Não foi possível cadastrar. Já existe uma sessão nesse horário ou há conflito com outra sessão."
                    );
                } else {
                    setMensagem(
                        "Não foi possível cadastrar o filme. Tente novamente."
                    );
                }
                setTipoMensagem("erro");
            });
    }

    function alterarCampo(event) {
        const nomeCampo = event.target.name;
        const valorCampo = event.target.value;

        setDadosFilme({ ...dadosFilme, [nomeCampo]: valorCampo });
    }

    return (
        <div className={styles.cadastro}>
            <form className={styles.formulario}>
                <div className={styles.colunas}>
                    <div className={styles.coluna}>
                        <div className={styles.campo}>
                            <label>Sala</label>
                            <select
                                name="numero"
                                value={dadosFilme.numero}
                                onChange={alterarCampo}
                            >
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
                    <Botao
                        texto="Cadastrar filme"
                        type="button"
                        onClick={cadastrarFilme}
                    />
                </div>
                {mensagem && (
                    <Mensagem
                        texto={mensagem}
                        tipo={tipoMensagem}
                    />
                )}
            </form>
        </div>
    );
}

export default CadastroFilme;