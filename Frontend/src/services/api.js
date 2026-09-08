import axios from "axios";

const URL_API = "http://localhost:8080";

export function buscarResumoDia(quantidadePreparacoes) {
    return axios.get(
        `${URL_API}/resumo-dia?quantidadePreparacoes=${quantidadePreparacoes}`
    )
    .then((resposta) => {
        return resposta.data;
    })
    .catch((erro) => {
        console.log("Erro na requisição:", erro);
    });
}

export function cadastrarSessao(dadosSessao) {
    return axios.post(
        `${URL_API}/sessoes`,
        dadosSessao
    )
    .then((resposta) => {
        return resposta.data;
    })
    .catch((erro) => {
        console.log("Erro na requisição:", erro);
    });
}

export function iniciarSessao(id) {
    return axios.put(
        `${URL_API}/sessoes/${id}/iniciar`
    )
    .then((resposta) => {
        return resposta.data;
    });
}

export function buscarSessoes() {
    return axios.get(`${URL_API}/sessoes`)
        .then((resposta) => {
            return resposta.data;
        })
        .catch((erro) => {
            console.log("Erro na requisição:", erro);
        });
}

export function buscarFilmes() {
    return axios.get(`${URL_API}/filmes`)
        .then((resposta) => {
            return resposta.data;
        })
        .catch((erro) => {
            console.log("Erro na requisição:", erro);
        });
}