# Oversight

O projeto Oversight é uma solução voltada para o campo de gestão de orçamentos, projetado para simplificar e aprimorar o processo de gerenciamento de recursos financeiros e de serviços. O software conta com versão Web e Mobile e permite aos usuários cadastrar produtos e serviços, agilizando o processo de elaboração de orçamentos.

Para promover uma maior velocidade na comunicação com os clientes, o Oversight incorpora uma funcionalidade de mensageria que permite o envio de orçamentos por e-mail diretamente ao cliente, para a aprovação ou não do orçamento gerado.

## Integrantes

* Bruno Gomes Ferreira
* João Pedro Mairinque de Azevedo
* Matheus Machado de Oliveira Andrade
* Matheus Vieira dos Santos
* Samara Martins Ferreira

## Instruções de utilização

Para executar o sistema localmente, basta possuir instalado o [Docker](https://docs.docker.com/engine/install/ubuntu/).

Uma vez que tenha instalado o Docker corretamente, basta acesasr a raiz da pasta `Código` e realizar o seguinte comando no terminal: `docker compose up`.

Quando terminar a construção dos serviços, eles estarão disponíveis nas seguintes links:
- API => http://0.0.0.0:3000
- Front => http://0.0.0.0

## Deploy

Ao realizar o deploy, deve-se atualizar o link do servidor nos seguintes lugares (enquanto não houver dns fixo):
- docker-compose.yaml

## Gerar Analises

FTA para Métricas de Código Typescript:

`npx fta-cli --config-path ./fta.json --json . > ./metricas/fta-analysis.json`

Métricas do Docker:

`docker scout cves --format sarif > ./metricas/docker-vulnerabilities.json`

## Histórico de versões

* 0.1.1
    * CHANGE: Atualização das documentacoes. Código permaneceu inalterado.
* 0.1.0
    * Implementação da funcionalidade X pertencente ao processo P.
* 0.0.1
    * Trabalhando na modelagem do processo de negócios.
