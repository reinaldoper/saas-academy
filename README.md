# 🏋️ Academia SaaS API

Sistema completo de gerenciamento de academias, desenvolvido com **NestJS**, **Node.js >=22**, **Prisma ORM**, **PostgreSQL** e documentação via **Swagger**.

---

## 🚀 Tecnologias utilizadas

- Node.js >=22  
- NestJS  
- Prisma ORM  
- PostgreSQL  
- Swagger (OpenAPI)  
- Stripe (pagamentos)  
- JWT (autenticação)  

---

## 📦 Instalação

```bash
git clone https://github.com/reinaldoper/academia-saas-api.git
cd academia-saas-api
npm install
```



### ⚙️ Configuração

Crie um arquivo `.env` com as variáveis:

```bash
DATABASE_URL=postgresql://usuario:senha@localhost:5432/academia
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
JWT_SECRET=seu_token_secreto
PORT=3003
```


### 🧪 Rodando localmente

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```



### 📚 Documentação da API

Acesse a documentação Swagger em:

```bash
http://localhost:3003/api/docs
```




---

## 🧠 Estrutura do banco (Prisma Schema)

### 👤 User

Representa alunos e administradores  
Relacionado à:  
- Academy  
- MembershipPlan  
- Workout  
- Payment  
- CheckIn  
- Review  
- Session  

### 🏢 Academy

Academia com endereço, email e telefone  
Relacionada a:  
- User  
- Trainer  
- Payment  
- MembershipPlan  

### 💪 Workout & Exercise

Treinos personalizados por usuário  
Cada treino possui múltiplos exercícios  

### 📆 CheckIn

Registro de presença com timestamp e localização  

### 💳 Payment

Pagamentos via Stripe  
Associado ao User e à Academy  

### 📄 MembershipPlan

Planos de assinatura com preço e duração  
Vinculado à Academy e aos User  

### 🧑‍🏫 Trainer & Session

Treinadores vinculados à academia  
Sessões agendadas com usuários  

### ⭐ Review

Avaliações de treinadores por usuários  

---

## 🔢 Enums

```bash
enum Role {
ADMIN,
TRAINER,
MEMBER
}

enum PaymentStatus {
PENDING,
COMPLETED,
FAILED
}
```


---

## 🔐 Autenticação

- JWT via `Authorization: Bearer <token>`  
- Proteção de rotas com `JwtAuthGuard`  
- Controle de acesso por `Role`  

---

## 📈 Roadmap futuro

- [ ] Exportação de relatórios financeiros  
- [ ] Dashboard com gráficos de check-ins e treinos  
- [ ] Notificações por email e push  
- [ ] Integração com WhatsApp para agendamentos  

---

## 👨‍💻 Autor

Reinaldo Dev  
Desenvolvedor fullstack apaixonado por SaaS, fintechs e soluções escaláveis.


