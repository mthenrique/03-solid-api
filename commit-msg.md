# Regras de CommitLint

O CommitLint é usado para garantir que as mensagens de commit sigam um padrão consistente. Neste projeto, estamos usando as convenções do [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Padrão de Mensagem de Commit

A estrutura da mensagem de commit deve seguir este formato:

### Exemplos

- `feat: add login functionality`
- `fix: fix bug in authentication flow`
- `docs: update README with new instructions`

### Tipos Suportados

Os seguintes tipos de commits são permitidos:

- **feat**: Usado quando uma nova funcionalidade é adicionada.
- **fix**: Usado quando um bug é corrigido.
- **docs**: Para mudanças na documentação, como no README.
- **style**: Alterações que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula, etc.).
- **refactor**: Mudança no código que não corrige um bug nem adiciona uma nova funcionalidade.
- **test**: Adição ou correção de testes.
- **chore**: Atualizações de tarefas e manutenção do projeto, sem alterar o código de produção.

### Escopo (Opcional)

O escopo é uma parte opcional, usada para especificar qual parte do código está sendo modificada. Isso ajuda a identificar rapidamente onde a mudança foi feita. Exemplo:

- `feat(auth): adicionar token JWT para autenticação`

### Regras de Formatação

- **Título**: Deve ter no máximo 72 caracteres.

### Padrões de Convenção

Aqui estão as regras mais detalhadas para as mensagens de commit:

| Regra                | Descrição                                                            |
| -------------------- | -------------------------------------------------------------------- |
| `subject-case`       | O título deve estar em "lowercase" (minúsculas).                     |
| `subject-max-length` | O título deve ter no máximo 72 caracteres.                           |
| `type-enum`          | O tipo do commit deve ser um dos tipos permitidos (feat, fix, etc.). |
| `type-case`          | O tipo do commit deve estar em minúsculas.                           |
| `scope-case`         | O escopo (se presente) deve estar em minúsculas.                     |

### Exemplo de Mensagem Correta

`feat: adicionar suporte a múltiplos provedores de login`

### Exemplo de Mensagem Inválida

`Adicionando nova funcionalidade`

## Referências

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [CommitLint Documentation](https://commitlint.js.org/#/)
