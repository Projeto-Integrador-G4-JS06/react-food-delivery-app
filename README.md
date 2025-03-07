# Nome do Projeto - Frontend 

<br />

<div align="center">
    <img src="https://i.imgur.com/AzshGmS.png" title="source: imgur.com" width="50%"/>
</div>
*O Logo do React pode ser substituído pelo Logo do Projeto*

<br /><br />

## 1. Descrição

*Descreva brevemente o seu projeto*

------

## 2. Recursos

1. *Liste as principais funcionalidades e as features especiais implementadas no Projeto React*

------

## 3. Protótipo e Capturas de Tela


*Adicione print da tela inicial e/ou o link do protótipo no Figma (se houver)*

<div align="center">
    <img src="mudar" title="source: imgur.com" width="50%"/>
</div>

<br />

<a href="https://imgur.com/vK8ulM5"><img src="https://i.imgur.com/vK8ulM5.png" title="source: imgur.com" width="3%"/></a> [Protótipo desenvolvido no Figma](link para o Figma do Projeto)

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
- API NestJS API NestJS ([Repositório da API](link do repositório da api))

---

## 6. Configuração e Execução

1. Clone o repositório do Projeto
2. Instale as dependências: `yarn`
3. Clone o repositório do Projeto Backend: [Link](link do repositório do Backend)
4. Siga as instruções de **Configuração e Execução** descritas no README do Projeto Backend
5. Adicione o endereço de execução do projeto na variável de ambiente **VITE_API_URL**, no projeto React
6. Execute o Projeto React: `yarn dev`
7. A aplicação React estará disponível no endereço: `http://localhost:5173`

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

## 8. Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch com a sua feature (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça um push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request