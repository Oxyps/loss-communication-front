# [Comunicação de Perdas UI](https://github.com/oxyps/loss-communication-front)

## Primeiros passos para rodar o projeto
1. Clonar ou baixar o repositório do [projeto](https://github.com/oxyps/loss-communication-front);

1. Certificar-se de que possui o [Node.js](https://nodejs.org/en/download/) instalado;

1. Instalar a command line tool do Angular de forma global, caso não possua:
  ``` shell
    > npm install -g @angular/cli
  ```

1. Na raíz do projeto (pasta com o arquivo `package.json`) rodar o comando abaixo para instalar as dependências do projeto:
  ``` shell
    > npm install
  ```

1. Assegurar-se de inserir a rota correta da API na variável de ambiente `./src/app/environments/environment.ts`, como mostrado a seguir.
  ``` js
      export const environment = {
          production: false,
          api_url: 'http://127.0.0.1:8000/api',
      };
  ```

1. Servir a interface de usuário utilizando o comando;
  ``` shell
    > ng s
  ```


## Rotas

**Lavouras**
* Listagem de lavouras cadastradas: `localhost:4200/lavouras/`;
* Formulário para cadastro de lavoura: `localhost:4200/lavouras/cadastrar/`;
* Formulário para editar dados de lavoura: `localhost:4200/lavouras/:id/`;

**Agricultores**
* Listagem e busca de agricultores cadastrados: `localhost:4200/agricultores/`;
* Formulário para cadastro de agricultor: `localhost:4200/agricultores/cadastrar/`;
* Formulário para editar dados de agricultor: `localhost:4200/agricultores/:id/`;

**Comunicações de perda**
* Listagem e busca de comunicações de perda cadastrados: `localhost:4200/comunicacoes-perda/`;
* Formulário para cadastro de comunicação de perda: `localhost:4200/comunicacoes-perda/cadastrar/`;
* Formulário para editar dados de comunicação de perda: `localhost:4200/comunicacoes-perda/:id/`;


## Tecnologias utilizadas
- [x] [Angular](https://v2.angular.io/docs/ts/latest/)
- [x] [Angular Material](https://material.angular.io/)
