## Backend - Wefit

## Descricao:

API RESTful com TypeScript, Express, Prisma e zod para manipular a criacao de um usuario.
Autenticacao implementada em algumas rotas como demonstracao.

# Setup

#### Instalando as dependencias:

```bash
npm install
```

### Copiando o env

```bash
cp .env.example .env
```

#### Aplicando as migracoes

```bash
npx prisma migrate dev
```

### Rodando o seed
#### Aqui sera gerada um usuario admin, que pode acessar rotas autenticadas

```bash
npx prisma db seed
```

#### Rodando a aplicacao

```bash
npm start
```


## Utilizando a API

# Endpoints:

## AUTH

### `POST` - Endpoint publico

- `/auth/login`: Faz login com o usuario e cria um token jwt armazenado em cookie que sera validado nos endpoints autenticados

### `POST` - Endpoint autenticado

- `/auth/logout`: Faz logout com o usuario autenticado

## USER

### `GET` - Enpoint autenticado

- `/user/:id`: Retorna o user pelo seu `id`
- `/user`: Retorna todos os user

### `POST` - Enpoint publico

- `/user`: Cria um novo user com base no formulario fornecido
  - Body:
    - `tipo: Enum` (obrigatorio): Tipo do user a ser cadastrado - `'FISICA' | 'JURIDICA'`
    - `identificador: String` (obrigatorio): CPF ou CNPJ - validado de acordo com o `tipo` - XXX.XXX.XXX-XX para CPF e XX.XXX.XXX/XXXX-XX para CNPJ
    - `nome: String` (obrigatorio): Nome do user - max 60 caracteres
    - `celular: String` (opcioanal*): Numero de celular - formato (11)91111-1111 *obrigatorio caso o campo `telefone` esteja vazio
    - `telefone: String` (opcional*): Numero de telefone - formato (11)1111-1111 *obrigatorio caso o campo `celular` esteja vazio
    - `email: String` (obrigatorio): Email - validacao padrao de email user@host.ext
    - `email_confirmacao: String` (obrigatorio): Deve ser igual ao campo `email` - validacao padrao de email user@host.ext
    - `cep: String` (obrigatorio): deve estar no formato padrao de CEP XXXXX-XXX
    - `logradouro: String` (obrigatorio): Nome da rua  - max 60 caracteres
    - `numero: Int` (obrigatorio): Numero da rua - max 60 caracteres
    - `complemento: String` (opcional): Complemento - max 60 caracteres
    - `cidade: String` (obrigatorio): Cidade - max 60 caracteres
    - `bairro: String` (obrigatorio): Bairro - max 60 caracteres
    - `estado: String` (obrigatorio): Estado - max 60 caracteres
    - `termos: Boolean` (obrigatorio): Termos de uso 

## Exs do body de uma request

### Pessoa fisica
```
{
  "tipo": "FISICA",
  "identificador": "111.111.111-11",
  "nome": "João da Silva",
  "email": "joao@example.com",
  "celular": "(11)98765-4321",
  "email_confirmacao": "joao@example.com",
  "cep": "22222-022",
  "logradouro": "Rua das Flores",
  "numero": 100,
  "complemento": "Apto 202",
  "cidade": "São Paulo",
  "bairro": "Centro",
  "estado": "SP",
  "termos": true
}
```
### Pessoa juridica
```
{
  "tipo": "JURIDICA",
  "identificador": "11.111.111/1111-11",
  "nome": "João da Silva corp",
  "email": "joaocorp@example.com",
  "telefone": "(11)8765-2222",
  "email_confirmacao": "joaocorp@example.com",
  "cep": "22222-022",
  "logradouro": "Rua das Flores",
  "numero": 100,
  "complemento": "Apto 202",
  "cidade": "São Paulo",
  "bairro": "Centro",
  "estado": "SP",
  "termos": true
}
```

### `PUT` - Enpoint autenticado

- `/user/:id`: Atualiza parcialmente um user pelo seu `id`

### `DELETE` - Enpoint autenticado

- `/user/:id`: Deleta um user pelo seu `id`


## CEP 
### Descricao

Pequena abstracao utilizando a api publica via cep https://viacep.com.br/ - pode ser utilizado para autocompletar campos do formulario

### `GET` - Enpoint publico

- `/cep/:cep`: Retorna cep, logradouro, bairro, cidade e estado com base no `cep` informado - cep sem pontuacao 

## Exs de uma response 
```
http://localhost:4568/cep/01452001
{
  "success": true,
  "data": {
    "cep": "01452-001",
    "logradouro": "Avenida Brigadeiro Faria Lima",
    "bairro": "Jardim Paulistano",
    "estado": "SP",
    "cidade": "São Paulo"
  }
}
```


