# Cine Lumière

## Sobre o projeto

O **Cine Lumière** é um jogo de gerenciamento de cinema no qual o jogador administra as salas e sessões de um cinema durante um dia de funcionamento.

A proposta é permitir que o jogador acompanhe a programação das salas, cadastre filmes, prepare e inicie sessões, acompanhe a ocupação das salas e, ao final do dia, consulte um resumo com as principais métricas da operação.

O projeto foi desenvolvido com uma arquitetura composta por **Front-end, Back-end e banco de dados**, com comunicação entre as camadas por meio de uma **API REST**.

---

## O que é possível fazer

Durante o jogo, o jogador pode:

  - Visualizar as salas disponíveis;
  - Consultar a programação de cada sala;
  - Visualizar as sessões e seus respectivos horários;
  - Cadastrar novos filmes e sessões;
  - Preparar uma sala para uma sessão;
  - Iniciar uma sessão;
  - Acompanhar a ocupação da sala;
  - Encerrar uma sessão;
  - Finalizar o dia de funcionamento do cinema;
  - Visualizar as métricas do dia após seu encerramento;
  - Começar uma nova partida.

---

## Como funciona o jogo

O jogo representa o funcionamento de um cinema ao longo de um dia.

Cada sala possui uma programação de sessões. Para que uma sessão seja realizada, ela precisa ser iniciada pelo jogador. Quando uma sessão é iniciada, o **Back-end gera a quantidade de espectadores**, respeitando a capacidade máxima da sala.

Durante o funcionamento, o jogador pode acompanhar o estado das salas e das sessões.

Ao selecionar **Finalizar dia**, o sistema encerra o expediente e apresenta um resumo da operação, contendo as métricas calculadas pelo Back-end.

O Front-end é responsável pela apresentação dessas informações, mas não realiza os cálculos das métricas finais.

---

# Regras de negócio

O funcionamento do sistema segue as seguintes regras:

### 1. Não é permitido cadastrar duas sessões no mesmo horário em uma sala

Uma sala não pode possuir duas sessões com o mesmo horário de início.

### 2. Não são permitidas sessões sobrepostas

Além de verificar o horário de início, o sistema considera a duração do filme.

Uma nova sessão não pode ser cadastrada caso seu horário de início ocorra enquanto outra sessão da mesma sala ainda estiver em andamento.

### 3. A ocupação é gerada pelo Back-end

A quantidade de espectadores de uma sessão não é definida pelo Front-end.

Quando uma sessão é iniciada, o Back-end é responsável por gerar sua ocupação.

### 4. A capacidade máxima da sala é de 40 espectadores

A ocupação gerada para uma sessão deve respeitar o limite de: 40 espectadores

### 5. Uma sessão só é contabilizada como realizada se for iniciada

O simples cadastro ou existência de uma sessão na programação não significa que ela foi realizada.

###6. Sessões não iniciadas são consideradas não realizadas

Caso o jogador finalize o dia sem iniciar determinada sessão, ela deve ser considerada como não realizada.

### 7. O Front-end não calcula as métricas finais

As métricas apresentadas no encerramento do dia devem ser obtidas a partir dos dados fornecidos pelo Back-end.

O Front-end é responsável por:

  - solicitar os dados;
  - receber a resposta da API;
  - apresentar as informações na interface.

Os cálculos e regras relacionados às métricas pertencem ao Back-end.

### 8. O tempo de preparação é registrado pelo Back-end

O tempo necessário para preparar uma sala para uma sessão deve ser registrado pelo Back-end.

O Front-end não deve criar ou calcular esse valor para compor as métricas finais.

---

## Arquitetura

                          ┌────────────────────┐
                          │     Front-end      │
                          │      React         │
                          └─────────┬──────────┘
                                    │
                                    │ HTTP / REST
                                    ▼
                          ┌────────────────────┐
                          │      Back-end      │
                          │   Spring Boot      │
                          │       JDBC         │
                          └─────────┬──────────┘
                                    │
                                    │ JDBC
                                    ▼
                          ┌────────────────────┐
                          │    Banco de dados  │
                          │        H2          │
                          └────────────────────┘
    

### Front-end

Responsável pela interface e pela interação do jogador com o sistema.

Principais responsabilidades:

  - Exibir as telas do jogo;
  - Exibir salas e sessões;
  - Receber as ações do jogador;
  - Enviar requisições para a API;
  - Receber respostas da API;
  - Atualizar a interface de acordo com os dados recebidos.

O Front-end não deve ser responsável pelas regras de negócio que pertencem ao Back-end.


### Back-end

Responsável pelas regras de negócio e pelo processamento das informações.

Principais responsabilidades:

  - Gerenciar filmes;
  - Gerenciar salas e sessões;
  - Validar conflitos de horários;
  - Validar sobreposição de sessões;
  - Gerar a ocupação das sessões;
  - Controlar o limite de 40 espectadores;
  - Registrar quais sessões foram iniciadas;
  - Registrar o tempo de preparação;
  - Calcular as métricas finais;
  - Disponibilizar os dados por meio da API REST.
  - Banco de dados

O banco de dados é responsável pelo armazenamento das informações utilizadas pelo sistema.

Entre os dados armazenados estão informações relacionadas a:

  - Filmes;
  - Salas;
  - Sessões;
  - Horários;
  - Duração dos filmes;
  - Ocupação;
  - Estado das sessões;
  - Informações necessárias para as métricas do dia.

O projeto utiliza H2 como banco de dados.

---

## Tecnologias utilizadas
### Front-end
  - React
  - JavaScript
  - HTML
  - CSS
  - Vite

### Back-end
  - Java 21
  - Spring Boot
  - Spring Web
  - Spring JDBC
  - Maven

### Banco de dados
  - H2 Database

### Ferramentas
  - Git
  - GitHub
  - IntelliJ IDEA ou outra IDE compatível
  - Visual Studio Code ou outra IDE compatível com React

---

### Comunicação entre Front-end e Back-end

A comunicação entre as aplicações ocorre por meio de requisições HTTP para a API REST.

O fluxo básico é:
    
                              Usuário
                                 │
                                 ▼
                              Front-end
                                 │
                                 │ HTTP Request
                                 ▼
                              API REST
                                 │
                                 ▼
                              Back-end
                                 │
                                 ▼
                              Banco de dados
                                 │
                                 ▼
                              Back-end
                                 │
                                 │ HTTP Response
                                 ▼
                              Front-end
                                 │
                                 ▼
                              Usuário


Por exemplo, quando o jogador solicita informações sobre as sessões, o Front-end envia uma requisição para a API.

A API processa a solicitação, consulta os dados necessários no banco e retorna uma resposta HTTP contendo as informações.


---

### API

A API REST é responsável por disponibilizar os recursos utilizados pelo Front-end.

Os principais recursos do sistema estão relacionados a:

  - Filmes;
  - Salas;
  - Sessões;
  - Funcionamento do cinema;
  - Encerramento do dia;
  - Métricas.

## Padrão das requisições

As requisições utilizam os métodos HTTP de acordo com a operação realizada.
| Método   | Utilização                     |
| -------- | ------------------------------ |
| `GET`    | Consultar informações          |
| `POST`   | Cadastrar ou criar informações |
| `PUT`    | Atualizar informações          |
| `DELETE` | Remover informações            |


## Estrutura do projeto

O projeto é organizado separando as responsabilidades do Front-end e do Back-end.

                            Início
                              │
                              ▼
                            Visualização das salas
                              │
                              ▼
                            Consulta da programação
                              │
                              ├───────────────┐
                              │               │
                              ▼               ▼
                            Iniciar sessão   Cadastrar filme
                              │               │
                              ▼               ▼
                            Preparar sala    Nova sessão
                              │               │
                              ▼               │
                            Iniciar sessão ◄──┘
                              │
                              ▼
                            Ocupação gerada pelo Back-end
                              │
                              ▼
                            Sessão realizada
                              │
                              ▼
                            Próximas sessões
                              │
                              ▼
                            Finalizar dia
                              │
                              ▼
                            Back-end calcula métricas
                              │
                              ▼
                            Resumo do dia
                              │
                              ▼
                            Nova partida

## Estrutura do projeto

O projeto é organizado separando as responsabilidades do Front-end e do Back-end.

                            cine-lumiere/
                            │
                            ├── projeto-react/
                            │   ├── src/
                            │   │   ├── components/
                            │   │   ├── data/
                            │   │   ├── App.jsx
                            │   │   └── ...
                            │   │
                            │   ├── package.json
                            │   └── ...
                            │
                            ├── projeto-java/
                            │   ├── src/
                            │   │   ├── main/
                            │   │   │   └── java/
                            │   │   └── test/
                            │   │
                            │   ├── pom.xml
                            │   └── ...
                            │
                            └── README.md


## Como instalar o projeto

### Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

  - Java 21
  - Maven
  - Node.js
  - npm
  - Git

O projeto utiliza Java 21 no Back-end.

### Clonando o repositór
Clone o repositório utilizando:

``git clone URL_DO_REPOSITORIO``

Depois, entre no diretório do projeto:

``cd cine-lumiere``


### Instalando o Front-end
Entre na pasta do React:
``cd projeto-react``

Instale as dependências:
``npm install``

Depois de instalar as dependências, execute o projeto:
``npm run dev``

O Vite disponibilizará o endereço local da aplicação no terminal.

Acesse o endereço informado pelo Vite no navegador.

### Instalando o Back-end
Entre no diretório do projeto Java:
``cd projeto-java``

Instale as dependências do Maven:
``mvn install``

Para executar a aplicação Spring Boot:
``mvn spring-boot:run``

A API será iniciada localmente na porta configurada no projeto.

## Desenvolvimento acadêmico
O projeto foi desenvolvido como parte das atividades acadêmicas do curso de Análise e Desenvolvimento de Sistemas, envolvendo conceitos de desenvolvimento Web, APIs REST, HTTP, Java, Spring Boot, JDBC, banco de dados e desenvolvimento de interfaces.

O desenvolvimento também considera a separação de responsabilidades entre Front-end, Back-end e banco de dados, além da aplicação de regras de negócio no lado do servidor.

## Autores
Projeto desenvolvido por:
Clara Carolina 
