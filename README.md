# App

GymPass style app.

## RFs (requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter um número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in ded um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas por 20 itens por página;
- [] O usuário deve ser identificado por um JWT;

## Regras de Commit

Este projeto aplica um conjunto de regras de formatação para mensagens de commit, garantindo consistência e clareza nas alterações do código. As regras de commit são implementadas utilizando o **Husky** e o **Commitlint**.

### Localização das Regras

As regras específicas para as mensagens de commit podem ser encontradas no arquivo [commit-msg.md](./commit-msg.md).
Certifique-se de revisar estas diretrizes antes de fazer um commit para garantir que suas mensagens estejam em conformidade.

### Hooks do Husky

- **Pre-Commit**: Antes de cada commit, o Husky executa um lint nos arquivos que estão prestes a ser "commitados". Isso garante que o código esteja em conformidade com as regras de linting definidas, ajudando a manter a qualidade do código.

- **Commit Msg**: Antes de cada commit, o Husky valida a mensagem de commit de acordo com as regras definidas no arquivo [commit-msg.md](./commit-msg.md). Isso garante que todas as mensagens de commit estejam formatadas corretamente, seguindo um padrão consistente, o que facilita a compreensão das alterações feitas no código.

- **Pre-Push**: Antes de cada push, o Husky executa os testes do projeto. Isso assegura que todas as alterações estejam funcionando corretamente e que não haja falhas nos testes antes de serem enviadas para o repositório remoto.

### Como Funciona

Ao tentar realizar um commit ou um push, o Husky irá automaticamente validar a mensagem de commit e o código com base nas regras especificadas. Se qualquer uma dessas validações falhar, o commit ou o push será bloqueado, e você receberá uma mensagem de erro amigável indicando o problema.
