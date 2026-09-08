# Cine Lumière — Cliente
Cliente Web do **Cine Lumière**, desenvolvido em React para a interface do jogo de gerenciamento de cinema.



## 🎬 Sobre o cliente
O cliente é responsável pela interface visual e pela interação do usuário com o jogo.
A aplicação permite visualizar as salas de cinema, acompanhar as sessões, cadastrar filmes, iniciar sessões, preparar salas e consultar o resumo do funcionamento do cinema.
O cliente também realiza as requisições necessárias para comunicação com a API desenvolvida em Spring Boot.



## 🛠️ Tecnologias utilizadas
  - React
  - JavaScript
  - Vite
  - React Router DOM
  - Axios
  - CSS Modules


## 📁 Estrutura do cliente

                                              ```
                                              cliente/
                                              ├── src/
                                              │   ├── assets/
                                              │   ├── components/
                                              │   │   ├── Administracao/
                                              │   │   ├── Botão/
                                              │   │   ├── CadastroFilme/
                                              │   │   ├── Cinema/
                                              │   │   ├── EntradaAdministracao/
                                              │   │   ├── FinalizarDia/
                                              │   │   ├── Inicio/
                                              │   │   ├── Mensagem/
                                              │   │   └── Sala/
                                              │   ├── data/
                                              │   ├── services/
                                              │   │   └── api.js
                                              │   ├── App.jsx
                                              │   ├── App.css
                                              │   ├── index.css
                                              │   ├── main.jsx
                                              │   └── routes.jsx
                                              ├── package.json
                                              └── README.md
                                              ```



## 🖥️ Principais componentes
| Componente | Função |
|---|---|
| `Inicio` | Apresenta a tela inicial do jogo |
| `Cinema` | Controla a tela principal do cinema e o funcionamento das salas |
| `Sala` | Exibe as informações da sala e controla o fluxo das sessões |
| `Administracao` | Centraliza as ações administrativas do cinema |
| `CadastroFilme` | Permite cadastrar filmes e sessões |
| `FinalizarDia` | Apresenta o resumo do funcionamento do cinema |
| `EntradaAdministracao` | Controla o acesso à área administrativa |
| `Mensagem` | Exibe mensagens de sucesso ou erro |
| `Botao` | Componente reutilizável para os botões da aplicação |



## 🧭 Rotas
O projeto utiliza **React Router DOM** para controlar a navegação entre as páginas.
| Rota | Componente | Função |
|---|---|---|
| `/` | `Inicio` | Tela inicial |
| `/cinema` | `Cinema` | Tela principal do jogo |



## 🔄 Comunicação com a API
As requisições realizadas pelo cliente são centralizadas no arquivo:
```text
src/services/api.js
```

Esse arquivo utiliza **Axios** para realizar as requisições HTTP para a API.
Entre as operações utilizadas pelo cliente estão:
| Operação | Método | Endpoint | Finalidade |
|---|---|---|---|
| Buscar resumo do dia | GET | `/resumo-dia` | Obter as métricas do funcionamento do cinema |
| Cadastrar sessão | POST | `/sessoes` | Cadastrar uma nova sessão |
| Buscar sessões | GET | `/sessoes` | Consultar as sessões cadastradas |
| Iniciar sessão | PUT | `/sessoes/{id}/iniciar` | Iniciar uma sessão e obter sua ocupação |

A API utilizada pelo projeto é executada localmente na porta `8080`.



## ▶️ Como executar
### 1. Instalar as dependências

Abra um terminal dentro da pasta `cliente`:
```bash
npm install
```

### 2. Iniciar o cliente
Execute:
```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento e exibirá no terminal o endereço para acessar a aplicação.



## 🔗 Integração com a API
Para que todas as funcionalidades do cliente estejam disponíveis, a API do projeto também deve estar em execução.
A comunicação ocorre da seguinte forma:
                                                      ```text
                                                      Usuário
                                                         ↓
                                                      Cliente React
                                                         ↓
                                                      Axios
                                                         ↓
                                                      API Spring Boot
                                                         ↓
                                                      Banco de dados
                                                      ```

O README específico da API contém as instruções para executar o backend e consultar seus endpoints.
**[README da API](../api/README.md)**

## 🎓 Desenvolvimento acadêmico
O cliente faz parte do projeto integrador **Cine Lumière**, desenvolvido para as atividades acadêmicas do curso de Análise e Desenvolvimento de Sistemas.
Para informações sobre o projeto completo, sua arquitetura, regras de negócio e integração entre cliente e API, consulte o README principal:
**[README do projeto](../README.md)**
