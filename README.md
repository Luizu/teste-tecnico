# 🛒 E-Commerce Monorepo

Projeto full-stack de e-commerce desenvolvido com Next.js e NestJS em um monorepo Turborepo.

## 📋 Sobre o Projeto

Este projeto implementa uma página de produto de e-commerce completa com carrinho de compras, incluindo:

- **Frontend (Next.js 15)**
- **Backend (NestJS 11)**
- **Database (PostgreSQL)**
- **Monorepo (Turborepo)**

## 🚀 Tecnologias Principais

### Frontend

- **Next.js 15.4.2** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Sonner** (Toast notifications)

### Backend

- **NestJS 11**
- **Prisma ORM**
- **PostgreSQL**
- **Swagger/OpenAPI**
- **TypeScript**

### Ferramentas

- **Turborepo** (Monorepo orchestration)
- **ESLint** & **Prettier**
- **Jest** (Testing)
- **Docker** (Database)

## 📦 Estrutura do Projeto

```
.
├── apps/
│   ├── api/              # Backend NestJS
│   │   ├── src/
│   │   │   ├── product/  # Módulo de produtos
│   │   │   ├── cart/     # Módulo de carrinho
│   │   │   └── database/ # Configuração Prisma
│   │   └── prisma/       # Schema e migrations
│   └── web/              # Frontend Next.js
│       ├── src/
│       │   ├── app/      # Rotas (App Router)
│       │   ├── ui/       # Componentes UI
│       │   ├── contexts/ # Contexts React
│       │   └── services/ # API clients
└── packages/
    ├── eslint-config/    # Configurações ESLint
    ├── jest-config/      # Configurações Jest
    └── typescript-config/ # Configurações TypeScript
```

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.x
- **Yarn** >= 1.22
- **Docker** e **Docker Compose** (para o banco de dados)

## ⚡ Quick Start

```bash
# 1. Clone e instale
git clone <url-do-repositorio>
cd teste-tecnico (ou o nome do caminho que você escolheu)

yarn install

# 2. Configure o .env
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api-db?schema=public"' > apps/api/.env

# 3. Suba infraestrutura (banco + migrations)
yarn infra:up

# 4. Inicie os servidores
yarn dev
```

**Pronto!** 🎉

- Frontend: http://localhost:3001
- Backend: http://localhost:8080/api
- Swagger: http://localhost:8080/api/docs

---

## 🏃 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd monorepo-template
```

### 2. Instale as dependências

```bash
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` em `apps/api/`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api-db?schema=public"
```

### 4. Inicie a infraestrutura (banco de dados + migrations)

Na raiz do projeto:

```bash
yarn infra:up
```

Este comando:

- Sobe o PostgreSQL via Docker
- Aguarda 3 segundos para o banco inicializar
- Aplica automaticamente todas as migrations do Prisma

### 5. Popule o banco com dados de teste (opcional)

```bash
cd apps/api
yarn seed
```

### 6. Inicie os servidores de desenvolvimento

Na raiz do projeto:

```bash
yarn dev
```

Isso iniciará:

- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:8080
- **Swagger**: http://localhost:8080/api

## 📚 Scripts Disponíveis

### Raiz do projeto (todos os apps)

```bash
yarn dev          # Inicia todos os apps em modo dev
yarn build        # Builda todos os apps
yarn lint         # Roda linting em todos os apps
yarn test         # Roda testes em todos os apps
yarn format       # Formata código com Prettier

# Infraestrutura
yarn infra:up     # Sobe banco + aplica migrations
yarn infra:down   # Para o banco
yarn infra:reset  # Reseta banco (apaga dados) + sobe novamente
```

### API (apps/api)

```bash
yarn dev          # Inicia em modo watch
yarn build        # Builda para produção
yarn start:prod   # Inicia versão de produção
yarn test         # Roda testes unitários
yarn test:e2e     # Roda testes E2E
yarn seed         # Popula banco com dados de teste
```

### Web (apps/web)

```bash
yarn dev          # Inicia em modo dev (porta 3001)
yarn build        # Builda para produção
yarn start        # Inicia versão de produção
yarn lint         # Roda ESLint
```

## 🔌 Endpoints da API

### Produtos

#### `GET /product`

Lista todos os produtos

**Response:**

```json
[
  {
    "id": "uuid",
    "name": "Nome do Produto",
    "description": "Descrição detalhada",
    "image": "https://...",
    "stock": 10,
    "price": 99.9,
    "promotionalPrice": 79.9,
    "createdAt": "2025-10-01T00:00:00.000Z",
    "updatedAt": "2025-10-01T00:00:00.000Z"
  }
]
```

#### `GET /product/:id`

Busca um produto por ID

**Response:**

```json
{
  "id": "uuid",
  "name": "Nome do Produto",
  "description": "Descrição detalhada",
  "image": "https://...",
  "stock": 10,
  "price": 99.9,
  "promotionalPrice": 79.9,
  "createdAt": "2025-10-01T00:00:00.000Z",
  "updatedAt": "2025-10-01T00:00:00.000Z"
}
```

### Carrinho

#### `POST /cart/add`

Adiciona produto ao carrinho

**Body:**

```json
{
  "sessionId": "session-uuid",
  "productId": "product-uuid"
}
```

**Response:**

```json
{
  "id": "cart-uuid",
  "sessionId": "session-uuid",
  "items": [
    {
      "id": "item-uuid",
      "productId": "product-uuid",
      "quantity": 1,
      "product": { ... }
    }
  ]
}
```

#### `POST /cart/remove`

Remove produto do carrinho

**Body:**

```json
{
  "sessionId": "session-uuid",
  "productId": "product-uuid"
}
```

#### `GET /cart?sessionId=xxx`

Busca carrinho por sessão

**Response:**

```json
{
  "id": "cart-uuid",
  "sessionId": "session-uuid",
  "items": [
    {
      "id": "item-uuid",
      "productId": "product-uuid",
      "quantity": 1,
      "product": {
        "id": "product-uuid",
        "name": "Nome do Produto",
        "price": 99.90,
        "image": "https://...",
        ...
      }
    }
  ]
}
```

## 🗄️ Modelo de Dados

### Product

```prisma
model Product {
  id               String     @id @default(uuid())
  name             String
  description      String
  image            String?
  stock            Int        @default(0)
  price            Decimal    @db.Decimal(10, 2)
  promotionalPrice Decimal?   @db.Decimal(10, 2)
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
  cartItems        CartItem[]
}
```

### Cart

```prisma
model Cart {
  id        String     @id @default(uuid())
  sessionId String     @unique
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

### CartItem

```prisma
model CartItem {
  id        String   @id @default(uuid())
  cartId    String
  productId String
  quantity  Int      @default(1)
  cart      Cart     @relation(...)
  product   Product  @relation(...)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🧪 Testes

### Executar todos os testes

```bash
yarn test
```

### Testes E2E da API

```bash
cd apps/api
yarn test:e2e
```

### Coverage

```bash
cd apps/api
yarn test --coverage
```

## 🎨 Funcionalidades Implementadas

### Frontend

- ✅ Página de listagem de produtos
- ✅ Página de detalhes do produto
- ✅ Preços promocionais com badge de desconto
- ✅ Carrinho lateral (drawer)
- ✅ Adicionar/remover produtos do carrinho
- ✅ Controle de quantidade
- ✅ Validação de estoque
- ✅ Gerenciamento de sessão
- ✅ Toast notifications
- ✅ Loading states
- ✅ Tratamento de erros
- ✅ Design responsivo
- ✅ SSG com ISR (Incremental Static Regeneration)

### Backend

- ✅ CRUD de produtos
- ✅ Suporte a preços promocionais
- ✅ Gerenciamento de carrinho
- ✅ Validação de estoque
- ✅ Documentação Swagger
- ✅ Tratamento de exceções
- ✅ Testes unitários
- ✅ Testes E2E
- ✅ Database migrations
- ✅ Seed de dados

## 📝 Comandos Úteis do Prisma

```bash
# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations em produção
npx prisma migrate deploy

# Abrir Prisma Studio (GUI do banco)
npx prisma studio

# Gerar Prisma Client
npx prisma generate

# Reset do banco (cuidado em produção!)
npx prisma migrate reset
```

## 🐳 Docker

O projeto inclui `docker-compose.yaml` para o PostgreSQL:

### Usando os comandos do projeto (recomendado)

```bash
# Iniciar banco + migrations (na raiz)
yarn infra:up

# Parar banco
yarn infra:down

# Resetar banco (apaga dados + reinicia + migrations)
yarn infra:reset
```

### Usando Docker diretamente

```bash
# Iniciar banco
cd apps/api
docker-compose up -d

# Parar banco
docker-compose down

# Ver logs
docker-compose logs -f

# Remover volumes (apaga dados)
docker-compose down -v
```

## 🔒 Variáveis de Ambiente

### API (apps/api/.env)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public"
```

### Web (apps/web/.env.local) - Opcional

```env
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

## 📖 Documentação API (Swagger)

Acesse http://localhost:8080/api após iniciar o servidor backend.

A documentação interativa permite:

- Visualizar todos os endpoints
- Testar requisições diretamente
- Ver schemas e exemplos
- Entender parâmetros e respostas

## 🛠️ Comandos de Build

### Build para produção

```bash
# Na raiz (builda tudo)
yarn build

# Apenas API
cd apps/api
yarn build

# Apenas Web
cd apps/web
yarn build
```

### Executar produção

```bash
# API
cd apps/api
yarn start:prod

# Web
cd apps/web
yarn start
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido como desafio técnico.

## 👤 Autor

Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento.

---

## 🔗 Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turborepo Documentation](https://turborepo.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## ❓ Troubleshooting

### Erro de conexão com banco

Certifique-se que o Docker está rodando:

```bash
docker ps
```

### Porta já em uso

Mude a porta em:

- API: `apps/api/src/main.ts` (linha 11)
- Web: `apps/web/package.json` script `dev` (porta 3001)

### Erro de migrations

Reset o banco e aplique migrations novamente:

```bash
cd apps/api
npx prisma migrate reset
npx prisma migrate dev
```

### Dependências desatualizadas

Reinstale as dependências:

```bash
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
yarn install
```
