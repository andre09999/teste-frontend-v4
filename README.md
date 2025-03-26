Desafio Frontend: Acompanhamento de Ativos Florestais
Este projeto foi criado para responder aos requisitos do desafio de frontend, com foco no acompanhamento de ativos usados em atividades florestais. O objetivo é apresentar o histórico de situações e localizações dos ativos em um mapa dinâmico.

Recursos Implementados
1. Localizações dos Ativos
Apresentação das localizações mais recentes dos ativos no mapa, empregando a Google Maps API para mostrar onde os ativos estão situados.

2. Situação Atual do Ativo
Apresentação da situação mais recente do ativo, com indicação visual da sua cor relacionada à situação (ex: "Em Operação", "Parado", "Em Manutenção").

3. Histórico de Situações do Ativo
Apresentação do histórico completo de situações de um ativo ao clicar nele. Cada situação é mostrada com a data e o nome da situação (e sua respectiva cor).

4. Cálculo de Desempenho
O desempenho de um ativo é medido com base nas horas em operação versus o total de horas. A fórmula utilizada é:

Desempenho
=
Horas Em Operação
Horas Totais
×
100
Desempenho=
Horas Totais
Horas Em Operação
​
×100
5. Cálculo de Lucro Estimado
O lucro estimado do ativo é medido com base no valor gerado por hora em cada situação (em operação, em manutenção, etc.), considerando o tempo gasto em cada situação.

6. Histórico de Localizações
O histórico de localizações de cada ativo é exibido no mapa, possibilitando a visualização do caminho percorrido.

Organização do Projeto
1. Componentes
Mapa: Apresenta informações detalhadas sobre o ativo selecionado (desempenho, horas trabalhadas, lucro estimado, situação atual) e o mapa com o histórico de localizações.

HistoricoLocalizacoes: Apresenta o histórico de situações e localizações de um ativo.

2. Hooks
useEstadoDoAtivo: Gerencia o estado geral dos ativos, incluindo filtros e estados.

useAtivosFiltradosHook: Possibilita filtrar os ativos por situação e modelo.

3. Funções Utilitárias
calcularDesempenho: Calcula o desempenho de um ativo.

calcularLucro: Calcula o lucro do ativo com base no valor por hora e tempo gasto em cada situação.

buscarDados: Função para obter os dados dos ativos, incluindo situações, histórico de localizações e valores de lucro.

4. Tipos de Dados
Ativo: Representa um ativo, com informações como nome, modelo, situação e histórico de localizações.

EstadoDoAtivo: Representa uma situação do ativo, como "Em Operação" ou "Em Manutenção", com sua cor relacionada.

HistoricoDeLocalizacoes: Contém o histórico de localizações do ativo, incluindo latitudes, longitudes e datas.

Tecnologias Usadas
React: Biblioteca para a construção da interface do usuário.

Google Maps API: Para mostrar o mapa e exibir as localizações dos ativos.

TypeScript: Usado para garantir a tipagem forte e evitar erros no desenvolvimento.

CSS: Para estilização e construção da interface.

React Context: Para gerenciar o estado geral da aplicação.

Biblioteca de Componentes (Bootstrap): Para construção de UI com componentes prontos e responsivos.

Como Executar o Projeto
Instalação das Dependências

Clone o repositório e instale as dependências necessárias:

bash
Copiar
Editar
git clone <URL_DO_REPOSITÓRIO>

Entre na pasta do projeto com:

```bash
cd
```

Depois, instale as dependências:

```bash
npm install
```

Iniciando o Servidor

Para rodar o projeto no modo de desenvolvimento:

```bash
npm start
```

Abrindo o App

Abra o app no seu navegador acessando: `http://localhost:3000`.

Organização dos Dados

Os dados estão em JSON, estruturados assim:

* `equipment.json`: Lista de equipamentos com ID e modelo.
* `equipmentState.json`: Estados dos equipamentos (ex: "Operando").
* `equipmentModel.json`: Modelos e valores por hora.
* `equipmentStateHistory.json`: Histórico de estados.
* `equipmentPositionHistory.json`: Histórico de posições (latitude/longitude).

Opções Técnicas

Usamos a Google Maps API para o mapa por ser confiável.

TypeScript foi escolhido para mais segurança no código.

React foi escolhido por ser flexível e bom para interfaces.

Os componentes foram divididos para serem reutilizáveis, facilitando o futuro.

Funcionalidades Extras

* Filtros: Para ver equipamentos por estado e modelo.
* Pesquisa: Para achar um equipamento pelo nome.
* Visualização: Equipamentos diferentes são mostrados de formas diferentes no mapa.

Testes Automatizados

Testes com Jest e React Testing Library garantem a qualidade:

* Cálculo de produtividade.
* Renderização dos componentes.
* Comportamento ao clicar e ver o histórico.

Sobre a Documentação

A documentação explica as decisões, estrutura e uso.