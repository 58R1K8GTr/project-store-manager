# 🛒 Store Manager API — Gestão de Vendas com Arquitetura em Camadas (MSC)

A **Store Manager API** é um sistema completo de gerenciamento de vendas e estoque desenvolvido no padrão RESTful. A aplicação funciona como um ecossistema de dropshipping onde é possível criar, visualizar, atualizar e deletar produtos e vendas de forma integrada a um banco de dados relacional.

---

## 🚀 Habilidades Desenvolvidas & Consolidadas

Este projeto consolidou conceitos fundamentais de engenharia de software voltados para a manutenibilidade, organização de código e testes automatizados:

* **Arquitetura de Software em Camadas (MSC):**
    * Divisão estrita de responsabilidades utilizando o padrão **Models, Services e Controllers**.
    * **Models:** Camada isolada responsável puramente pela comunicação com o banco de dados via queries SQL nativas.
    * **Services:** Concentração de todas as regras de negócio, chamadas condicionais e validações profundas de dados.
    * **Controllers:** Gerenciamento dos fluxos de requisição/resposta HTTP, tratando parâmetros, corpos de dados e orquestrando as respostas semânticas.
* **Operações Relacionais Nativas (MySQL):**
    * Criação e consumo de queries relacionais utilizando cláusulas complexas como `INNER JOIN`, agrupamento e ordenação de dados.
    * Utilização prática de restrições de integridade referencial como `ON DELETE CASCADE` para a remoção automatizada em tabelas pivot/associativas (`sales_products`).
* **Cultura de Testes Unitários e Mockagem Avançada:**
    * Desenvolvimento de testes unitários robustos utilizando **Mocha, Chai e Sinon**.
    * Uso extensivo de **Stubs** com Sinon para isolar comportamentos de I/O do banco de dados, garantindo que os testes testem apenas as funções lógicas isoladas.
    * Busca de métricas agressivas de cobertura de código (**Code Coverage**) e resiliência lógica contra falhas ocultas por meio de **Testes de Mutação**.
* **Tratamento de Erros Resiliente:**
    * Implementação de middlewares globais assíncronos no Express para interceptação centralizada e tratamento correto de exceções no ciclo de vida das requisições.

---

## 🎲 Modelo de Dados (DER)

O banco de dados relacional é composto por três tabelas interligadas que dão suporte ao fluxo transacional da loja:

1.  **`products`:** Cadastro de itens contendo identificadores únicos e nome descritivo.
2.  **`sales`:** Histórico de fechamento de pedidos, contendo um identificador único e o carimbo de data/hora (`date`) da transação.
3.  **`sales_products`:** Tabela associativa (N:N) que materializa a compra vinculando itens de `products` a seus respectivos cabeçalhos de `sales`, registrando a quantidade vendida de cada produto individualmente.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Runtime Engine:** Node.js (Versão 16+)
* **Framework Web:** Express.js
* **Driver do Banco de Dados:** `mysql2` (Queries SQL nativas)
* **Validações:** Middlewares Customizados / Express
* **Testes Unitários:** Mocha, Chai, Sinon e `sinon-chai`
* **Testes Globais & Mutação:** Cypress (E2E) & Stryker (Mutation)
* **Gerenciamento de Ambiente:** Docker & Docker Compose

---

## 🐳 Como Executar a Aplicação com Docker

Tanto a API do back-end quanto o banco de dados MySQL rodam isolados através de containers Docker.

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:seu-usuario/sd-040-project-store-manager.git
    cd sd-040-project-store-manager
    ```

2.  **Instale as dependências locais:**
    ```bash
    npm install
    ```

3.  **Suba os containers da infraestrutura:**
    ```bash
    docker-compose up -d
    ```
    *Isso inicializará a API Express rodando na porta local `3001` e o container de banco de dados `store_manager_db`.*

4.  **Acompanhe os logs da aplicação:**
    ```bash
    docker logs -n 10 -f store_manager
    ```

---

## 🧪 Comandos de Testes e Qualidade

O projeto conta com um arsenal de scripts voltados para validação lógica e auditoria estática do código.

* **Executar os Testes Unitários locais (Mocha):**
    ```bash
    npm run test:mocha
    ```
* **Verificar a cobertura de linhas do código:**
    ```bash
    npm run test:coverage
    ```
* **Rodar os testes de mutação (Stryker) para avaliar a qualidade dos testes criados:**
    ```bash
    npm run test:mutation
    ```
* **Executar a suíte de testes de integração do avaliador global:**
    ```bash
    npm test
    ```
* **Auditar padrões estritos de formatação (Linter):**
    ```bash
    npm run lint
    ```

---

## 📁 Estrutura de Pastas de Desenvolvimento

A distribuição do código segue o padrão rígido da arquitetura MSC:

```text
backend/src/
├── controllers/    # Intercepta requisições HTTP e devolve respostas REST (status/json)
├── services/       # Valida regras de negócio e decide o fluxo dos dados
├── models/         # Executa queries puras no MySQL (connection.execute)
├── middlewares/    # Validação do corpo de dados (inputs) e tratamento global de erros
├── routes/         # Divisão e roteamento de endpoints (/products, /sales)
└── app.js          # Configuração inicial do Express e injeção de middlewares
