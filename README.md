## Backend - Wefit

## Descricao:

API RESTful com TypeScript, Express, Prisma e zod para manipular a criacao de um usuario.


## Utilizando a API

# Endpoints:

### `GET`

- `/user/:id`: Retorna o user pelo seu `id`
- `/user`: Retorna todos os user

### `POST`

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
ex: 
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

### `PUT`

- `/user/:id`: Atualiza parcialmente um user pelo seu `id`

### `DELETE`

- `/user/:id`: Deleta um user pelo seu `id`


