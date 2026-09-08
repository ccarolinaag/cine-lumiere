# Cine Lumière — API
API responsável pelo backend do **Cine Lumière**, desenvolvida em Java com Spring Boot.
A API é responsável pelo processamento das regras de negócio, gerenciamento das sessões e filmes e fornecimento dos dados utilizados pelo cliente Web.



## ⚙️ Sobre a API
A API recebe as requisições realizadas pelo cliente, processa as informações e realiza as operações necessárias no banco de dados.
Entre suas responsabilidades estão:
- Cadastro e consulta de filmes;
- Cadastro, consulta e remoção de sessões;
- Início das sessões;
- Controle da ocupação das salas;
- Validação dos horários das sessões;
- Verificação de conflitos entre sessões;
- Geração do resumo do funcionamento do cinema;
- Cálculo do tempo utilizado na preparação das salas.



## 🛠️ Tecnologias utilizadas
- Java
- Spring Boot
- Spring JDBC
- Maven
- H2 Database

---
## 📁 Estrutura da API
  ```text
                                                                    api/
                                                                    ├── src/
                                                                    │   └── main/
                                                                    │       ├── java/
                                                                    │       │   └── ...
                                                                    │       └── resources/
                                                                    │           └── application.properties
                                                                    ├── pom.xml
                                                                    ├── script.sql
                                                                    └── README.md
  ```



## 🗄️ Banco de dados
A API utiliza o **H2 Database** para armazenar os dados durante a execução da aplicação.
O banco é configurado como um banco em memória:
```properties
spring.datasource.url=jdbc:h2:mem:meu_banco
spring.datasource.username=sa
spring.datasource.password=
```

Como o banco é executado em memória, os dados são recriados quando a aplicação é reiniciada.
O script de criação das tabelas e inserção dos dados iniciais está disponível em:
```text
api/script.sql
```

### Tabelas
A API utiliza as seguintes estruturas principais:
| Tabela | Finalidade |
|---|---|
| `filme` | Armazena os dados dos filmes |
| `sessao` | Armazena as sessões cadastradas e seus dados de execução |

A tabela `sessao` possui uma relação com `filme` por meio do campo `filme_id`.

---

## 🔌 Endpoints
### Filmes
| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/filmes` | Consulta todos os filmes |
| `GET` | `/filmes/{id}` | Consulta um filme pelo ID |
| `POST` | `/filmes` | Cadastra um filme |
| `PUT` | `/filmes/{id}` | Atualiza os dados de um filme |

### Sessões
| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/sessoes` | Consulta todas as sessões |
| `GET` | `/sessoes/{id}` | Consulta uma sessão pelo ID |
| `POST` | `/sessoes` | Cadastra uma nova sessão |
| `PUT` | `/sessoes/{id}/iniciar` | Inicia uma sessão |
| `DELETE` | `/sessoes/{id}` | Remove uma sessão |

### Resumo do dia
| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/resumo-dia` | Consulta o resumo do funcionamento do cinema |



## 📜 Regras de negócio
### Cadastro de sessões
Ao cadastrar uma sessão, a API verifica:
  - Se a sala foi informada;
  - Se o horário foi informado;
  - Se os dados do filme foram preenchidos;
  - Se já existe uma sessão no mesmo horário para a sala;
  - Se o horário da nova sessão entra em conflito com outra sessão existente.

As sessões também consideram a duração do filme para verificar possíveis sobreposições.



### Início de uma sessão
Uma sessão pode ser iniciada por meio do endpoint:
```text
PUT /sessoes/{id}/iniciar
```

Ao iniciar a sessão, a API:
1. Verifica se a sessão existe;
2. Gera a ocupação da sala;
3. Atualiza a sessão como iniciada;
4. Retorna os dados atualizados da sessão.
A ocupação é gerada pela API e possui limite de **40 espectadores**, correspondente à capacidade da sala.



### Preparação das salas
O cliente contabiliza quantas salas foram preparadas durante o funcionamento do cinema.
Essa quantidade é enviada para a API na consulta do resumo do dia.
A API utiliza essa informação para calcular o tempo total utilizado na preparação das salas.
Cada preparação corresponde a **30 segundos**.



### Resumo do dia
O resumo do dia é calculado pela API a partir dos dados das sessões e da quantidade de preparações informada pelo cliente.
Somente as sessões que foram iniciadas são consideradas como sessões realizadas.
O cliente apenas apresenta os dados retornados pela API.



## 📡 Status HTTP
A API utiliza códigos de status HTTP para indicar o resultado das operações.
| Status | Significado |
|---|---|
| `200 OK` | Requisição realizada com sucesso |
| `201 Created` | Recurso criado com sucesso |
| `204 No Content` | Operação realizada sem conteúdo para retornar |
| `400 Bad Request` | Dados enviados são inválidos |
| `404 Not Found` | Recurso não encontrado |
| `409 Conflict` | Conflito com uma regra de negócio existente |



## 📤 Exemplo de requisição
### Cadastro de sessão

                                                  ```http
                                                  POST /sessoes
                                                  ```
                                                  
                                                  ```json
                                                  {
                                                      "sala": 1,
                                                      "horario": "20:00",
                                                      "nome": "Interestelar",
                                                      "diretor": "Christopher Nolan",
                                                      "ano": 2014,
                                                      "duracao": 169,
                                                      "pais": "EUA"
                                                  }
                                                  ```

### Início de sessão
```http
PUT /sessoes/1/iniciar
```

A API retorna os dados da sessão após a atualização, incluindo a ocupação gerada.



## ▶️ Como executar
### 1. Abrir o projeto
Abra a pasta `api` no **IntelliJ IDEA**.

### 2. Executar a aplicação
Localize a classe principal da aplicação Spring Boot e execute utilizando o botão **Run** da IDE.

A API será iniciada na porta configurada no projeto.



## 🔗 Integração com o cliente
O cliente React realiza as requisições HTTP para esta API utilizando **Axios**.
A comunicação ocorre da seguinte forma:

```text
                                                Cliente React
                                                      ↓
                                                    Axios
                                                      ↓
                                                API Spring Boot
                                                      ↓
                                                Banco H2
```

A URL utilizada pelo cliente para acessar a API local é:
```text
http://localhost:8080
```

Para consultar a documentação específica do cliente:
**[README do Cliente](../cliente/README.md)**

Para consultar a documentação geral do projeto:
**[README principal](../README.md)**


## 🎓 Desenvolvimento acadêmico
A API faz parte do projeto integrador **Cine Lumière**, desenvolvido para as atividades acadêmicas do curso de Análise e Desenvolvimento de Sistemas.
