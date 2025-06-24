# 🚀 API SOLID - GymPass Style App

Uma implementação completa de API REST seguindo princípios SOLID com Node.js, TypeScript, Fastify e PostgreSQL. Este projeto demonstra práticas avançadas de desenvolvimento backend, arquitetura limpa e implementação de padrões arquiteturais sólidos.

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido para demonstrar:

- **Arquitetura SOLID** com separação clara de responsabilidades
- **Clean Architecture** com camadas bem definidas
- **TypeScript** com tipagem forte e validação em runtime
- **Padrões de Design** como Factory, Repository e Dependency Injection
- **Tratamento robusto de erros** com tipos customizados
- **Autenticação JWT** com refresh tokens
- **Sistema de Check-ins** com validação geográfica
- **Testes unitários e E2E** com Vitest

## 🏗️ Arquitetura

### Estrutura de Camadas

```
📁 src/
├── modules/           # Módulos de negócio
│   ├── authentication/  # Autenticação (Sign In, Sign Up, Refresh Token)
│   │   ├── dtos/       # Data Transfer Objects
│   │   ├── factories/   # Injeção de dependências
│   │   ├── infra/       # Controllers, rotas e erros específicos
│   │   └── services/    # Lógica de negócio de autenticação
│   ├── user/           # Gestão de usuários - Mesma estrutura de 'authentication'
│   └── gym/            # Gestão de academias - Mesma estrutura de 'authentication'
├── infra/              # Infraestrutura da aplicação
│   ├── database/       # Repositórios e DTOs
│   │   ├── dtos/       # Data Transfer Objects
│   │   ├── repositories/ # Interfaces dos repositórios
│   │   └── prisma/     # Implementações Prisma
│   ├── http/           # Servidor HTTP e middlewares
│   │   ├── middlewares/ # Middlewares globais
│   │   └── routes/     # Configuração de rotas
│   ├── providers/      # Provedores de serviços
│   │   └── parameter-storage/ # Armazenamento de parâmetros
│   └── errors/         # Tratamento global de erros
├── env/                # Configuração de ambiente
│   ├── dtos/          # DTOs de configuração
│   ├── factories/     # Fábricas de configuração
│   └── providers/     # Provedores de validação
├── @types/            # Definições de tipos TypeScript
├── config/            # Configurações da aplicação
├── lib/               # Bibliotecas externas (Prisma)
└── enum/              # Enumerações do sistema
```

### Modelo de Dados

```sql
-- Usuários com roles (ADMIN/MEMBER)
users (id, name, email, password_hash, role, created_at, updated_at)

-- Academias com geolocalização
gyms (id, title, description, phone, latitude, longitude, created_at, updated_at, deleted_at)

-- Check-ins com validação
check_ins (id, user_id, gym_id, created_at, validated_at)
```

## ✨ Funcionalidades Principais

### 🔐 Autenticação e Autorização

- ✅ **Sign Up** - Cadastro de usuários com validação
- ✅ **Sign In** - Login com JWT e refresh tokens
- ✅ **Refresh Token** - Renovação automática de tokens
- ✅ **Role-based Access** - Controle de acesso por roles (ADMIN/MEMBER)

### 👤 Gestão de Usuários

- ✅ **Perfil do Usuário** - Visualização de dados pessoais
- ✅ **Métricas do Usuário** - Contagem de check-ins
- ✅ **Histórico de Check-ins** - Listagem paginada
- ✅ **Check-in em Academia** - Com validação de distância

### 🏋️ Gestão de Academias

- ✅ **Criar Academia** - Apenas administradores
- ✅ **Buscar Academias** - Por título ou proximidade
- ✅ **Listar Academias Próximas** - Baseado em coordenadas
- ✅ **Validar Check-ins** - Apenas administradores

### 🛡️ Validações e Segurança

- ✅ **Validação de Parâmetros** - Zod em todas as entradas
- ✅ **Validação de Distância** - Check-in apenas em academias próximas
- ✅ **Limite de Check-ins** - Um por dia por usuário
- ✅ **Tratamento Global de Erros** - Respostas padronizadas
- ✅ **Middleware de Autenticação** - Proteção de rotas

## 🚀 Tecnologias Utilizadas

| Categoria          | Tecnologias                               |
| ------------------ | ----------------------------------------- |
| **Runtime**        | Node.js 18+                               |
| **Linguagem**      | TypeScript                                |
| **Framework**      | Fastify                                   |
| **Banco de Dados** | PostgreSQL                                |
| **ORM**            | Prisma                                    |
| **Validação**      | Zod                                       |
| **Autenticação**   | JWT, bcrypt                               |
| **Arquitetura**    | Clean Architecture, SOLID                 |
| **Padrões**        | Factory, Repository, Dependency Injection |
| **Testes**         | Vitest, Supertest                         |
| **DevOps**         | Docker, Husky, ESLint                     |

## 🔧 Configuração Local

### 🐳 Docker (Recomendado para Demonstração)

Para setup rápido e ambiente isolado:

```bash
# Iniciar banco de dados
docker-compose up -d

# Instalar dependências
npm install

# Executar migrações
npx prisma migrate dev

# Iniciar aplicação
npm run dev
```

### 🔧 Configuração Manual (Recomendado para Desenvolvimento)

Para desenvolvimento com debugging nativo:

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar migrações
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate

# Iniciar aplicação
npm run dev
```

## 📊 Estrutura de Endpoints

### 🔐 Autenticação (`/auth`)

```
POST   /auth/sign-up     # Cadastro de usuário
POST   /auth/sign-in     # Login
PATCH  /auth/refresh     # Renovar token
```

### 👤 Usuários (`/user`)

```
GET    /user/profile           # Perfil do usuário
GET    /user/metrics           # Métricas de check-ins
GET    /user/check-ins/history # Histórico de check-ins
POST   /user/check-in          # Fazer check-in
```

### 🏋️ Academias (`/gym`)

```
POST   /gym                    # Criar academia (ADMIN)
GET    /gym                    # Buscar academias
GET    /gym/nearby             # Academias próximas
POST   /gym/validate/check-in  # Validar check-in (ADMIN)
```

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
npm test

# Testes em modo watch
npm run test:watch

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:coverage

# Interface visual dos testes
npm run test:ui
```

### Estrutura de Testes

```
📁 tests/
├── 🧪 unit/           # Testes unitários
├── 🌐 e2e/            # Testes end-to-end
├── 🗄️ in-memory/      # Repositórios em memória
└── 🛠️ utils/          # Utilitários para testes
```

## 📈 Métricas de Qualidade

- **Cobertura de Tipos**: 100% TypeScript
- **Validação**: Zod em todas as entradas
- **Tratamento de Erros**: 100% dos casos cobertos
- **Testes**: Unitários e E2E implementados
- **Performance**: Consultas otimizadas com Prisma
- **Segurança**: JWT, bcrypt, validações robustas

## 🎯 Aprendizados Demonstrados

### Arquitetura e Design

- **Clean Architecture** com separação clara de responsabilidades
- **Princípios SOLID** implementados
- **Padrão Factory** para injeção de dependência
- **Repository pattern** para abstração de dados
- **Dependency Injection** para baixo acoplamento

### Desenvolvimento

- **TypeScript** com tipagem forte
- **Validação robusta** com Zod
- **Tratamento abrangente** de erros
- **Middleware customizado** para autenticação
- **Testes automatizados** com Vitest

### Segurança e Performance

- **Autenticação JWT** com refresh tokens
- **Hash de senhas** com bcrypt
- **Validação de parâmetros** em todas as entradas
- **Controle de acesso** baseado em roles
- **Validação geográfica** para check-ins

## 🤝 Contribuindo

Este é um projeto de demonstração/portfólio. Se você quiser contribuir com melhorias ou tiver sugestões, sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

**Desenvolvido para demonstrar habilidades em desenvolvimento backend moderno, arquitetura de sistemas escaláveis e boas práticas de programação.**
