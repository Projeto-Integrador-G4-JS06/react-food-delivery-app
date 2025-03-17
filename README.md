
# PedeAí - Delivery de Alimentos - Frontend 

<br />

<div align="center">
    <img src="https://ik.imagekit.io/liaMatsubara/readme_imagem.png?updatedAt=1741796206960" title="source: imgur.com" width="150%"/>
</div>

<br /><br />

## 1. Descrição

O PedeAí é um frontend desenvolvido com React e Vite, projetado para proporcionar uma experiência intuitiva e dinâmica em uma plataforma de delivery de alimentos. A aplicação se integra a um backend robusto, desenvolvido em NestJS, garantindo eficiência e rapidez na comunicação entre fornecedores e clientes.

A interface responsiva e acessível permite que os usuários realizem cadastro, login e naveguem facilmente pelos produtos cadastrados pelos fornecedores. Além disso, o sistema oferece uma experiência de compra fluida, com listagem detalhada de produtos, organização por categorias e um processo simplificado de pedido.

Os fornecedores podem gerenciar seus produtos e categorias diretamente na plataforma, enquanto os clientes desfrutam de uma navegação otimizada, com recomendações de alimentos saudáveis para uma escolha mais consciente. Tudo isso em um ambiente moderno e intuitivo, pensado para tornar o delivery mais prático e eficiente.

------

## 2. Recursos

🔹 Cadastro e autenticação de usuários – Permite que clientes e fornecedores criem suas contas e façam login de forma segura.

🔹 Gerenciamento de produtos – Fornecedores podem cadastrar, editar e remover produtos, garantindo que o catálogo esteja sempre atualizado.

🔹 Exploração de produtos – Usuários podem visualizar todos os produtos disponíveis, filtrados por categorias, facilitando a navegação.

🔹 Organização por categorias – Os produtos são estruturados em categorias para uma experiência mais intuitiva e prática.

🔹 Recomendações de alimentos saudáveis – A plataforma sugere opções mais nutritivas para incentivar escolhas equilibradas.

🔹 Interface responsiva e acessível – O design foi pensado para garantir uma navegação fluida em diferentes dispositivos, incluindo smartphones e desktops.

------

## 3. Protótipo e Capturas de Tela

<br />

<div align="center">
    <img src="https://ik.imagekit.io/czhooyc3x/PedeA%C3%AD/Imagens%20Complementares/HomeReadme.png?updatedAt=1742181799055" title="source: imagekit.io" alt="Home page photo" width="50%"/>
</div>

------

## 4. Tecnologias

| Item                         | Descrição  |
| ---------------------------- | ---------- |
| **Servidor**                 | Node JS    |
| **Linguagem de programação** | TypeScript |
| **Biblioteca**               | React JS   |
| **Build**                    | Vite       |
| **Framework de Estilização** | Tailwind   |

---

## 5. Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v16+)
- [yarn](https://yarnpkg.com/)
- Backend da API NestJS rodando ([Repositório da API](https://github.com/Projeto-Integrador-G4-JS06/nest-food-delivery-app))

---

## 6. Instalação - Ambiente Local

### 6.1. Clonando o repositório

```bash
git clone git@github.com:Projeto-Integrador-G4-JS06/react-food-delivery-app.git
cd react-food-delivery-app
```

### 6.2. Instalando as dependências

Utilize o comando abaixo para instalar todas as bibliotecas através do yarn:

```bash
yarn
```

### 6.3. Configuração do ambiente

A URL da API NestJS deve estar apontando para o endereço abaixo:

```bash
http://localhost:4000
```

### 6.4. Executando o projeto

Inicie o servidor de desenvolvimento com o yarn:

```bash
yarn dev
```

A aplicação estará disponível no enderço: `http://localhost:5173`

---

## 7. Estrutura do Projeto

```plaintext
src/
│
├── components/       # Componentes reutilizáveis
├── contexts/         # Gerenciamento de estado global (ex: autenticação)
├── models/           # Estrutura de dados da aplicação-
├── pages/            # Páginas da aplicação
├── services/         # Integração com a API (requisições HTTP)
├── utils/            # Funções auxiliares (alerts)
└── App.tsx           # Componente principal da aplicação
```

---

## 8. Implementações Futuras

- [x] API externa para cálculo do Nutri Score
- [x] API para métodos de pagamento e geolocalização
