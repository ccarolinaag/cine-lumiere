<p align="center">
  <img src="./cliente/src/assets/logo.png" alt="Cine Lumière" width="350">
</p>

## 🎬 Sobre o projeto
O **Cine Lumière** é um jogo de gerenciamento de cinema no qual o jogador administra as salas e sessões de um cinema durante um dia de funcionamento.
A aplicação permite acompanhar a programação das salas, cadastrar filmes e sessões, preparar e iniciar sessões, acompanhar a ocupação das salas e, ao final do dia, consultar um resumo com as principais métricas da operação.
O projeto foi desenvolvido como uma aplicação integrada entre **Front-end e Back-end**, com comunicação por meio de uma **API REST** e persistência dos dados em banco de dados relacional.



## 🎯 Objetivo
O objetivo do projeto é desenvolver uma aplicação Web funcional na qual o cliente desenvolvido em React consuma uma API REST desenvolvida em Java e Spring Boot.
O Back-end é responsável por receber as requisições, validar os dados, aplicar as regras de negócio e realizar a persistência das informações.
O Front-end é responsável pela interface, interação com o jogador e comunicação com a API.



## 🍿 Funcionalidades
Durante uma partida, o jogador pode:
  - Visualizar as salas disponíveis;
  - Consultar a programação das salas;
  - Visualizar filmes e horários das sessões;
  - Cadastrar filmes e sessões;
  - Preparar uma sala;
  - Iniciar uma sessão;
  - Acompanhar a ocupação da sala;
  - Encerrar uma sessão;
  - Finalizar o dia de funcionamento;
  - Consultar o resumo das métricas do dia;
  - Começar uma nova partida.



## 📜 Regras de negócio
O funcionamento do sistema segue as seguintes regras:

### 1. Não é permitido cadastrar duas sessões no mesmo horário em uma sala
Uma sala não pode possuir duas sessões com o mesmo horário de início.

### 2. Não são permitidas sessões sobrepostas
O sistema considera o horário de início e a duração do filme para verificar se uma nova sessão entra em conflito com outra sessão da mesma sala.

### 3. A ocupação é gerada pelo Back-end
A quantidade de espectadores não é definida pelo Front-end.
Ao iniciar uma sessão, o Back-end gera a ocupação da sala.

### 4. A capacidade máxima da sala é de 40 espectadores
A ocupação de cada sessão respeita a capacidade máxima de 40 espectadores.

### 5. Uma sessão só é contabilizada como realizada se for iniciada
O cadastro de uma sessão não significa que ela foi realizada.
A sessão somente é considerada realizada quando o jogador a inicia.

### 6. Sessões não iniciadas não são contabilizadas
Caso o jogador finalize o dia sem iniciar determinada sessão, ela não será considerada como sessão realizada.

### 7. As métricas finais são calculadas pelo Back-end
O Front-end não realiza os cálculos das métricas finais.
O cliente solicita os dados à API e apresenta as informações retornadas.

### 8. O tempo de preparação é considerado pelo Back-end
O tempo utilizado na preparação das salas é considerado no cálculo das métricas do dia.



## 🏛️ Arquitetura
```text
                                      ┌────────────────────┐
                                      │      Cliente       │
                                      │       React        │
                                      └─────────┬──────────┘
                                                │
                                                │ HTTP / REST
                                                ▼
                                      ┌────────────────────┐
                                      │        API         │
                                      │   Java / Spring    │
                                      │   Spring JDBC      │
                                      └─────────┬──────────┘
                                                │
                                                │ JDBC
                                                ▼
                                      ┌────────────────────┐
                                      │ Banco de dados H2  │
                                      └────────────────────┘

````



## 🖥️ Cliente
O cliente é responsável pela interface e pela interação do jogador com o sistema.
Entre suas responsabilidades estão:
  - Exibir as telas do jogo;
  - Exibir salas e sessões;
  - Receber as ações do jogador;
  - Enviar requisições para a API;
  - Receber respostas da API;
  - Atualizar a interface de acordo com os dados recebidos.
A documentação específica do Front-end está disponível em:
[README do Cliente](./cliente/README.md)



## ⚙️ API
A API é responsável pelo processamento dos dados, aplicação das regras de negócio e comunicação com o banco de dados.
Entre suas responsabilidades estão:
  - Gerenciar filmes;
  - Gerenciar sessões;
  - Validar dados recebidos;
  - Validar conflitos de horários;
  - Validar sobreposição de sessões;
  - Gerar a ocupação das sessões;
  - Controlar a capacidade das salas;
  - Registrar sessões iniciadas;
  - Calcular as métricas do dia;
  - Disponibilizar os recursos por meio de uma API REST.
A documentação específica do Back-end e dos endpoints está disponível em:
[README da API](./api/README.md)



## 🔄 Comunicação entre Cliente e API
A comunicação entre o cliente e a API ocorre por meio de requisições HTTP.
O fluxo básico da aplicação é:
``text
                                          Usuário
                                             │
                                             ▼
                                          Cliente React
                                             │
                                             │ HTTP Request
                                             ▼
                                          API REST
                                             │
                                             ▼
                                          Regras de negócio
                                             │
                                             ▼
                                          Banco de dados
                                             │
                                             ▼
                                          API REST
                                             │
                                             │ HTTP Response
                                             ▼
                                          Cliente React
                                             │
                                             ▼
                                          Usuário
``

O cliente envia as requisições para os endpoints disponibilizados pela API.
A API processa a solicitação, valida os dados, aplica as regras de negócio e, quando necessário, consulta ou altera informações no banco de dados.
Após o processamento, a API retorna uma resposta HTTP para o cliente, que utiliza os dados recebidos para atualizar a interface.



## 🔌 Principais recursos da API
A API disponibiliza recursos relacionados a:
| Recurso | Finalidade |
|---|---|
| Filmes | Cadastro e consulta de filmes |
| Sessões | Cadastro, consulta, início e remoção de sessões |
| Resumo do dia | Consulta das métricas do funcionamento do cinema |

A documentação completa dos endpoints, incluindo métodos HTTP, parâmetros, requisições, respostas e códigos de status, está disponível no [README da API](./api/README.md).



## 📡 Status HTTP utilizados
A API utiliza códigos HTTP para indicar o resultado das operações.
| Código | Significado |
|---|---|
| `200 OK` | Requisição realizada com sucesso |
| `201 Created` | Recurso criado com sucesso |
| `204 No Content` | Operação realizada sem conteúdo para retornar |
| `400 Bad Request` | Dados enviados são inválidos |
| `404 Not Found` | Recurso solicitado não existe |
| `409 Conflict` | Operação não pode ser realizada devido a um conflito |



## 🛠️ Tecnologias utilizadas
### Cliente
  - React
  - JavaScript
  - HTML
  - CSS
  - Vite
  - Axios
    
### API
  - Java 21
  - Spring Boot
  - Spring Web
  - Spring JDBC
  - Maven
  - 
## Banco de dados
  - H2 Database
    
## Ferramentas
  - Git
  - GitHub
  - Visual Studio Code
  - IntelliJ IDEA



## 📁 Estrutura do projeto
``text 
                                          cine-lumiere/
                                          │
                                          ├── cliente/
                                          │   ├── src/
                                          │   ├── package.json
                                          │   ├── ...
                                          │   └── README.md
                                          │
                                          ├── api/
                                          │   ├── src/
                                          │   ├── pom.xml
                                          │   ├── script.sql
                                          │   └── README.md
                                          │
                                          └── README.md
``

**Cliente:** O diretório cliente/ contém a aplicação Front-end desenvolvida em React.
**API:**O diretório api/ contém a aplicação Back-end desenvolvida em Java e Spring Boot.



## ▶️ Como executar o projeto
### Pré-requisitos
Antes de executar o projeto, é necessário ter instalado:
  - Java 21;
  - Maven;
  - Node.js;
  - npm;
  - Git.
  - 
### 1. Clonar o repositório
``text
git clone URL_DO_REPOSITORIO
``
Entre no diretório do projeto:
``text
cd cine-lumiere
``

### 2. Executar a API
Entre no diretório:
``text
cd api
``

### Execute a aplicação Spring Boot:
`` text
mvn spring-boot:run
``
A API será iniciada na porta configurada no projeto.

### 3. Executar o cliente
Em outro terminal, entre no diretório do cliente:
``text
cd cliente
``
Instale as dependências:
``text 
npm install
``
Execute o projeto:
``text 
npm run dev
``
O Vite disponibilizará o endereço local da aplicação no terminal.
Acesse o endereço informado pelo Vite no navegador.


## 🔗 Integração
Para utilizar a aplicação completa, a API deve estar em execução antes de utilizar as funcionalidades do cliente que dependem das requisições ao Back-end.
O cliente utiliza a API REST para:
  - Consultar sessões;
  - Cadastrar sessões;
  - Iniciar sessões;
  - Consultar o resumo do dia.
A URL utilizada pelo cliente para comunicação com a API é configurada no serviço de comunicação do Front-end.



## 🎓 Desenvolvimento acadêmico
O Cine Lumière foi desenvolvido como parte das atividades acadêmicas do curso de Análise e Desenvolvimento de Sistemas.
O projeto integra conhecimentos de desenvolvimento Front-end, desenvolvimento Web, APIs REST, HTTP, Java, Spring Boot, JDBC, banco de dados e desenvolvimento de interfaces seguindo processo de design UX/UI.

## ✍️ Autoria
Projeto desenvolvido por:
Clara Carolina
